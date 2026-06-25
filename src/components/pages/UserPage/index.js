import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../../atoms/Card";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;

    margin: 0 auto;
    padding: 40px 20px;

    animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
    font-size: 52px;
    letter-spacing: 2px;

    margin-bottom: 30px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const Grid = styled.div`
    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

    gap: 20px;

    margin-bottom: 30px;
`;

const Button = styled.button`
    padding: 10px 18px;

    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px;

    background: white;

    cursor: pointer;

    transition: all 0.15s ease;

    &:hover {
        background: rgba(0,0,0,0.03);
        transform: translateY(-1px);
    }
`;

const LoginLink = styled(Link)`
    display: inline-block;

    padding: 10px 18px;

    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px;

    text-decoration: none;
    color: inherit;

    transition: all 0.15s ease;

    &:hover {
        background: rgba(0,0,0,0.03);
        transform: translateY(-1px);
    }
`;

function UserPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("User");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }

    useEffect(() => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (user?.username) {
                setUsername(user.username);
            }

        } catch (err) {
            console.error(err);
        }

    }, []);

    return (
        <Wrapper>

            <Title>
                {username}
            </Title>

            <Grid>

                <Card
                    title="Account Settings"
                    onClick={() => navigate("/user/settings")}
                >
                    Manage your account, authentication and preferences.
                </Card>

                <Card
                    title="Word List"
                    onClick={() => navigate("/user/list")}
                >
                    View and manage your saved Latin vocabulary.
                </Card>

            </Grid>

            {user ? (
                <Button onClick={logout}>
                    Logout
                </Button>
            ) : (
                <LoginLink to="/login">
                    Login
                </LoginLink>
            )}

        </Wrapper>
    );
}

export default UserPage;