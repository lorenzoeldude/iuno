import styled from "styled-components";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    width: 72%;
    max-width: 700px;
    margin: 0 auto;
    padding: 60px 0 100px 0;
`;

const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 22px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 16px;
    opacity: 0.7;
`;

const Input = styled.input`
    padding: 16px;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.12);
    font-size: 18px;
    outline: none;

    &:focus {
        border-color: rgba(0,0,0,0.4);
    }
`;

const SaveButton = styled.button`
    margin-top: 15px;
    padding: 16px;
    border: none;
    border-radius: 14px;
    font-size: 18px;
    cursor: pointer;
    background: black;
    color: white;
    transition: 0.15s ease;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Message = styled.p`
    margin-top: 20px;
    font-size: 17px;
    color: ${(props) =>
        props.error ? "#c0392b" : "#27ae60"};
`;

function UserSettings() {

    const token = localStorage.getItem("token");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    // =====================================================
    // PREFILL FROM LOCAL STORAGE
    // =====================================================
    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) return;

        setUsername(user.username || "");
        setEmail(user.email || "");

    }, []);

    // =====================================================
    // SAVE SETTINGS
    // =====================================================
    async function handleSubmit(e) {

        e.preventDefault();

        setSaving(true);
        setMessage("");

        try {

            const res = await fetch(
                "http://localhost:8080/api/settings",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            const text = await res.text();

            if (!res.ok) {
                throw new Error(text);
            }

            // update local user
            const oldUser = JSON.parse(
                localStorage.getItem("user")
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...oldUser,
                    username,
                    email,
                })
            );

            setPassword("");

            setError(false);
            setMessage("Settings updated.");

        } catch (err) {

            console.error(err);

            setError(true);
            setMessage(err.message);

        }

        setSaving(false);
    }

    return (
        <Wrapper>

            <Title>Settings</Title>

            <Form onSubmit={handleSubmit}>

                <Field>
                    <Label>Username</Label>

                    <Input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </Field>

                <Field>
                    <Label>Email</Label>

                    <Input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </Field>

                <Field>
                    <Label>New Password</Label>

                    <Input
                        type="password"
                        value={password}
                        placeholder="Leave empty to keep current password"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </Field>

                <SaveButton
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </SaveButton>

            </Form>

            {message && (
                <Message error={error}>
                    {message}
                </Message>
            )}

        </Wrapper>
    );
}

export default UserSettings;