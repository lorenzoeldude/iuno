import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";

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

    border: 1px solid ${({ theme }) => theme.colors.border};

    transition: border-color ${({ theme }) => theme.transition.fast};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 14px;

    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    border: none;

    cursor: pointer;

    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.opposite};

    transition: background ${({ theme }) => theme.transition.fast};

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Status = styled.p`
    margin-top: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
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

    async function handleRegister() {

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
                        email,
                        username,
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to register");
            }

            setRegistered(true);

        } catch (err) {

            setStatus("Failed to register.");

        }

        setLoading(false);
    }

    return (
        <Wrapper>

            <Card>

                {!registered ? (
                    <>
                        <Title>Register</Title>

                        <Subtitle>
                            Create your IUNONI account.
                        </Subtitle>

                        <Input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </Button>

                        {status && (
                            <Status>{status}</Status>
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
                        <Title>Check your email</Title>

                        <Subtitle>
                            We sent a verification link to:
                        </Subtitle>

                        <Status>
                            {email}
                        </Status>

                        <Status>
                            Please click the link in the email to verify your account.
                        </Status>
                    </>
                )}

            </Card>

        </Wrapper>
    );
}

export default RegisterPage;