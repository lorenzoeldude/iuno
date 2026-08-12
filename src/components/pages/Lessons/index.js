import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowDown } from "react-icons/fa";
import Card from "../../atoms/Card";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px 20px;
    box-sizing: border-box;
`;

const Container = styled.div`
    width: 100%;
    max-width: 560px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardWrapper = styled.div`
    width: 100%;
`;

const LockedCardWrapper = styled.div`
    position: relative;
    width: 100%;
    opacity: ${({ locked }) => (locked ? 0.5 : 1)};
    cursor: ${({ locked }) =>
        locked ? "not-allowed" : "pointer"};
`;

const LockIcon = styled(FaLock)`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    z-index: 10;
`;

const ArrowWrapper = styled.div`
    padding: 16px 0;
    display: flex;
    justify-content: center;

    font-size: 28px;
    opacity: 0.45;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    margin: 0;
    text-align: center;
    line-height: 1.05;

    font-size: 34px;
`;

const Status = styled.div`
    margin-top: 10px;

    font-family: "Cormorant Garamond", serif;
    font-size: 17px;
    text-align: center;

    opacity: ${({ completed }) =>
        completed ? 0.65 : 0.5};
`;

function Lessons() {
    const navigate = useNavigate();

    const [lessons, setLessons] = useState([]);
    const [lessonProgress, setLessonProgress] = useState({});

    // =====================================================
    // FETCH LESSONS
    // =====================================================

    useEffect(() => {
        async function fetchLessons() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/lessons`
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to load lessons: ${response.status}`
                    );
                }

                const data = await response.json();

                setLessons(data);
            } catch (err) {
                console.error(
                    "LESSONS FETCH ERROR:",
                    err
                );
            }
        }

        fetchLessons();
    }, []);

    // =====================================================
    // FETCH USER LESSON PROGRESS
    // =====================================================

    useEffect(() => {
        if (lessons.length === 0) {
            return;
        }

        async function fetchLessonProgress() {
            const token =
                localStorage.getItem("token");

            if (!token) {
                return;
            }

            const publishedLessons =
                lessons.filter(
                    (lesson) =>
                        lesson.is_published
                );

            const progressMap = {};

            await Promise.all(
                publishedLessons.map(
                    async (lesson) => {
                        try {
                            const response =
                                await fetch(
                                    `${process.env.REACT_APP_API_URL}/api/lessons/${lesson.id}/progress`,
                                    {
                                        headers: {
                                            Authorization:
                                                `Bearer ${token}`,
                                        },
                                    }
                                );

                            if (!response.ok) {
                                console.error(
                                    `Failed to fetch progress for lesson ${lesson.id}: ${response.status}`
                                );

                                return;
                            }

                            const progress =
                                await response.json();

                            console.log(
                                `LESSON ${lesson.id} PROGRESS:`,
                                progress
                            );

                            progressMap[lesson.id] =
                                progress;
                        } catch (err) {
                            console.error(
                                `LESSON ${lesson.id} PROGRESS ERROR:`,
                                err
                            );
                        }
                    }
                )
            );

            setLessonProgress(progressMap);
        }

        fetchLessonProgress();
    }, [lessons]);

    // =====================================================
    // LOADING
    // =====================================================

    if (lessons.length === 0) {
        return (
            <Wrapper>
                <Container>
                    Loading...
                </Container>
            </Wrapper>
        );
    }

    // =====================================================
    // DISPLAYED LESSONS
    // =====================================================

    const displayedLessons = [
        ...lessons,
        {
            id: lessons.length + 1,
            title: "Coming Soon",
            comingSoon: true,
        },
    ];

    // =====================================================
    // LESSON STATUS
    // =====================================================

    function getLessonStatus(lesson) {
        const progress =
            lessonProgress[lesson.id];

        if (!progress) {
            return {
                started: false,
                completed: false,
                percentage: 0,
            };
        }

        let completedSteps = 0;

        if (progress.textCompleted) {
            completedSteps++;
        }

        if (progress.vocabularyCompleted) {
            completedSteps++;
        }

        if (progress.grammarCompleted) {
            completedSteps++;
        }

        if (progress.examinatioCompleted) {
            completedSteps++;
        }

        const percentage = Math.round(
            (completedSteps / 4) * 100
        );

        const completed =
            progress.examinatioCompleted === true;

        const started =
            completedSteps > 0 ||
            Boolean(progress.startedAt);

        return {
            started,
            completed,
            percentage,
        };
    }

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <Wrapper>
            <Container>
                {displayedLessons.map(
                    (lesson, index) => {
                        const lessonNumber =
                            lesson.id;

                        const locked =
                            lesson.comingSoon ||
                            !lesson.is_published;

                        const status =
                            getLessonStatus(
                                lesson
                            );

                        return (
                            <Fragment
                                key={lesson.id}
                            >
                                <CardWrapper>
                                    <LockedCardWrapper
                                        locked={
                                            locked
                                        }
                                    >
                                        {locked && (
                                            <LockIcon />
                                        )}

                                        <Card
                                            title={
                                                lessonNumber
                                            }
                                            size="small"
                                            onClick={() => {
                                                if (
                                                    !locked
                                                ) {
                                                    navigate(
                                                        `/lessons/${lesson.id}`
                                                    );
                                                }
                                            }}
                                        >
                                            <Title>
                                                {
                                                    lesson.title
                                                }
                                            </Title>

                                            {!locked &&
                                                status.started && (
                                                    <Status
                                                        completed={
                                                            status.completed
                                                        }
                                                    >
                                                        {status.completed
                                                            ? "✓ Completed"
                                                            : `In progress · ${status.percentage}%`}
                                                    </Status>
                                                )}
                                        </Card>
                                    </LockedCardWrapper>
                                </CardWrapper>

                                {index <
                                    displayedLessons.length -
                                        1 && (
                                    <ArrowWrapper>
                                        <FaArrowDown />
                                    </ArrowWrapper>
                                )}
                            </Fragment>
                        );
                    }
                )}
            </Container>
        </Wrapper>
    );
}

export default Lessons;