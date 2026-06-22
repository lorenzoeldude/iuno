import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Popup = styled.div`
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    min-width: 250px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
    float: right;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
`;

const Lemma = styled.div`
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 8px;

    &:hover {
        text-decoration: underline;
    }
`;

function normalizeLatin(word) {
    return word
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
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

        return () => {
            document.removeEventListener(
                "click",
                handleClickOutside
            );
        };
    }, [onClose]);

    if (!popup) {
        return null;
    }

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
            ) : entry.length > 0 ? (
                <>
                    <Lemma
                        onClick={() =>
                            navigate(
                                `/dictionary/${normalizeLatin(entry[0].lemma)}`
                            )
                        }
                    >
                        {entry[0].lemma}
                    </Lemma>

                    <p>{entry[0].meaning}</p>
                </>
            ) : (
                <p>Not found.</p>
            )}
        </Popup>
    );
}

export default DictionaryPopup;