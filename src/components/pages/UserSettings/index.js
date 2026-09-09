import styled from "styled-components";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const Wrapper = styled.div`
    width: 72%;
    max-width: 700px;

    margin: 0 auto;

    padding: 50px 0 100px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 90%;
        padding: 30px 0 80px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SectionTitle = styled.h1`
    margin: 0 0 12px;

    font-family: "Cormorant Garamond", serif;
    font-size: 38px;
    font-weight: 600;
    line-height: 1.1;

    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 34px;
    }
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const Input = styled.input`
    width: 100%;

    box-sizing: border-box;

    padding: 12px 14px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 17px;

    color: ${({ theme }) => theme.colors.text};

    background: ${({ theme }) =>
        theme.colors.background};

    border: 1px solid
        ${({ theme }) =>
            `${theme.colors.text}2E`};

    outline: none;

    transition:
        border-color ${({ theme }) =>
            theme.transition.fast};

    &:focus {
        border-color: ${({ theme }) =>
            theme.colors.accent};
    }

    &::placeholder {
        color: ${({ theme }) =>
            theme.colors.textSecondary};
        opacity: 0.6;
    }
`;

const ReadOnlyValue = styled.div`
    width: 100%;

    box-sizing: border-box;

    padding: 12px 0;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 17px;

    color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
    align-self: flex-start;

    padding: 10px 18px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;

    border: none;

    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.opposite};

    cursor: pointer;

    transition:
        opacity ${({ theme }) => theme.transition.fast};

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

const Status = styled.p`
    margin: 0;

    font-size: 15px;

    color: ${({ theme, error }) =>
        error
            ? "#c0392b"
            : theme.colors.textSecondary};
`;

const PasswordSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PasswordTitle = styled.h2`
    margin: 0;

    font-family: "Cormorant Garamond", serif;
    font-size: 25px;
    font-weight: 600;

    color: ${({ theme }) => theme.colors.text};
`;

const PasswordFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const DangerZone = styled.section`
    margin-top: 40px;

    padding-top: 30px;

    border-top: 1px solid
        ${({ theme }) =>
            `${theme.colors.text}1F`};

    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const DangerTitle = styled.h2`
    margin: 0;

    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.7px;
    text-transform: uppercase;

    color: #c0392b;
`;

const DangerText = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.5;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const DeleteButton = styled.button`
    width: 100%;

    padding: 14px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;

    border: 1px solid
        rgba(192, 57, 43, 0.45);

    background: rgba(192, 57, 43, 0.08);
    color: #c0392b;

    cursor: pointer;

    transition:
        background ${({ theme }) =>
            theme.transition.fast},
        opacity ${({ theme }) =>
            theme.transition.fast};

    &:hover {
        background: rgba(192, 57, 43, 0.15);
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

/* =====================================================
   DELETE MODAL
===================================================== */

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    box-sizing: border-box;

    background: rgba(0, 0, 0, 0.45);
`;

const Modal = styled.div`
    width: 100%;
    max-width: 450px;

    box-sizing: border-box;

    padding: 32px;

    background: ${({ theme }) =>
        theme.colors.background};

    color: ${({ theme }) =>
        theme.colors.text};

    border: 1px solid
        ${({ theme }) =>
            `${theme.colors.text}1F`};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 24px;
    }
`;

const ModalTitle = styled.h2`
    margin: 0 0 12px;

    font-family: "Cormorant Garamond", serif;
    font-size: 28px;
    font-weight: 600;
`;

