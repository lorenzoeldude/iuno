import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useTheme } from "../../../context/AppThemeProvider";
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

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;

    margin-bottom: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const Button = styled.button`
    padding: 10px 18px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    cursor: pointer;

    transition: all ${({ theme }) => theme.transition.fast};

    &:hover {
        background: ${({ theme }) => theme.colors.card};
        transform: translateY(-1px);
    }
`;

const LoginLink = styled(Link)`
    display: inline-block;

    padding: 10px 18px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};

    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};

    transition: all ${({ theme }) => theme.transition.fast};

    &:hover {
        background: ${({ theme }) => theme.colors.surface};
        transform: translateY(-1px);
    }
`;


function UserPage() {

    const navigate = useNavigate();

    const { theme, setTheme } = useTheme();

    const [username, setUsername] = useState("User");
    const [user, setUser] = useState(null);


    useEffect(() => {

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");


        if (!token || !storedUser) {
            navigate("/login");
            return;
        }


        try {

            const parsedUser = JSON.parse(storedUser);

            setUser(parsedUser);

            if (parsedUser?.username) {
                setUsername(parsedUser.username);
            }

        } catch (err) {

            console.error(err);

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login");
        }


    }, [navigate]);


    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }


    if (!user) {
        return null;
    }


    return (
        <Wrapper>

            <Title>
                {username}
                {user?.is_admin && " (admin)"}
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


                {user?.is_admin && (
                    <Card
                        title="Admin Page"
                        onClick={() => navigate("/admin")}
                    >
                        Add words and see the stats of IUNO.com
                    </Card>
                )}

            </Grid>


            <ButtonGroup>

                <Button
                    onClick={() => setTheme("light")}
                >
                    ☀️ Light {theme === "light" && "✓"}
                </Button>


                <Button
                    onClick={() => setTheme("dark")}
                >
                    🌙 Dark {theme === "dark" && "✓"}
                </Button>


                <Button
                    onClick={() => setTheme("system")}
                >
                    💻 System {theme === "system" && "✓"}
                </Button>

            </ButtonGroup>


            <Button onClick={logout}>
                Logout
            </Button>


        </Wrapper>
    );
}


export default UserPage;