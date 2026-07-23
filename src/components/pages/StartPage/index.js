import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import Searchbar from "../../atoms/Searchbar";
import Card from "../../atoms/Card";

import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
    animation: ${fadeIn} 0.8s ease-out;
`;

const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    margin-top: -40px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-top: 0;
    }
`;

const Hero = styled.section`
    min-height: 100svh;
    /* fallback */
    min-height: 100vh;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    padding: 40px 20px;
`;

const Title = styled.h1`
    font-size: 72px;
    letter-spacing: 5px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 42px;
        letter-spacing: 2px;
    }
`;

const Subtitle = styled.h2`
    font-size: 28px;
    font-weight: 500;

    margin-top: 20px;

    opacity: 70%;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 22px;
    }
`;

const Description = styled.p`
    max-width: 700px;

    font-size: 18px;
    line-height: 1.8;

    color: ${({ theme }) => theme.colors.textSecondary};

    margin: 24px 0 36px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 16px;
    }
`;

const StyledSearch = styled(Searchbar)`
    width: min(700px, 100%);
`;

const SearchText = styled.p`
    margin-top: 18px;

    font-size: 14px;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Section = styled.section`
    max-width: 1200px;

    margin: 120px auto;

    padding: 0 20px;
`;

const SectionTitle = styled.h2`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 42px;

    text-align: center;

    margin-bottom: 20px;
`;

const SectionText = styled.p`
    max-width: 700px;

    margin: 0 auto 60px;

    text-align: center;

    color: ${({ theme }) => theme.colors.textSecondary};

    line-height: 1.8;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

const Path = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-top: 50px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        flex-direction: column;
        gap: 12px;
    }
`;

const Arrow = styled.div`
    font-size: 26px;
    color: ${({ theme }) => theme.colors.textSecondary};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        transform: rotate(90deg);
    }
`;

const Step = styled.div`
    padding: 20px 26px;

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.borderRadius.medium};

    background: ${({ theme }) => theme.colors.surface};

    font-weight: 600;
`;

const CTA = styled.section`
    text-align: center;

    padding: 120px 20px 140px;
`;

const Button = styled.button`
    margin-top: 30px;

    padding: 14px 36px;

    font-size: 16px;

    border: none;

    cursor: pointer;

    border-radius: ${({ theme }) => theme.borderRadius.medium};

    background: ${({ theme }) => theme.colors.primary};

    color: white;

    transition: 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

const Socials = styled.div`
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    gap: 20px;
`;

const SocialLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;

    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.border};

    background: ${({ theme }) => theme.colors.surface};

    color: ${({ theme }) => theme.colors.text};

    font-size: 26px;

    transition: 0.2s ease;

    &:hover {
        transform: translateY(-3px);
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 46px;
        height: 46px;
        font-size: 22px;
    }
`;

function StartPage() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Hero>
                <HeroContent>
                    <Title>IUNONI</Title>

                    <Subtitle>Where latin comes alive</Subtitle>

                    <Description>
                        Read authentic Latin texts, search thousands of words,
                        master grammar through structured lessons, and reinforce
                        everything with interactive vocabulary training—all in one
                        place.
                    </Description>

                    <StyledSearch variant="large" />

                    <SearchText>
                        Search over 1,000 Latin words
                    </SearchText>
                </HeroContent>

                <Socials>
                    <SocialLink
                        href="https://youtube.com/@iunoni"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaYoutube />
                    </SocialLink>

                    <SocialLink
                        href="https://instagram.com/iunonidotcom"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram />
                    </SocialLink>

                    <SocialLink
                        href="https://x.com/iunonidotcom"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter />
                    </SocialLink>
                </Socials>
            </Hero>

            <Section>
                <SectionTitle>Everything you need to learn Latin</SectionTitle>

                <SectionText>
                    Whether you're beginning your first lesson or reading
                    classical literature, IUNONI combines the essential tools
                    into one seamless learning experience.
                </SectionText>

                <Grid>
                    <Card
                        // title="📖 Lessons"
                        title="Lessons"
                        onClick={() => navigate("/lessons")}
                    >
                        Read Latin texts, practice vocabulary, learn grammar step by step with
                        structured lessons. Each lesson is designed to build on the previous one to take
                        you from a novice to expert interactively.
                    </Card>

                    <Card
                        // title="🎯 Trainer"
                        title="Trainer"
                        onClick={() => navigate("/trainer")}
                    >
                        Practice vocabulary using your own word list, words from a lesson, or a book.
                    </Card>

                    <Card
                        // title="📜 Read"
                        title="Read"
                        onClick={() => navigate("/read")}
                    >
                        Read Latin texts with instant dictionary lookup without
                        leaving the page. Get a morphology analysis, or train vocabulary 
                        from a specific book.
                    </Card>

                    <Card
                        // title="📚 Dictionary"
                        title="Dictionary"
                        onClick={() => navigate("/dictionary/stella")}
                    >
                        Search Latin words and get its meaning, Latin definitions,
                        morphology, english derivatives and example sentences to make it stick.
                    </Card>
                </Grid>
            </Section>

            <Section>
                <SectionTitle>Your learning journey</SectionTitle>

                <SectionText>
                    Every lesson is designed to build on the previous one.
                </SectionText>

                <Path>
                    <Step>Reading</Step>
                    <Arrow>→</Arrow>

                    <Step>Vocabulary</Step>
                    <Arrow>→</Arrow>

                    <Step>Grammar</Step>
                    <Arrow>→</Arrow>

                    <Step>Quiz</Step>
                </Path>
            </Section>

            <CTA>
                <SectionTitle>Ready to start?</SectionTitle>

                <SectionText>
                    Begin your first lesson or explore the Latin dictionary.
                </SectionText>

                <Button onClick={() => navigate("/lessons")}>
                    Start Learning
                </Button>
            </CTA>
        </Wrapper>
    );
}

export default StartPage;