const ModalText = styled.p`
    margin: 0 0 20px;

    font-size: 16px;
    line-height: 1.5;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const ModalInput = styled.input`
    width: 100%;

    box-sizing: border-box;

    padding: 12px 14px;

    margin-bottom: 20px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 17px;

    color: ${({ theme }) => theme.colors.text};

    background: ${({ theme }) =>
        theme.colors.background};

    border: 1px solid
        ${({ theme }) =>
            `${theme.colors.text}33`};

    outline: none;

    &:focus {
        border-color: #c0392b;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    gap: 12px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`;

const CancelButton = styled.button`
    flex: 1;

    padding: 12px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;

    border: 1px solid
        ${({ theme }) =>
            `${theme.colors.text}2E`};

    background: transparent;
    color: ${({ theme }) =>
        theme.colors.text};

    cursor: pointer;

    &:hover {
        background: ${({ theme }) =>
            `${theme.colors.text}0A`};
    }
`;

const ConfirmDeleteButton = styled.button`
    flex: 1;

    padding: 12px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;

    border: 1px solid
        rgba(192, 57, 43, 0.45);

    background: rgba(192, 57, 43, 0.08);
    color: #c0392b;

    cursor: pointer;

    &:hover {
        background: rgba(192, 57, 43, 0.15);
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

function UserSettings() {
    const token = localStorage.getItem("token");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] =
        useState(false);

    const [status, setStatus] = useState("");
    const [passwordStatus, setPasswordStatus] =
        useState("");

    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [deleteConfirmation, setDeleteConfirmation] =
        useState("");

    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) return;

        setUsername(user.username || "");
        setEmail(user.email || "");
    }, []);

    // =====================================================
    // SAVE USERNAME
    // =====================================================

    async function saveUsername(e) {
        e.preventDefault();

        const trimmedUsername =
            username.trim();

        if (!trimmedUsername) {
            setError(true);
            setStatus("Username is required.");
            return;
        }

        setSaving(true);
        setStatus("");
        setError(false);

        try {
            const res = await fetch(
                `${API_URL}/api/settings`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: trimmedUsername,
                        current_password: "",
                        password: "",
                    }),
                }
            );

            const text = await res.text();

            if (!res.ok) {
                throw new Error(text);
            }

            const result = JSON.parse(text);

            const oldUser = JSON.parse(
                localStorage.getItem("user")
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...oldUser,
                    username: trimmedUsername,
                })
            );

            if (result.token) {
                localStorage.setItem(
                    "token",
                    result.token
                );
            }

            setUsername(trimmedUsername);
            setError(false);
            setStatus("Username updated.");
        } catch (err) {
            setError(true);
            setStatus(err.message);
        } finally {
            setSaving(false);
        }
    }

    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    async function changePassword(e) {
        e.preventDefault();

        setPasswordStatus("");
        setPasswordError(false);

        if (!currentPassword) {
            setPasswordError(true);
            setPasswordStatus(
                "Current password is required."
            );
            return;
        }

        if (!newPassword) {
            setPasswordError(true);
            setPasswordStatus(
                "New password is required."
            );
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError(true);
            setPasswordStatus(
                "New password must be at least 8 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError(true);
            setPasswordStatus(
                "Passwords do not match."
            );
            return;
        }

        setChangingPassword(true);

        try {
            const res = await fetch(
                `${API_URL}/api/settings`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username:
                            username.trim(),
                        current_password:
                            currentPassword,
                        password:
                            newPassword,
                    }),
                }
            );

            const text = await res.text();

            if (!res.ok) {
                throw new Error(text);
            }

            const result = JSON.parse(text);

            if (result.token) {
                localStorage.setItem(
                    "token",
                    result.token
                );
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setPasswordError(false);
            setPasswordStatus(
                "Password changed."
            );
        } catch (err) {
            setPasswordError(true);
            setPasswordStatus(err.message);
        } finally {
            setChangingPassword(false);
        }
    }

    // =====================================================
    // DELETE ACCOUNT
    // =====================================================

    async function handleDeleteAccount() {
        setDeleting(true);

        try {
            const res = await fetch(
                `${API_URL}/api/account`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to delete account"
                );
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        } catch (err) {
            setError(true);
            setStatus(err.message);
            setShowDeleteModal(false);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Wrapper>
            <SectionTitle>
                Account Settings
            </SectionTitle>

            <Form>
                {/* =================================================
                    USERNAME
                ================================================= */}

                <Section>
                    <Field>
                        <Label>
                            Username
                        </Label>

                        <Input
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Button
                        type="button"
                        onClick={saveUsername}
                        disabled={
                            saving ||
                            changingPassword ||
                            deleting
                        }
                    >
                        {saving
                            ? "Saving..."
                            : "Save Username"}
                    </Button>

                    {status && (
                        <Status error={error}>
                            {status}
                        </Status>
                    )}
                </Section>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <Field>
                    <Label>
                        Email
                    </Label>

                    <ReadOnlyValue>
                        {email}
                    </ReadOnlyValue>
                </Field>

                {/* =================================================
                    PASSWORD
                ================================================= */}

                <PasswordSection>
                    <PasswordTitle>
                        Password
                    </PasswordTitle>

                    <PasswordFields>
                        <Field>
                            <Label>
                                Current Password
                            </Label>

                            <Input
                                type="password"
                                placeholder="Current password"
                                value={
                                    currentPassword
                                }
                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field>
                            <Label>
                                New Password
                            </Label>

                            <Input
                                type="password"
                                placeholder="New password"
                                value={
                                    newPassword
                                }
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field>
                            <Label>
                                Confirm New Password
                            </Label>

                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={
                                    confirmPassword
                                }
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />
                        </Field>
                    </PasswordFields>

                    <Section>
                        <Button
                            type="button"
                            onClick={changePassword}
                            disabled={
                                saving ||
                                changingPassword ||
                                deleting
                            }
                        >
                            {changingPassword
                                ? "Changing Password..."
                                : "Change Password"}
                        </Button>

                        {passwordStatus && (
                            <Status
                                error={passwordError}
                            >
                                {passwordStatus}
                            </Status>
                        )}
                    </Section>
                </PasswordSection>
            </Form>

            {/* =====================================================
                DANGER ZONE
            ===================================================== */}

            <DangerZone>
                <DangerTitle>
                    Danger Zone
                </DangerTitle>

                <DangerText>
                    This permanently deletes your
                    account, progress, word lists,
                    and saved data.
                </DangerText>

                <DeleteButton
                    type="button"
                    onClick={() => {
                        setDeleteConfirmation("");
                        setShowDeleteModal(true);
                    }}
                    disabled={
                        saving ||
                        changingPassword ||
                        deleting
                    }
                >
                    Delete Account
                </DeleteButton>
            </DangerZone>

            {/* =====================================================
                DELETE MODAL
            ===================================================== */}

            {showDeleteModal && (
                <Overlay>
                    <Modal>
                        <ModalTitle>
                            Delete Account?
                        </ModalTitle>

                        <ModalText>
                            This action cannot be
                            undone. Type DELETE to
                            confirm.
                        </ModalText>

                        <ModalInput
                            value={
                                deleteConfirmation
                            }
                            onChange={(e) =>
                                setDeleteConfirmation(
                                    e.target.value
                                )
                            }
                            placeholder="DELETE"
                            autoFocus
                        />

                        <ModalButtons>
                            <CancelButton
                                type="button"
                                onClick={() => {
                                    setShowDeleteModal(
                                        false
                                    );
                                    setDeleteConfirmation(
                                        ""
                                    );
                                }}
                            >
                                Cancel
                            </CancelButton>

                            <ConfirmDeleteButton
                                type="button"
                                disabled={
                                    deleteConfirmation !==
                                        "DELETE" ||
                                    deleting
                                }
                                onClick={
                                    handleDeleteAccount
                                }
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete Forever"}
                            </ConfirmDeleteButton>
                        </ModalButtons>
                    </Modal>
                </Overlay>
            )}
        </Wrapper>
    );
}

export default UserSettings;