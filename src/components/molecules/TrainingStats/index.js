import styled from "styled-components";

/* =====================================================
   STYLES
   ===================================================== */

const TrainingStatsContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: 18px;
`;

const TrainingStatsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 14px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 550px) {
        grid-template-columns: 1fr;
    }
`;

const StatsCard = styled.div`
    min-height: 155px;

    padding: 20px;

    border: 1px solid ${({ theme }) => theme.colors.border};

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
`;

const StatsCardHeader = styled.div`
    font-family: ${({ theme }) => theme.fonts.mono};

    font-size: 12px;
    font-weight: 600;

    letter-spacing: 0.6px;
    text-transform: uppercase;

    opacity: 0.45;
`;

const StatsMain = styled.div`
    margin-top: 24px;
`;

const StatsNumber = styled.div`
    font-family: ${({ theme }) => theme.fonts.mono};

    font-size: 40px;
    font-weight: 600;

    line-height: 1;

    @media (max-width: 550px) {
        font-size: 36px;
    }
`;

const StatsDescription = styled.div`
    margin-top: 7px;

    font-family: ${({ theme }) => theme.fonts.body};

    font-size: 16px;

    line-height: 1.2;

    opacity: 0.55;
`;

const StatsSecondary = styled.div`
    margin-top: 8px;

    font-family: ${({ theme }) => theme.fonts.body};

    font-size: 14px;

    line-height: 1.2;

    opacity: 0.4;
`;


/* =====================================================
   COMPONENT
   ===================================================== */

function TrainingStats({ stats }) {

    const questionsAnswered =
        stats?.questionsAnswered ?? 0;

    const questionsToday =
        stats?.questionsToday ?? 0;

    const currentStreak =
        stats?.currentStreak ?? 0;

    const longestStreak =
        stats?.longestStreak ?? 0;

    const lessonsCompleted =
        stats?.lessonsCompleted ?? 0;

    const correctAnswers =
        stats?.correctAnswers ?? 0;

    const accuracy =
        questionsAnswered > 0
            ? Math.round(
                (correctAnswers / questionsAnswered) * 100
            )
            : 0;

    return (
        <TrainingStatsContainer>

            {/* =================================================
                STATISTICS
                ================================================= */}

            <TrainingStatsGrid>

                {/* =================================================
                    TODAY
                    ================================================= */}

                <StatsCard>

                    <StatsCardHeader>
                        Today
                    </StatsCardHeader>

                    <StatsMain>

                        <StatsNumber>
                            {questionsToday}
                        </StatsNumber>

                        <StatsDescription>
                            questions answered
                        </StatsDescription>

                    </StatsMain>

                </StatsCard>


                {/* =================================================
                    TOTAL
                    ================================================= */}

                <StatsCard>

                    <StatsCardHeader>
                        Total
                    </StatsCardHeader>

                    <StatsMain>

                        <StatsNumber>
                            {questionsAnswered}
                        </StatsNumber>

                        <StatsDescription>
                            questions answered
                        </StatsDescription>

                        <StatsSecondary>
                            {accuracy}% accuracy
                        </StatsSecondary>

                    </StatsMain>

                </StatsCard>


                {/* =================================================
                    LESSONS
                    ================================================= */}

                <StatsCard>

                    <StatsCardHeader>
                        Lessons
                    </StatsCardHeader>

                    <StatsMain>

                        <StatsNumber>
                            {lessonsCompleted}
                        </StatsNumber>

                        <StatsDescription>
                            lessons completed
                        </StatsDescription>

                    </StatsMain>

                </StatsCard>


                {/* =================================================
                    STREAK
                    ================================================= */}

                <StatsCard>

                    <StatsCardHeader>
                        Streak
                    </StatsCardHeader>

                    <StatsMain>

                        <StatsNumber>
                            {currentStreak}
                        </StatsNumber>

                        <StatsDescription>
                            {currentStreak === 1
                                ? "day in a row"
                                : "days in a row"}
                        </StatsDescription>

                        {longestStreak > 0 && (
                            <StatsSecondary>
                                Best: {longestStreak} days
                            </StatsSecondary>
                        )}

                    </StatsMain>

                </StatsCard>

            </TrainingStatsGrid>

        </TrainingStatsContainer>
    );
}

export default TrainingStats;