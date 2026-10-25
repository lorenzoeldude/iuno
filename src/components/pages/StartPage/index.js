
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import Card from "../../atoms/Card";

import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;

    animation: ${fadeIn} 0.8s ease-out;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
    max-width: 1100px;

    margin: 40px auto;

    min-height: 560px;

    display: grid;

    grid-template-columns: 0.9fr 1.1fr;

    align-items: center;

    position: relative;

    padding: 50px 60px 90px;

    background: ${({ theme }) => theme.colors.brand};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;

        min-height: auto;

        padding: 70px 50px 110px;

        text-align: center;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 24px 16px;

        padding: 50px 24px 100px;
    }
`;

const HeroContent = styled.div`
    position: relative;

    z-index: 2;

    max-width: 500px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 650px;

        margin: 0 auto;
    }
`;

const WebAppLink = styled.button`
    display: block;

    margin-top: 18px;
    padding: 0;

    border: none;
    background: none;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 15px;

    color: #fff;
    opacity: 0.8;

    cursor: pointer;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
`;

const Title = styled.h1`
    margin: 0;

    font-family: ${({ theme }) => theme.fonts.heading};

    font-size: clamp(48px, 6vw, 76px);

    line-height: 0.9;

    letter-spacing: 6px;

    color: #fff;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 54px;
        letter-spacing: 3px;
    }
`;

const Subtitle = styled.h2`
    // margin: 10px 0 0;

    font-family: ${({ theme }) => theme.fonts.heading};

    font-size: clamp(22px, 2.5vw, 32px);

    font-weight: ${({ theme }) => theme.fontWeights.regular};

    line-height: 1.15;

    color: #fff;
`;

const Description = styled.p`
    max-width: 500px;

    margin: 28px 0 0;

    font-family: ${({ theme }) => theme.fonts.body};

    font-size: 18px;

    line-height: 1.75;

    color: #fff;

    opacity: 0.86;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-left: auto;
        margin-right: auto;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 16px;

        line-height: 1.7;
    }
`;

const HeroButton = styled.button`
    margin-top: 34px;

    padding: 15px 34px;

    border: none;

    background: ${({ theme }) => theme.colors.opposite};

    color: ${({ theme }) => theme.colors.brand};

    font-family: ${({ theme }) => theme.fonts.mono};

    font-size: 15px;

    font-weight: ${({ theme }) => theme.fontWeights.bold};

    cursor: pointer;

    transition:
        transform ${({ theme }) => theme.transition.normal},
        box-shadow ${({ theme }) => theme.transition.normal};

    &:hover {
        transform: translateY(-3px);

        box-shadow:
            0 12px 30px
            ${({ theme }) => theme.colors.shadow};
    }
`;

const HeroVisual = styled.div`
    height: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-top: 60px;

        min-height: 520px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        min-height: 420px;

        margin-top: 45px;
    }
`;

const AppScreenshot = styled.img`
    display: block;

    width: min(100%, 560px);

    max-height: 720px;

    object-fit: contain;

    position: relative;

    z-index: 1;

    filter:
        drop-shadow(0 30px 35px rgba(0, 0, 0, 0.22));

    transform: translateX(25px);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: min(100%, 500px);

        transform: none;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: min(100%, 390px);
    }
`;

const Socials = styled.div`
    position: absolute;

    bottom: 30px;

    left: 50%;

    transform: translateX(-50%);

    display: flex;

    gap: 12px;
`;

const SocialLink = styled.a`
    display: flex;

    align-items: center;

    justify-content: center;

    width: 42px;

    height: 42px;

    border: 1px solid
        ${({ theme }) => theme.colors.opposite}4D;

    background: ${({ theme }) => theme.colors.opposite}1A;

    color: ${({ theme }) => theme.colors.opposite};

    font-size: 19px;

    transition:
        transform ${({ theme }) => theme.transition.normal},
        color ${({ theme }) => theme.transition.normal},
        border-color ${({ theme }) => theme.transition.normal};

    &:hover {
        transform: translateY(-3px);

        color: ${({ theme }) => theme.colors.opposite};

        border-color: ${({ theme }) => theme.colors.opposite};
    }
