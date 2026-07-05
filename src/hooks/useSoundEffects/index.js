import { useEffect, useRef } from "react";

export default function useSoundEffects() {
    const audioContext = useRef(null);

    const correctBuffer = useRef(null);
    const wrongBuffer = useRef(null);

    useEffect(() => {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        const context = new AudioContext();

        audioContext.current = context;

        async function loadSound(url) {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();

            return await context.decodeAudioData(arrayBuffer);
        }

        async function load() {
            correctBuffer.current = await loadSound("/sounds/correct.wav");
            wrongBuffer.current = await loadSound("/sounds/wrong.wav");
        }

        load();
    }, []);

    async function play(buffer) {
        if (!audioContext.current || !buffer) return;

        // Safari sometimes starts suspended
        if (audioContext.current.state === "suspended") {
            await audioContext.current.resume();
        }

        const source = audioContext.current.createBufferSource();

        source.buffer = buffer;

        const gain = audioContext.current.createGain();
        gain.gain.value = 0.3;

        source.connect(gain);
        gain.connect(audioContext.current.destination);

        source.start();
    }

    return {
        playCorrect: () => play(correctBuffer.current),
        playWrong: () => play(wrongBuffer.current),
    };
}