import { useState } from "react";

function normalizeLatin(word) {
    const result = word
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    console.log(word, "→", result);

    return result;
}

export default function useDictionaryLookup() {
    const [popup, setPopup] = useState(null);
    const [entry, setEntry] = useState(null);

    async function lookupWord(word, event, wrapperRef) {
        const wordRect = event.currentTarget.getBoundingClientRect();
        const wrapperRect = wrapperRef.current.getBoundingClientRect();

        setPopup({
            word,
            x: wordRect.left - wrapperRect.left,
            y: wordRect.bottom - wrapperRect.top + 6,
        });

        setEntry(null);

        try {
            const normalized = normalizeLatin(word);

            const response = await fetch(
                `http://localhost:8080/api/search?q=${encodeURIComponent(
                    normalized
                )}`
            );

            if (!response.ok) {
                setEntry([]);
                return;
            }

            const data = await response.json();
            setEntry(data || []);
        } catch (err) {
            console.error(err);
            setEntry([]);
        }
    }

    function closePopup() {
        setPopup(null);
        setEntry(null);
    }

    return {
        popup,
        entry,
        lookupWord,
        closePopup,
    };
}