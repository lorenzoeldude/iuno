import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavigationButton from "../../atoms/NavigationButton";

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 1.5rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0 0.75rem;
    }
`;

const Card = styled.div`
    width: 100%;
    max-width: 800px;

    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border: 1px solid ${({ theme }) => theme.colors.border};

    padding: 3rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 2.25rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.75rem;
    }
`;

const LessonNumber = styled.p`
    margin: 0;

    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;

    color: ${({ theme }) => theme.colors.textSecondary};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 0.8rem;
    }
`;

const Title = styled.h1`
    margin: 0.5rem 0 1rem;

    font-size: clamp(2rem, 5vw, 2.8rem);
    line-height: 1.1;

    color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
    margin: 0 0 2rem;

    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.8;

    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        line-height: 1.7;
    }
`;

const SecondaryButton = styled(NavigationButton)`
    margin-left: auto;

    font-size: 0.9rem;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textSecondary};

    padding: 0.7rem 1rem;

    svg {
        font-size: 0.8rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-left: 0;
        width: 100%;
        justify-content: center;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;

    margin-top: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        width: 100%;

        button {
            width: 100%;
            justify-content: center;
        }
    }
`;

function LessonIntroduction() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        async function fetchLesson() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/lessons/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch lesson");
                }

                const data = await response.json();
                setLesson(data);
            } catch (err) {
                console.error("Error loading lesson:", err);
            }
        }

        fetchLesson();
    }, [id]);

    if (!lesson) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Card>
                {/* <HeroImage
                    src={lesson.hero_image}
                    alt={lesson.title}
                /> */}

                <LessonNumber>
                    Lesson {lesson.id}
                </LessonNumber>

                <Title>
                    {lesson.title}
                </Title>

                <Description>
                    {lesson.introduction}
                </Description>

                <ButtonWrapper>
                    <NavigationButton
                        onClick={() =>
                            navigate(`/lessons/${lesson.id}/textus`)
                        }
                    >
                        Start Lesson
                        <FaArrowRight />
                    </NavigationButton>

                    <SecondaryButton
                        onClick={() =>
                            navigate(`/trainer/lesson/${lesson.id}`)
                        }
                    >
                        Train Lesson Vocabulary
                        <FaArrowRight />
                    </SecondaryButton>
                </ButtonWrapper>
            </Card>
        </Container>
    );
}

export default LessonIntroduction;