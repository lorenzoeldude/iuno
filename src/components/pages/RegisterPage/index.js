import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";

import Button2 from "../../atoms/Button2";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100px;
`;

const Card = styled.div`
    width: 100%;
    max-width: 420px;
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};

    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    text-align: center;
`;

const Subtitle = styled.p`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 14px;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-family: ${({ theme }) => theme.fonts.body};

    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid
        ${({ theme, $invalid }) =>
            $invalid
                ? theme.colors.danger
                : theme.colors.border};

    transition: border-color ${({ theme }) => theme.transition.fast};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
        outline: none;

        border-color: ${({ theme, $invalid }) =>
            $invalid
                ? theme.colors.danger
                : theme.colors.primary};
    }
`;

const ValidationText = styled.p`
    margin-top: -${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.danger};
`;

const Status = styled.p`
    margin-top: ${({ theme }) => theme.spacing.lg};

    text-align: center;

    color: ${({ theme }) => theme.colors.danger};
`;

const BottomText = styled.p`
    margin-top: ${({ theme }) => theme.spacing.xl};

    text-align: center;
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.primary};

    text-decoration: none;

    transition: color ${({ theme }) => theme.transition.fast};

    &:hover {
        color: ${({ theme }) => theme.colors.primaryHover};
    }
`;

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);

    const [status, setStatus] = useState("");

    // Server-side duplicate errors
    const [emailTaken, setEmailTaken] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);

    const usernameIsValid =
        /^[a-zA-Z0-9_]{3,20}$/.test(username);

    function getUsernameError() {
        if (!username) {
            return "";
        }

        if (/\s/.test(username)) {
            return "No spaces allowed.";
        }

        if (username.length < 3) {
            return "Username must be at least 3 characters.";
        }

        if (username.length > 20) {
            return "Username must be at most 20 characters.";
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return "Username can only contain letters, numbers, and underscores.";
        }

        return "";
    }

    const usernameError = getUsernameError();

    async function handleRegister() {
        if (!usernameIsValid) {
            setStatus("Please choose a valid username.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        username: username
                            .trim()
                            .toLowerCase(),
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {

                if (res.status === 409) {

                    if (
                        data.error ===
                        "email already exists"
                    ) {
                        setEmailTaken(true);
                        setUsernameTaken(false);

                        setStatus(
                            "An account with this email already exists."
                        );

                        return;
                    }

                    if (
                        data.error ===
                        "username already exists"
                    ) {
                        setUsernameTaken(true);
                        setEmailTaken(false);

                        setStatus(
                            "That username is already taken."
                        );

                        return;
                    }
                }

                setStatus(
                    data.error ||
                    "Failed to register."
                );

                return;
            }

            setRegistered(true);

        } catch (err) {

            console.error(
                "REGISTER ERROR:",
                err
            );

            setStatus(
                "Unable to connect to the server."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <Wrapper>

            <Card>

                {!registered ? (

                    <>

                        <Title>
                            Register
                        </Title>

                        <Subtitle>
                            Create your IUNONI account.
                        </Subtitle>

                        <Input
                            type="email"
                            placeholder="email"
                            value={email}
                            $invalid={emailTaken}
                            onChange={(e) => {
                                setEmail(
                                    e.target.value
                                );

                                setEmailTaken(false);

                                setStatus("");
                            }}
                        />

                        {emailTaken && (
                            <ValidationText>
                                An account with this
                                email already exists.
                            </ValidationText>
                        )}

                        <Input
                            type="text"
                            placeholder="username"
                            value={username}
                            maxLength={20}
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck={false}
                            $invalid={
                                Boolean(
                                    usernameError
                                ) ||
                                usernameTaken
                            }
                            onChange={(e) => {
                                setUsername(
                                    e.target.value
                                );

                                setUsernameTaken(false);

                                setStatus("");
                            }}
                        />

                        {usernameError && (
                            <ValidationText>
                                {usernameError}
                            </ValidationText>
                        )}

                        {usernameTaken &&
                            !usernameError && (
                                <ValidationText>
                                    That username is
                                    already taken.
                                </ValidationText>
                            )}

                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(
                                    e.target.value
                                );

                                setStatus("");
                            }}
                        />

                        <Button2
                            onClick={handleRegister}
                            disabled={
                                loading ||
                                !email.trim() ||
                                !usernameIsValid ||
                                !password
                            }
                        >
                            {loading
                                ? "Creating..."
                                : "Create Account"}
                        </Button2>

                        {status &&
                            !emailTaken &&
                            !usernameTaken && (
                                <Status>
                                    {status}
                                </Status>
                            )}

                        <BottomText>
                            Already have an account?{" "}
                            <StyledLink to="/login">
                                Login
                            </StyledLink>
                        </BottomText>

                    </>

                ) : (

                    <>

                        <Title>
                            Check your email
                        </Title>

                        <Subtitle>
                            We sent a verification
                            link to:
                        </Subtitle>

                        <Status>
                            {email}
                        </Status>

                        <Status>
                            Please click the link
                            in the email to verify
                            your account.
                        </Status>

                    </>

                )}

            </Card>

        </Wrapper>
    );
}

export default RegisterPage;