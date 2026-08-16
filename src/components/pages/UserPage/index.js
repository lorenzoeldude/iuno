import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_URL } from "../../../config";

import { useTheme } from "../../../context/AppThemeProvider";
import Card from "../../atoms/Card";
import Button2 from "../../atoms/Button2";
import TrainingStats from "../../molecules/TrainingStats";

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
    padding: 50px 24px 60px;

    animation: ${fadeIn} 0.7s ease-out;

    @media (max-width: 600px) {
        padding: 32px 18px 50px;
    }
`;

const Header = styled.div`
    margin-bottom: 42px;
`;

const Title = styled.h1`
    margin: 0;

    font-size: 48px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 1.1;

    @media (max-width: 600px) {
        font-size: 38px;
    }
`;

const Sestertii = styled.div`
    display: flex;
    align-items: center;

    gap: 6px;

    margin-top: 8px;

    font-size: 16px;

    opacity: 0.5;
`;

const SestertiiIcon = styled.span`
    font-size: 12px;

    opacity: 0.8;
`;

const Section = styled.section`
    margin-bottom: 50px;
`;

const SectionHeading = styled.div`
    margin-bottom: 14px;

    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.7px;
    text-transform: uppercase;

    opacity: 0.5;
`;

/* =====================================================
   MANAGE
   ===================================================== */

const Grid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 20px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

/* =====================================================
   APPEARANCE
   ===================================================== */

const AppearanceControl = styled.div`
    display: inline-flex;
    align-items: center;

    width: fit-content;
    max-width: 100%;

    padding: 4px;

    border: 1px solid ${({ theme }) => theme.colors.border};

    background: ${({ theme }) => theme.colors.surface};

    @media (max-width: 500px) {
        display: flex;
        width: 100%;
    }
`;

const AppearanceButton = styled.button`
    min-width: 110px;
    padding: 9px 16px;

    border: none;

    background: ${({ active, theme }) =>
        active
            ? theme.colors.card
            : "transparent"};

    color: ${({ theme }) => theme.colors.text};

    font: inherit;
    font-size: 14px;

    cursor: pointer;

    transition:
        background ${({ theme }) => theme.transition.fast},
        transform ${({ theme }) => theme.transition.fast};

    &:hover {
        transform: translateY(-1px);
    }

    @media (max-width: 500px) {
        flex: 1;
        min-width: 0;
        padding: 9px 8px;
    }
`;

/* =====================================================
   BOTTOM
   ===================================================== */

const BottomArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-top: 8px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
`;

const AdminLabel = styled.span`
    margin-left: 10px;

    font-size: 14px;
    letter-spacing: 0.5px;

    opacity: 0.45;
`;

/* =====================================================
   USER PAGE
   ===================================================== */

function UserPage() {

    const navigate = useNavigate();

    const { theme, setTheme } = useTheme();

    const [username, setUsername] =
        useState("User");

    const [user, setUser] =
        useState(null);

    const [trainingStats, setTrainingStats] =
        useState(null);

    /* =====================================================
       INITIAL DATA
       ===================================================== */

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        const storedUser =
            localStorage.getItem("user");

        if (!token || !storedUser) {

            navigate("/login");

            return;
        }

        try {

            const parsedUser =
                JSON.parse(storedUser);

            setUser(parsedUser);

            if (parsedUser?.username) {

                setUsername(
                    parsedUser.username
                );

            }

        } catch (error) {

            console.error(
                "USER PARSE ERROR:",
                error
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login");

            return;
        }

        /* =================================================
           FETCH TRAINING STATS
           ================================================= */

        async function fetchTrainingStats() {

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/training/stats`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (!response.ok) {

                    throw new Error(
                        `Failed to fetch training stats: ${response.status}`
                    );
                }

                const data =
                    await response.json();

                setTrainingStats(data);

            } catch (error) {

                console.error(
                    "TRAINING STATS ERROR:",
                    error
                );

            }
        }

        fetchTrainingStats();

    }, [navigate]);

    /* =====================================================
       LOGOUT
       ===================================================== */

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

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Header>

                <Title>

                    {username}

                    {user?.is_admin && (

                        <AdminLabel>
                            Admin
                        </AdminLabel>

                    )}

                </Title>

                <Sestertii>

                    <SestertiiIcon>
                        ◉
                    </SestertiiIcon>

                    {trainingStats?.sestertii ?? 0}
                    {" "}
                    sestertii

                </Sestertii>

            </Header>

            {/* =====================================================
                TRAINING
            ===================================================== */}

            <Section>

                <SectionHeading>
                    Stats
                </SectionHeading>

                <TrainingStats
                    stats={trainingStats}
                />

            </Section>

            {/* =====================================================
                MANAGE
            ===================================================== */}

            <Section>

                <SectionHeading>
                    Manage
                </SectionHeading>

                <Grid>

                    <Card
                        title="Account Settings"
                        onClick={() =>
                            navigate(
                                "/user/settings"
                            )
                        }
                    >
                        Manage your account,
                        authentication and
                        preferences.
                    </Card>

                    <Card
                        title="Word List"
                        onClick={() =>
                            navigate(
                                "/user/list"
                            )
                        }
                    >
                        View and manage your
                        saved Latin vocabulary.
                    </Card>

                    {user?.is_admin && (

                        <Card
                            title="Admin Page"
                            onClick={() =>
                                navigate(
                                    "/admin"
                                )
                            }
                        >
                            Add words and view
                            application statistics.
                        </Card>

                    )}

                </Grid>

            </Section>

            {/* =====================================================
                APPEARANCE
            ===================================================== */}

            <Section>

                <SectionHeading>
                    Appearance
                </SectionHeading>

                <AppearanceControl>

                    <AppearanceButton
                        active={
                            theme === "light"
                        }
                        onClick={() =>
                            setTheme("light")
                        }
                    >
                        ☀ Light
                    </AppearanceButton>

                    <AppearanceButton
                        active={
                            theme === "dark"
                        }
                        onClick={() =>
                            setTheme("dark")
                        }
                    >
                        ◐ Dark
                    </AppearanceButton>

                    <AppearanceButton
                        active={
                            theme === "system"
                        }
                        onClick={() =>
                            setTheme("system")
                        }
                    >
                        💻 System
                    </AppearanceButton>

                </AppearanceControl>

            </Section>

            {/* =====================================================
                LOGOUT
            ===================================================== */}

            <BottomArea>

                <div />

                <Button2
                    onClick={logout}
                >
                    Log out
                </Button2>

            </BottomArea>

        </Wrapper>
    );
}

export default UserPage;