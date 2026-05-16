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

function RegisterPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    // =====================================================
    // REGISTER
    // =====================================================
    async function handleRegister() {

        setLoading(true);
        setStatus("");

        try {

            const res = await fetch(
                "http://localhost:8080/api/auth/register",
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

            // save user locally
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            setStatus("Account created.");

            // redirect
            setTimeout(() => {
                navigate("/");
            }, 800);

        } catch (err) {

            setStatus("Failed to register.");

        }

        setLoading(false);
    }

    return (
        <Wrapper>

            <Card>

                <Title>Register</Title>

                <Subtitle>
                    Create your IUNO account.
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

            </Card>

        </Wrapper>
    );
}

export default RegisterPage;