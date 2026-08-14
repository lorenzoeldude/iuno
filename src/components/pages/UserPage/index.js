import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_URL } from "../../../config";

import { useTheme } from "../../../context/AppThemeProvider";
import Card from "../../atoms/Card";
import TrainingStats from "../../molecules/TrainingStats";
import PremiumSubscription from "../../molecules/PremiumSubscription";

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
    margin-bottom: 42px;
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

const LogoutButton = styled.button`
    padding: 0;

    border: none;

    background: none;
    color: inherit;

    font: inherit;
    font-size: 14px;

    opacity: 0.5;

    cursor: pointer;

    transition:
        opacity ${({ theme }) => theme.transition.fast};

    &:hover {
        opacity: 0.9;
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

    const [username, setUsername] = useState("User");
    const [user, setUser] = useState(null);

    const [trainingStats, setTrainingStats] =
        useState(null);

    const [lessons, setLessons] = useState([]);
    const [lessonProgress, setLessonProgress] =
        useState({});

    const [billing, setBilling] = useState(null);
    const [billingLoading, setBillingLoading] =
        useState(true);
    const [billingError, setBillingError] =
        useState("");
    const [portalLoading, setPortalLoading] =
        useState(false);

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
                setUsername(parsedUser.username);
            }
        } catch (err) {
            console.error(err);

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
                const response = await fetch(
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
            } catch (err) {
                console.error(
                    "TRAINING STATS ERROR:",
                    err
                );
            }
        }

        /* =================================================
           FETCH LESSONS + USER PROGRESS
           ================================================= */

        async function fetchLessonProgress() {
            try {
                const lessonsResponse =
                    await fetch(
                        `${API_URL}/api/lessons`
                    );

                if (!lessonsResponse.ok) {
                    throw new Error(
                        `Failed to fetch lessons: ${lessonsResponse.status}`
                    );
                }

                const lessonsData =
                    await lessonsResponse.json();

                const publishedLessons =
                    lessonsData.filter(
                        (lesson) =>
                            lesson.is_published
                    );

                setLessons(
                    publishedLessons
                );

                const progressResults =
                    await Promise.all(
                        publishedLessons.map(
                            async (lesson) => {
                                try {
                                    const response =
                                        await fetch(
                                            `${API_URL}/api/lessons/${lesson.id}/progress`,
                                            {
                                                headers: {
                                                    Authorization:
                                                        `Bearer ${token}`,
                                                },
                                            }
                                        );

                                    if (
                                        !response.ok
                                    ) {
                                        return [
                                            lesson.id,
                                            null,
                                        ];
                                    }

                                    const data =
                                        await response.json();

                                    return [
                                        lesson.id,
                                        data,
                                    ];
                                } catch (err) {
                                    console.error(
                                        `LESSON ${lesson.id} PROGRESS ERROR:`,
                                        err
                                    );

                                    return [
                                        lesson.id,
                                        null,
                                    ];
                                }
                            }
                        )
                    );

                const progressMap = {};

                progressResults.forEach(
                    ([lessonId, progress]) => {
                        progressMap[
                            lessonId
                        ] = progress;
                    }
                );

                setLessonProgress(
                    progressMap
                );
            } catch (err) {
                console.error(
                    "LESSON PROGRESS ERROR:",
                    err
                );
            }
        }

        /* =================================================
           FETCH BILLING STATUS
           ================================================= */

        async function fetchBillingStatus() {
            try {
                const response =
                    await fetch(
                        `${API_URL}/api/billing/status`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch billing status: ${response.status}`
                    );
                }

                const data =
                    await response.json();

                setBilling(data);
            } catch (err) {
                console.error(
                    "BILLING STATUS ERROR:",
                    err
                );

                setBillingError(
                    "Unable to load subscription status."
                );
            } finally {
                setBillingLoading(false);
            }
        }

        fetchTrainingStats();
        fetchLessonProgress();
        fetchBillingStatus();
    }, [navigate]);

    /* =====================================================
       CUSTOMER PORTAL
       ===================================================== */

    async function openCustomerPortal() {
        try {
            setPortalLoading(true);
            setBillingError("");

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/stripe/create-portal-session`,
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    "Failed to open subscription management."
                );
            }

            if (!data.url) {
                throw new Error(
                    "Stripe did not return a portal URL."
                );
            }

            window.location.href =
                data.url;
        } catch (err) {
            console.error(
                "CUSTOMER PORTAL ERROR:",
                err
            );

            setBillingError(
                err.message ||
                "Unable to open subscription management."
            );

            setPortalLoading(false);
        }
    }

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
                    stats={{
                        ...trainingStats,

                        lessonsCompleted:
                            Object.values(
                                lessonProgress
                            ).filter(
                                (progress) =>
                                    progress?.completed
                            ).length,

                        lessonsTotal:
                            lessons.length,
                    }}
                />

            </Section>

            {/* =====================================================
                SUBSCRIPTION
            ===================================================== */}

            <Section>

                <SectionHeading>
                    Subscription
                </SectionHeading>

                <PremiumSubscription
                    billing={billing}
                    loading={billingLoading}
                    error={billingError}
                    portalLoading={portalLoading}
                    onManageSubscription={
                        openCustomerPortal
                    }
                    onUpgrade={() =>
                        navigate("/premium")
                    }
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

                <LogoutButton
                    onClick={logout}
                >
                    Log out
                </LogoutButton>

            </BottomArea>

        </Wrapper>
    );
}

export default UserPage;