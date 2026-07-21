import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
        margin-top: 0;
    }
`;

const SwitchWrapper = styled.div`
    display: flex;
    gap: 15px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 4px;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    cursor: pointer;

    border: none;

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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 6px 8px;
        font-size: ${({ theme }) => theme.fontSizes.sm};
        border-radius: 6px;
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
        margin-top: 8px;
        padding: 8px 32px 8px 12px;
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

function TrainerPage() {
    const { mode: urlMode, id } = useParams();

    const [mode, setMode] = useState("all");
    const [bookCategory, setBookCategory] = useState("book");
    const [selectedSourceId, setSelectedSourceId] = useState(null);

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    useEffect(() => {
        if (urlMode === "lesson") {
            setMode("lesson");
            setSelectedSourceId(id ? Number(id) : null);
        } else if (urlMode === "book") {
            setMode("book");
            setBookCategory("book");
            setSelectedSourceId(id ? Number(id) : null);
        } else {
            setMode("all");
            setSelectedSourceId(null);
        }
    }, [urlMode, id]);

    return (
        <Wrapper>
            <Controls>
                <SwitchWrapper>
                    <Button
                        active={mode === "all"}
                        onClick={() => {
                            setMode("all");
                            setSelectedSourceId(null);
                        }}
                    >
                        Random
                    </Button>

                    <Button
                        active={mode === "book" && bookCategory === "book"}
                        onClick={() => {
                            setMode("book");
                            setBookCategory("book");
                            setSelectedSourceId(null);
                        }}
                    >
                        Book
                    </Button>

                    <Button
                        active={mode === "book" && bookCategory === "lists"}
                        onClick={() => {
                            setMode("book");
                            setBookCategory("lists");
                            setSelectedSourceId(null);
                        }}
                    >
                        Lists
                    </Button>

                    <Button
                        active={mode === "lesson"}
                        onClick={() => {
                            setMode("lesson");
                            setSelectedSourceId(null);
                        }}
                    >
                        Lessons
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
                            setSelectedSourceId(null);
                        }}
                    >
                        My List
                    </Button>
                </SwitchWrapper>

                {(mode === "book" || mode === "lesson") && (
                    <BookSelect
                        value={selectedSourceId ?? ""}
                        onChange={(e) =>
                            setSelectedSourceId(Number(e.target.value))
                        }
                    >
                        {mode === "lesson" ? (
                            <>
                                <option value="">Choose a lesson...</option>
                                <option value={1}>I. Roma</option>
                            </>
                        ) : bookCategory === "book" ? (
                            <>
                                <option value="">Choose a book...</option>
                                <option value={15}>
                                    Fabulae Faciles – I. Perseus
                                </option>
                            </>
                        ) : (
                            <>
                                <option value="">Choose a list...</option>
                                <option value={16}>
                                    First 100 Words
                                </option>
                            </>
                        )}
                    </BookSelect>
                )}
            </Controls>

            {((mode !== "book" && mode !== "lesson") ||
                selectedSourceId !== null) && (
                <Trainer
                    mode={mode}
                    listId={selectedSourceId}
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