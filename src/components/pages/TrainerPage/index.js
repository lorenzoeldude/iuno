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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-top: 0px;
    }
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

    background: ${({ theme, active }) =>
        active
            ? theme.colors.text
            : theme.colors.surface};

    color: ${({ theme, active }) =>
        active
            ? theme.colors.opposite
            : theme.colors.text};

    transition:
        background ${({ theme }) => theme.transition.normal},
        color ${({ theme }) => theme.transition.normal},
        opacity ${({ theme }) => theme.transition.normal};

    &:hover {
        opacity: 0.8;
    }
`;

const BookSelect = styled.select`
    margin-top: ${({ theme }) => theme.spacing.md};

    padding: 12px 40px 12px 16px;

    border: 0.1px solid ${({ theme }) => theme.colors.border};

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.lg};

    cursor: pointer;

    appearance: none;


    transition:
        border-color ${({ theme }) => theme.transition.fast},
        background ${({ theme }) => theme.transition.fast};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}33;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSizes.md};
        padding: 10px 36px 10px 14px;
    }
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
                        active={mode === "book"}
                        onClick={() => {
                            setMode("book");
                            setBookListId(null);
                        }}
                    >
                        Book
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

            {(mode !== "book" || bookListId !== null) && (
                <Trainer
                    mode={mode}
                    listId={bookListId}
                />
            )}

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