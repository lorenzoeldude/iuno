import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../../atoms/NavigationButton";

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0rem 1.5rem;
`;

const Card = styled.div`
    width: 100%;
    max-width: 800px;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    // border-radius: 16px;
    padding: 3rem;
`;

const HeroImage = styled.img`
    width: 100%;
    height: 280px;
    object-fit: cover;
    // border-radius: 14px;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        height: 180px;
    }
`;

const LessonNumber = styled.p`
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Title = styled.h1`
    margin: 0.5rem 0 1rem;
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
`;

// const Divider = styled.div`
//     height: 1px;
//     background: ${({ theme }) => theme.colors.border};
//     margin: 2rem 0;
// `;

// const Subtitle = styled.h2`
//     margin: 0 0 1rem;
//     font-size: 1.2rem;
//     color: ${({ theme }) => theme.colors.text};
// `;

// const List = styled.ul`
//     margin: 0;
//     padding-left: 1.5rem;
//     display: flex;
//     flex-direction: column;
//     gap: 0.8rem;
// `;

// const ListItem = styled.li`
//     color: ${({ theme }) => theme.colors.text};
//     line-height: 1.6;
// `;

export default function LessonIntroduction() {
    const navigate = useNavigate();

    return (
        <Container>
            <Card>
                <HeroImage
                    src="/rome1.jpg"
                    alt="Rome"
                />
                <LessonNumber>Lesson I</LessonNumber>

                <Title>Roma</Title>

                <Description>
                    Welcome to your first Latin lesson! In this chapter, you'll
                    take your first steps into the ancient world by exploring the
                    city of Rome. You'll start by reading a short text in Latin. 
                    Click on any word to get a translation, or add the word to your word list,
                    so that you can train them later. 
                    You will then learn your first vocabulary, discover singular and plural rules , 
                    and finish with a quiz to reinforce what you've learned.
                </Description>

                {/* <Divider />

                <Subtitle>In this lesson you will...</Subtitle>

                <List>
                    <ListItem>📖 Read your first short Latin text.</ListItem>
                    <ListItem>🏛️ Learn about the city of Rome.</ListItem>
                    <ListItem>📝 Master your first Latin vocabulary.</ListItem>
                    <ListItem>📚 Understand your first grammar concepts.</ListItem>
                    <ListItem>✅ Complete a short quiz to test your knowledge.</ListItem>
                </List> */}

                <NavigationButton onClick={() => navigate("/lesson/1/textus")}>
                    Start Lesson
                    <FaArrowRight />
                </NavigationButton>
            </Card>
        </Container>
    );
}