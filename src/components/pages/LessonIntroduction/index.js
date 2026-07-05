import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

const HeroImage = styled.img`
    width: 100%;
    height: 320px;
    object-fit: cover;
    margin-bottom: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        height: 260px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        height: 220px;
        margin-bottom: 1.5rem;
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

const ButtonWrapper = styled.div`
    margin-top: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;

        button {
            width: 100%;
            justify-content: center;
        }
    }
`;

function LessonIntroduction() {
    const navigate = useNavigate();

    return (
        <Container>
            <Card>
                <HeroImage
                    src="/rome1.jpg"
                    alt="Rome"
                />

                <LessonNumber>
                    Lesson I
                </LessonNumber>

                <Title>
                    Roma
                </Title>

                <Description>
                    Welcome to your first Latin lesson! In this chapter,
                    you'll explore the city of Rome through a short Latin
                    text. Click any word to see its meaning or save it to
                    your personal vocabulary list for later practice.
                    You'll then learn your first vocabulary, discover the
                    basics of singular and plural forms, and finish with a
                    quiz to reinforce what you've learned.
                </Description>

                <ButtonWrapper>
                    <NavigationButton
                        onClick={() =>
                            navigate("/lesson/1/textus")
                        }
                    >
                        Start Lesson
                        <FaArrowRight />
                    </NavigationButton>
                </ButtonWrapper>
            </Card>
        </Container>
    );
}

export default LessonIntroduction;