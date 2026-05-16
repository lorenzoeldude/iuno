import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100px;
`;

const Card = styled.div`
    width: 100%;
    max-width: 420px;
    padding: 40px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 16px;
    background: white;
`;

const Title = styled.h1`
    font-size: 42px;
    margin-bottom: 10px;
    text-align: center;
`;

const Subtitle = styled.p`
    text-align: center;
    margin-bottom: 35px;
    opacity: 0.7;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px;
    font-size: 18px;
    margin-bottom: 16px;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 10px;
    box-sizing: border-box;
`;

const Button = styled.button`
    width: 100%;
    padding: 14px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    background: black;
    color: white;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Status = styled.p`
    margin-top: 20px;
    text-align: center;
`;

const BottomText = styled.p`
    margin-top: 25px;
    text-align: center;
`;

const StyledLink = styled(Link)`
    color: black;
`;

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {

        setLoading(true);
        setStatus("");

        try {

            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // ================================
            // SAFE RESPONSE HANDLING (FIX)
            // ================================
            const text = await res.text();

            if (!text) {
                throw new Error("Empty response from backend");
            }

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                throw new Error("Backend did not return valid JSON: " + text);
            }

            console.log("LOGIN RESPONSE:", data);

            if (!res.ok) {
                throw new Error(data.error || `Login failed (${res.status})`);
            }

            // ================================
            // TOKEN EXTRACTION (ROBUST)
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
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            setStatus("Logged in.");

            setTimeout(() => {
                navigate("/");
            }, 700);

        } catch (err) {
            console.error(err);
            setStatus(err.message || "Invalid email or password.");
        }

        setLoading(false);
    }

    return (
        <Wrapper>

            <Card>

                <Title>Login</Title>

                <Subtitle>
                    Welcome back to IUNO.
                </Subtitle>

                <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />

                <Button
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>

                {status && (
                    <Status>{status}</Status>
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