`;

/* =========================
   INTRO / BRAND SECTION
========================= */

const IntroSection = styled.section`
    max-width: 1100px;

    margin: 40px auto;

    padding: 110px 40px;

    background: ${({ theme }) => theme.colors.brand}17;

    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 24px 16px;

        padding: 80px 24px;
    }
`;

const IntroContent = styled.div`
    max-width: 850px;

    margin: 0 auto;

    text-align: center;
`;

const SectionLabel = styled.div`
    margin-bottom: 18px;

    font-family: ${({ theme }) => theme.fonts.mono};

    font-size: ${({ theme }) => theme.fontSizes.xs};

    font-weight: ${({ theme }) => theme.fontWeights.bold};

    letter-spacing: 3px;

    text-transform: uppercase;

    color: ${({ theme }) => theme.colors.brand};
`;

const SectionTitle = styled.h2`
    margin: 0;

    font-family: ${({ theme }) => theme.fonts.heading};

    font-size: clamp(36px, 4.5vw, 54px);

    font-weight: ${({ theme }) => theme.fontWeights.medium};

    line-height: 1.08;

    color: ${({ theme }) => theme.colors.text};
`;

const SectionText = styled.p`
    max-width: 680px;

    margin: 24px auto 0;

    font-family: ${({ theme }) => theme.fonts.body};

    font-size: 18px;

    line-height: 1.8;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const IntroLabel = styled(SectionLabel)`
    color: ${({ theme }) => theme.colors.brand};
`;

const IntroTitle = styled(SectionTitle)`
    color: ${({ theme }) => theme.colors.text};
`;

const IntroText = styled(SectionText)`
    color: ${({ theme }) => theme.colors.textSecondary};
`;

/* =========================
   FEATURES
========================= */

const FeatureSection = styled.section`
    max-width: 1100px;

    margin: 40px auto;

    padding: 110px 40px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 24px 16px;

        padding: 80px 20px;
    }
`;

const Grid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 24px;

    margin-top: 65px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;

        gap: 16px;
    }
`;

const FeatureCard = styled(Card)`
    min-height: 260px;

    transition:
        transform ${({ theme }) => theme.transition.normal},
        box-shadow ${({ theme }) => theme.transition.normal};

    &:hover {
        transform: translateY(-5px);

        box-shadow:
            0 20px 45px
            ${({ theme }) => theme.colors.shadow};
    }
`;

/* =========================
   BRAND JOURNEY
========================= */

const JourneySection = styled.section`
    max-width: 1100px;

    margin: 40px auto;

    padding: 110px 40px;

    background: ${({ theme }) => theme.colors.brand};

    color: ${({ theme }) => theme.colors.opposite};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 24px 16px;

        padding: 80px 24px;
    }
`;

const JourneyContent = styled.div`
    max-width: 1100px;

    margin: 0 auto;

    text-align: center;
`;

const JourneyLabel = styled(SectionLabel)`
    color: ${({ theme }) => theme.colors.opposite};

    opacity: 0.7;
`;

const JourneyTitle = styled(SectionTitle)`
    color: ${({ theme }) => theme.colors.opposite};
`;

const JourneyText = styled(SectionText)`
    color: ${({ theme }) => theme.colors.opposite};

    opacity: 0.78;
`;

const Path = styled.div`
    display: flex;

    justify-content: center;

    align-items: center;

    gap: 18px;

    margin-top: 60px;

    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        flex-direction: column;

        gap: 10px;
    }
`;

const Step = styled.div`
    min-width: 145px;

    padding: 20px 26px;

    border: 1px solid
        ${({ theme }) => theme.colors.opposite}4D;

    background: ${({ theme }) => theme.colors.opposite}1A;

    font-family: ${({ theme }) => theme.fonts.heading};

    font-size: 22px;

    color: ${({ theme }) => theme.colors.opposite};
`;

const Arrow = styled.div`
    font-size: 24px;

    color: ${({ theme }) => theme.colors.opposite}99;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        transform: rotate(90deg);
    }
`;

/* =========================
   READING
========================= */

const ReadingSection = styled.section`
    max-width: 1100px;

    margin: 40px auto;

    display: grid;

    grid-template-columns: 1fr 1fr;

    min-height: 550px;

    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;

        margin: 24px 16px;
    }
