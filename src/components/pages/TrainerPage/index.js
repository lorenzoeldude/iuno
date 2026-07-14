import styled from "styled-components";
import { useState } from "react";

import Trainer from "../Trainer";
import LoginRequiredPopup from "../../atoms/LoginRequiredPopup";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Controls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;

const SwitchWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

const Button = styled.button`
    padding: 10px 20px;
    cursor: pointer;

    border: none;
    border-radius: 8px;

    background: ${(props) =>
        props.active ? "black" : "#ddd"};

    color: ${(props) =>
        props.active ? "white" : "black"};

    transition: 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

const BookSelect = styled.select`
    margin-top: 16px;
    padding: 10px 14px;

    border-radius: 8px;
    border: 1px solid #ccc;

    font-size: 16px;
    cursor: pointer;
`;

function TrainerPage() {
    const [mode, setMode] = useState("all");
    const [bookListId, setBookListId] = useState(null);

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    return (
        <Wrapper>
            <Controls>
                <SwitchWrapper>
                    <Button
                        active={mode === "all"}
                        onClick={() => {
                            setMode("all");
                            setBookListId(null);
                        }}
                    >
                        Random
                    </Button>

                    <Button
                        active={mode === "list"}
                        onClick={() => {
                            const token = localStorage.getItem("token");

                            if (!token) {
                                setShowLoginPopup(true);
                                return;
                            }

                            setMode("list");
                            setBookListId(null);
                        }}
                    >
                        My List
                    </Button>

                    <Button
                        active={mode === "book"}
                        onClick={() => {
                            setMode("book");
                            setBookListId(null);
                        }}
                    >
                        Book
                    </Button>
                </SwitchWrapper>

                {mode === "book" && (
                    <BookSelect
                        value={bookListId ?? ""}
                        onChange={(e) =>
                            setBookListId(Number(e.target.value))
                        }
                    >
                        <option value="">Choose a book...</option>
                        <option value={15}>
                            Fabulae Faciles – I. Perseus
                        </option>
                    </BookSelect>
                )}
            </Controls>

            <Trainer
                mode={mode}
                listId={bookListId}
            />

            <LoginRequiredPopup
                open={showLoginPopup}
                onClose={() => setShowLoginPopup(false)}
                title="Login Required"
                message="Log in to train words from your word list."
            />
        </Wrapper>
    );
}

export default TrainerPage;