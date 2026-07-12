import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Popup = styled.div`
    position: absolute;
    z-index: 1000;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    padding: 12px;
    min-width: 280px;
    max-width: 360px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
    float: right;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
`;

const Entry = styled.div`
    &:not(:last-child) {
        margin-bottom: 14px;
        padding-bottom: 14px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
`;

const Lemma = styled.div`
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 3px;

    &:hover {
        text-decoration: underline;
    }
`;

const Morphology = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 6px;
`;

const PossibleForms = styled.div`
    margin: 6px 0;
    font-size: 0.9rem;
`;

const PossibleTitle = styled.div`
    font-weight: bold;
    margin-bottom: 4px;
`;

const Form = styled.div`
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 8px;
`;

const Meaning = styled.div`
    font-size: 1rem;
    margin-bottom: 10px;
`;

function normalizeLatin(word) {
    return word
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function ordinal(n) {
    switch (n) {
        case 1:
            return "1st";
        case 2:
            return "2nd";
        case 3:
            return "3rd";
        default:
            return `${n}th`;
    }
}

function morphologyString(e) {
    if (e.part_of_speech === "verb") {
        const parts = [];

        if (e.tense) parts.push(capitalize(e.tense));
        if (e.voice) parts.push(capitalize(e.voice));
        if (e.mood) parts.push(capitalize(e.mood));

        if (e.person) {
            parts.push(`${ordinal(e.person)} Person`);
        }

        if (e.number) {
            parts.push(capitalize(e.number));
        }

        return parts.join(" ");
    }

    const parts = [];

    if (e.grammatical_case)
        parts.push(capitalize(e.grammatical_case));

    if (e.number)
        parts.push(capitalize(e.number));

    if (e.gender)
        parts.push(capitalize(e.gender));

    return parts.join(" ");
}

function groupEntries(entries) {
    const groups = new Map();

    for (const e of entries) {
        const key = `${e.lemma}|${e.part_of_speech}|${e.meaning}`;

        if (!groups.has(key)) {
            groups.set(key, {
                ...e,
                forms: [],
            });
        }

        const group = groups.get(key);

        const form = morphologyString(e);

        if (form && !group.forms.includes(form)) {
            group.forms.push(form);
        }
    }

    return [...groups.values()];
}

function DictionaryPopup({ popup, entry, onClose }) {
    const navigate = useNavigate();
    const popupRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                onClose();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () =>
            document.removeEventListener(
                "click",
                handleClickOutside
            );
    }, [onClose]);

    if (!popup) return null;

    const grouped = entry ? groupEntries(entry) : [];

    return (
        <Popup
            ref={popupRef}
            style={{
                left: popup.x,
                top: popup.y,
            }}
        >
            <CloseButton onClick={onClose}>×</CloseButton>

            {entry === null ? (
                <p>Loading...</p>
            ) : grouped.length > 0 ? (
                grouped.map((e, index) => (
                    <Entry key={index}>
                        <Lemma
                            onClick={() =>
                                navigate(
                                    `/dictionary/${normalizeLatin(
                                        e.lemma
                                    )}?form=${encodeURIComponent(
                                        e.form
                                    )}`
                                )
                            }
                        >
                            {e.form} ({e.lemma})
                        </Lemma>

                        <Meaning>{e.meaning}</Meaning>

                        <Morphology>
                            {capitalize(e.part_of_speech)}
                        </Morphology>
                        
                        {e.forms.length === 1 ? (
                            <Morphology>{e.forms[0]}</Morphology>
                        ) : (
                            <PossibleForms>
                                <PossibleTitle>
                                    Possible forms:
                                </PossibleTitle>

                                {e.forms.map((form, i) => (
                                    <Form key={i}>{form}</Form>
                                ))}
                            </PossibleForms>
                        )}
                    </Entry>
                ))
            ) : (
                <p>Not found.</p>
            )}
        </Popup>
    );
}

export default DictionaryPopup;