`;

const ReadingVisual = styled.div`
    display: flex;

    justify-content: center;

    align-items: center;

    padding: 80px 40px;

    background: ${({ theme }) => theme.colors.background};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        min-height: 350px;
    }
`;

const LatinQuote = styled.div`
    max-width: 500px;

    font-family: ${({ theme }) => theme.fonts.heading};

    font-size: clamp(32px, 3.5vw, 48px);

    line-height: 1.25;

    text-align: center;

    color: ${({ theme }) => theme.colors.brand};
`;

const ReadingContent = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;

    padding: 90px 8vw;

    background: ${({ theme }) => theme.colors.surface};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 80px 30px;
    }
`;

const ReadingTitle = styled(SectionTitle)`
    max-width: 500px;
`;

const ReadingText = styled(SectionText)`
    margin: 24px 0 0;

    max-width: 500px;
`;

const ReadingButton = styled.button`
    align-self: flex-start;

    margin-top: 32px;

    padding: 14px 30px;

    border: none;

    background: ${({ theme }) => theme.colors.brand};

    color: ${({ theme }) => theme.colors.opposite};

    font-family: ${({ theme }) => theme.fonts.mono};

    font-size: 15px;

    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    cursor: pointer;

    transition:
        transform ${({ theme }) => theme.transition.normal},
        opacity ${({ theme }) => theme.transition.normal};

    &:hover {
        transform: translateY(-2px);

        opacity: 0.9;
    }
`;

/* =========================
   CTA
========================= */

const CTA = styled.section`
    max-width: 1100px;

    margin: 40px auto 0;

    padding: 110px 40px 130px;

    border: 1px solid ${({ theme }) => theme.colors.brand};

    text-align: center;

    background: ${({ theme }) => theme.colors.brand};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 24px 16px 0;

        padding: 80px 20px 100px;
    }
`;

const CTATitle = styled(SectionTitle)`
    color: ${({ theme }) => theme.colors.opposite};
`;

const CTAText = styled(SectionText)`
    color: ${({ theme }) => theme.colors.opposite};

    opacity: 0.8;
`;

const CTAButton = styled.button`
    margin-top: 32px;

    padding: 16px 38px;

    border: none;

    background: ${({ theme }) => theme.colors.opposite};

    color: ${({ theme }) => theme.colors.brand};

    font-family: ${({ theme }) => theme.fonts.mono};

    font-size: 16px;

    font-weight: ${({ theme }) => theme.fontWeights.bold};

    cursor: pointer;

    transition:
        transform ${({ theme }) => theme.transition.normal},
        box-shadow ${({ theme }) => theme.transition.normal};

    &:hover {
        transform: translateY(-3px);

        box-shadow:
            0 12px 30px
            ${({ theme }) => theme.colors.shadow};
    }
`;

