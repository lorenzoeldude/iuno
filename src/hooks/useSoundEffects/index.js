import { useRef } from "react";

export default function useSoundEffects() {
    const audioContext = useRef(null);

    const correctBuffer = useRef(null);
    const wrongBuffer = useRef(null);

    const loadingPromise = useRef(null);

    async function ensureLoaded() {
        if (loadingPromise.current) {
            return loadingPromise.current;
        }

        loadingPromise.current = (async () => {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!audioContext.current) {
                audioContext.current = new AudioContext();
            }

            if (audioContext.current.state === "suspended") {
                await audioContext.current.resume();
            }

            async function loadSound(url) {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to load ${url}`);
                }

                const arrayBuffer = await response.arrayBuffer();

                return await audioContext.current.decodeAudioData(arrayBuffer);
            }

            correctBuffer.current = await loadSound("/sounds/correct.ogg");
            wrongBuffer.current = await loadSound("/sounds/wrong.ogg");
        })();

        return loadingPromise.current;
    }

    async function play(type) {
        try {
            await ensureLoaded();

            const buffer =
                type === "correct"
                    ? correctBuffer.current
                    : wrongBuffer.current;

            if (!buffer) {
                console.warn("Sound buffer not loaded.");
                return;
            }

            if (audioContext.current.state === "suspended") {
                await audioContext.current.resume();
            }

            const source = audioContext.current.createBufferSource();
            source.buffer = buffer;

            const gain = audioContext.current.createGain();
            gain.gain.value = 0.3;

            source.connect(gain);
            gain.connect(audioContext.current.destination);

            source.start(0);
        } catch (err) {
            console.error("Sound playback failed:", err);
        }
    }

    return {
        playCorrect: () => play("correct"),
        playWrong: () => play("wrong"),
    };
}