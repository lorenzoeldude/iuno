import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            });

            // ================================
            // SAFE RESPONSE HANDLING
            // ================================

            const text = await res.text();

            if (!text) {
                throw new Error("Empty response from backend");
            }

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(text);
            }

            console.log("LOGIN RESPONSE:", data);

            if (!res.ok) {
                throw new Error(
                    data.error || `Login failed (${res.status})`
                );
            }

            // ================================
            // TOKEN EXTRACTION
            // ================================

            const token =
                data.token ||
                data.access_token ||
                data.jwt ||
                data.data?.token;

            if (!token) {
                throw new Error("No token returned from backend");
            }

            localStorage.setItem("token", token);

            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            setStatus("Logged in.");

            setTimeout(() => {
                navigate("/user");
            }, 700);

        } catch (err) {
            console.error(err);

            setStatus(
                err.message ||
                "Invalid email/username or password."
            );
        }

        setLoading(false);
    }

    return (
        <Wrapper>

            <Card>

                <Title>
                    Login
                </Title>

                <Subtitle>
                    Welcome back to IUNONI.
                </Subtitle>

                <Input
                    type="text"
                    placeholder="email or username"
                    value={identifier}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    onChange={(e) => {
                        setIdentifier(e.target.value);
                        setStatus("");
                    }}
                />

                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setStatus("");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />

                <Button2
                    onClick={handleLogin}
                    disabled={
                        loading ||
                        !identifier.trim() ||
                        !password
                    }
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </Button2>

                {status && (
                    <Status>
                        {status}
                    </Status>
                )}

                <BottomText>
                    No account yet?{" "}
                    <StyledLink to="/register">
                        Register
                    </StyledLink>
                </BottomText>

            </Card>

        </Wrapper>
    );
}

export default LoginPage;