function StartPage() {
    const navigate = useNavigate();

    return (
        <Wrapper>

            {/* =========================
                HERO
            ========================= */}

            <Hero>

                <HeroContent>

                    <Title>
                        IUNONI
                    </Title>

                    <Subtitle>
                        Where Latin comes alive.
                    </Subtitle>

                    <Description>
                        Learn Latin, build vocabulary, and read real Latin texts, all in one place, on the web and iOS.

                    </Description>

                    <HeroButton
                        onClick={() =>
                            window.open(
                                "https://apps.apple.com/app/iunoni-learn-latin/id6808115639",
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                    >
                        Download on the App Store
                    </HeroButton>

                    <WebAppLink onClick={() => navigate("/lessons")}>
                        Or explore the web app →
                    </WebAppLink>

                </HeroContent>

                <HeroVisual>

                    <AppScreenshot
                        src="website2.png"
                        alt="IUNONI app"
                    />

                </HeroVisual>

                <Socials>

                    <SocialLink
                        href="https://youtube.com/@iunoni"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                    >
                        <FaYoutube />
                    </SocialLink>

                    <SocialLink
                        href="https://instagram.com/iunonidotcom"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </SocialLink>

                    <SocialLink
                        href="https://x.com/iunonidotcom"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                    >
                        <FaXTwitter />
                    </SocialLink>

                </Socials>

            </Hero>

            {/* =========================
                INTRO / BRAND SECTION
            ========================= */}

            <IntroSection>

                <IntroContent>

                    <IntroLabel>
                        One place for Latin
                    </IntroLabel>

                    <IntroTitle>
                        Everything you need to make Latin part of your life.
                    </IntroTitle>

                    <IntroText>
                        IUNONI brings together structured learning,
                        extensive vocabulary practice, immersive reading,
                        and a powerful dictionary — so you can spend less
                        time switching between tools and more time with Latin.
                    </IntroText>

                </IntroContent>

            </IntroSection>

            {/* =========================
                FEATURES
            ========================= */}

            <FeatureSection>

                <SectionLabel>
                    Explore IUNONI
                </SectionLabel>

                <SectionTitle>
                    Learn. Practice. Read. Discover.
                </SectionTitle>

                <Grid>

                    <FeatureCard
                        title="Lessons"
                        onClick={() => navigate("/lessons")}
                    >
                        Read Latin texts, learn new vocabulary, and master
                        grammar step by step. Each lesson builds on what came
                        before, taking you from your first words toward
                        confident reading.
                    </FeatureCard>

                    <FeatureCard
                        title="Trainer"
                        onClick={() => navigate("/trainer")}
                    >
                        Reinforce your vocabulary through interactive
                        training. Practice words from lessons, books, your
                        own list, or explore the dictionary at random.
                    </FeatureCard>

                    <FeatureCard
                        title="Read"
                        onClick={() => navigate("/read")}
                    >
                        Read Latin without constantly leaving the page.
                        Look up words instantly, explore morphology, and
                        build vocabulary directly from the texts you love.
                    </FeatureCard>

                    <FeatureCard
                        title="Dictionary"
                        onClick={() => navigate("/dictionary/colosseus")}
                    >
                        Search Latin words and discover their meanings,
                        definitions, morphology, English derivatives, and
                        example sentences.
                    </FeatureCard>

                </Grid>

            </FeatureSection>

            {/* =========================
                LEARNING JOURNEY
            ========================= */}

            <JourneySection>

                <JourneyContent>

                    <JourneyLabel>
                        The IUNONI method
                    </JourneyLabel>

                    <JourneyTitle>
                        Learn Latin, one story at a time.
                    </JourneyTitle>

                    <JourneyText>
                        Follow a cast of characters through everyday Roman life. Each lesson builds on the last, introducing new vocabulary and grammar naturally as you develop the skills to read and understand Latin.
                    </JourneyText>

                    <Path>

                        <Step>
                            Read
                        </Step>

                        <Arrow>
                            →
                        </Arrow>

                        <Step>
                            Vocabulary
                        </Step>

                        <Arrow>
                            →
                        </Arrow>

                        <Step>
                            Grammar
                        </Step>

                        <Arrow>
                            →
                        </Arrow>

                        <Step>
                            Practice
                        </Step>

                    </Path>

                </JourneyContent>

            </JourneySection>

            {/* =========================
                READING
            ========================= */}

            <ReadingSection>

                <ReadingVisual>

                    <LatinQuote>
                        "Gallia est omnis divisa in partes tres."
                    </LatinQuote>

                </ReadingVisual>

                <ReadingContent>

                    <SectionLabel>
                        Read Latin
                    </SectionLabel>

                    <ReadingTitle>
                        Don't just study Latin. Read it.
                    </ReadingTitle>

                    <ReadingText>
                        Move beyond exercises and experience Latin as a
                        living language. Read texts, discover unfamiliar
                        words, and understand the language in context.
                    </ReadingText>

                    <ReadingButton
                        onClick={() => navigate("/read")}
                    >
                        Start Reading
                    </ReadingButton>

                </ReadingContent>

            </ReadingSection>

            {/* =========================
                CTA
            ========================= */}

            <CTA>

                <CTATitle>
                    Your Latin journey starts here.
                </CTATitle>

                <CTAText>
                    Begin with your first lesson, explore the dictionary,
                    or open a book and start reading.
                </CTAText>

                <CTAButton
                    onClick={() => navigate("/lessons")}
                >
                    Start Learning
                </CTAButton>

            </CTA>

        </Wrapper>
    );
}

export default StartPage;