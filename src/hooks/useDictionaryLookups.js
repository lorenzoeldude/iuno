import { useState } from "react";
import { API_URL } from "../config";

function normalizeLatin(word) {
    return word
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}

export default function useDictionaryLookup() {
    const [popup, setPopup] = useState(null);
    const [entry, setEntry] = useState(null);

    async function lookupWord(word, event) {
        const wordRect = event.currentTarget.getBoundingClientRect();

        setPopup({
            word,
            x: wordRect.left + wordRect.width / 2,
            y: wordRect.bottom + 6,
        });

        setEntry(null);

        try {
            const normalized = normalizeLatin(word);

            const response = await fetch(
                `${API_URL}/api/lookup?form=${encodeURIComponent(normalized)}`
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