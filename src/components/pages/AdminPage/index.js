import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";

// =====================================================
// LAYOUT
// =====================================================

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Container = styled.div`
    width: 900px;
    max-width: calc(100% - 40px);

    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.xxl};
`;

// =====================================================
// HEADER
// =====================================================

const Header = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.xs};
`;

const Title = styled.h1`
    margin: 0;

    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.text};
`;

// =====================================================
// STATS
// =====================================================

const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    border-top: 1px solid
        ${({ theme }) => theme.colors.border};

    border-bottom: 1px solid
        ${({ theme }) => theme.colors.border};

    @media (max-width: 650px) {
        grid-template-columns: 1fr;
    }
`;

const Stat = styled.div`
    display: flex;
    flex-direction: column;

    padding: ${({ theme }) => theme.spacing.xl} 0;

    &:first-child {
        border-right: 1px solid
            ${({ theme }) => theme.colors.border};

        padding-right: ${({ theme }) => theme.spacing.xxl};
    }

    &:last-child {
        padding-left: ${({ theme }) => theme.spacing.xxl};
    }

    @media (max-width: 650px) {
        &:first-child {
            border-right: none;

            border-bottom: 1px solid
                ${({ theme }) => theme.colors.border};

            padding-right: 0;
        }

        &:last-child {
            padding-left: 0;
        }
    }
`;

const StatNumber = styled.div`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 48px;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    line-height: 1;

    color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.div`
    margin-top: ${({ theme }) => theme.spacing.sm};

    font-size: ${({ theme }) => theme.fontSizes.md};

    color: ${({ theme }) => theme.colors.textSecondary};
`;

// =====================================================
// NAVIGATION
// =====================================================

const Section = styled.div`
    display: flex;
    flex-direction: column;

    border-top: 1px solid
        ${({ theme }) => theme.colors.border};
`;

const AdminButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 64px;

    padding: 0
        ${({ theme }) => theme.spacing.md};

    border-bottom: 1px solid
        ${({ theme }) => theme.colors.border};

    text-decoration: none;

    color: ${({ theme }) => theme.colors.text};

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    transition:
        background 0.15s ease,
        padding 0.15s ease;

    &::after {
        content: "→";

        color: ${({ theme }) =>
            theme.colors.textSecondary};

        font-size: 20px;

        transition:
            transform 0.15s ease,
            color 0.15s ease;
    }

    &:hover {
        background: ${({ theme }) =>
            `${theme.colors.primary}08`};

        padding-left: ${({ theme }) =>
            theme.spacing.lg};
    }

    &:hover::after {
        color: ${({ theme }) =>
            theme.colors.primary};

        transform: translateX(4px);
    }
`;

// =====================================================
// COMPONENT
// =====================================================

function AdminPage() {
    const [users, setUsers] = useState(0);
    const [lemmas, setLemmas] = useState(0);

    // =====================================================
    // FETCH STATS
    // =====================================================

    useEffect(() => {
        async function fetchStats() {
            try {
                const token =
                    localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const [
                    userResponse,
                    lemmaResponse,
                ] = await Promise.all([
                    fetch(
                        `${API_URL}/admin/users/count`,
                        config
                    ),
                    fetch(
                        `${API_URL}/admin/lemmas/count`,
                        config
                    ),
                ]);

                if (
                    !userResponse.ok ||
                    !lemmaResponse.ok
                ) {
                    throw new Error(
                        "Failed to fetch admin statistics."
                    );
                }

                const userData =
                    await userResponse.json();

                const lemmaData =
                    await lemmaResponse.json();

                setUsers(userData.count);
                setLemmas(lemmaData.count);
            } catch (error) {
                console.error(
                    "ADMIN STATS ERROR:",
                    error
                );
            }
        }

        fetchStats();
    }, []);

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <Wrapper>
            <Container>

                <Header>
                    <Title>
                        Admin Dashboard
                    </Title>
                </Header>

                <Stats>

                    <Stat>
                        <StatNumber>
                            {users}
                        </StatNumber>

                        <StatLabel>
                            Users
                        </StatLabel>
                    </Stat>

                    <Stat>
                        <StatNumber>
                            {lemmas}
                        </StatNumber>

                        <StatLabel>
                            Lemmas
                        </StatLabel>
                    </Stat>

                </Stats>

                <Section>

                    <AdminButton to="/admin/editor">
                        Lemma Editor
                    </AdminButton>

                    <AdminButton to="/admin/bulk">
                        Bulk Import
                    </AdminButton>

                    <AdminButton to="/admin/lessons">
                        Lesson Editor
                    </AdminButton>

                    <AdminButton to="/admin/reports">
                        Reports
                    </AdminButton>

                </Section>

            </Container>
        </Wrapper>
    );
}

export default AdminPage;