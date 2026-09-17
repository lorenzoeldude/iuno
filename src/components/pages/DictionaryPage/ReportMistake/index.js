import { useState } from "react";
import styled from "styled-components";

import { API_URL } from "../../../../config";

const ReportMistake = ({
    lemmaId,
    token,
    isAuthed,
    onLoginRequired,
}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleOpen = () => {
        if (!isAuthed) {
            onLoginRequired();
            return;
        }

        setMessage("");
        setError("");
        setSuccess(false);
        setOpen(true);
    };

    const handleClose = () => {
        if (submitting) return;

        setOpen(false);
        setMessage("");
        setError("");
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || submitting) {
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/api/dictionary-reports`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        lemmaId,
                        message: trimmedMessage,
                        platform: "web",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit report");
            }

            setSuccess(true);
            setMessage("");
        } catch (err) {
            console.error("Failed to submit dictionary report:", err);
            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <ReportButton onClick={handleOpen}>
                Report a mistake
            </ReportButton>

            {open && (
                <Overlay onClick={handleClose}>
                    <Modal
                        onClick={(e) => e.stopPropagation()}
                    >
                        {success ? (
                            <>
                                <Title>
                                    Report submitted
                                </Title>

                                <Message>
                                    Thanks for helping us improve
                                    the dictionary.
                                </Message>

                                <CloseButton
                                    type="button"
                                    onClick={handleClose}
                                >
                                    Close
                                </CloseButton>
                            </>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Title>
                                    Report a mistake
                                </Title>

                                <Message>
                                    Found something incorrect in this
                                    entry? Let us know.
                                </Message>

                                <Input
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    placeholder="What seems to be incorrect?"
                                    maxLength={2000}
                                    autoFocus
                                />

                                {error && (
                                    <ErrorMessage>
                                        {error}
                                    </ErrorMessage>
                                )}

                                <Actions>
                                    <CancelButton
                                        type="button"
                                        onClick={handleClose}
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </CancelButton>

                                    <SubmitButton
                                        type="submit"
                                        disabled={
                                            submitting ||
                                            !message.trim()
                                        }
                                    >
                                        {submitting
                                            ? "Sending..."
                                            : "Report"}
                                    </SubmitButton>
                                </Actions>
                            </Form>
                        )}
                    </Modal>
                </Overlay>
            )}
        </>
    );
};

const ReportButton = styled.button`
    margin-top: 24px;
    padding: 0;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
    width: 100%;
    max-width: 500px;

    padding: 28px;

    background: ${({ theme }) => theme.colors.background};

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    margin: 0 0 10px;

    color: ${({ theme }) => theme.colors.text};
    font-size: 22px;
    font-weight: 600;
`;

const Message = styled.p`
    margin: 0 0 20px;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 15px;
    line-height: 1.5;
`;

const Input = styled.textarea`
    width: 100%;
    min-height: 110px;

    padding: 12px;

    box-sizing: border-box;

    border: 1px solid
        ${({ theme }) => theme.colors.textSecondary};

    border-radius: 0;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    font-family: inherit;
    font-size: 15px;
    line-height: 1.5;

    resize: vertical;

    outline: none;

    &:focus {
        border-color: ${({ theme }) => theme.colors.brand};
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const ErrorMessage = styled.p`
    margin: 10px 0 0;

    color: ${({ theme }) => theme.colors.danger};
    font-size: 14px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    margin-top: 20px;
`;

const CancelButton = styled.button`
    padding: 10px 16px;

    border: 1px solid
        ${({ theme }) => theme.colors.textSecondary};

    border-radius: 0;

    background: transparent;
    color: ${({ theme }) => theme.colors.text};

    font-size: 14px;

    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

const CloseButton = styled.button`
    padding: 10px 18px;

    border: none;
    border-radius: 0;

    background: ${({ theme }) => theme.colors.brand};
    color: white;

    font-size: 14px;

    cursor: pointer;
`;

const SubmitButton = styled.button`
    padding: 10px 18px;

    border: none;
    border-radius: 0;

    background: ${({ theme }) => theme.colors.brand};
    color: white;

    font-size: 14px;

    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export default ReportMistake;