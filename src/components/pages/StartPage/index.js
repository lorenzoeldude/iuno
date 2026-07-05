import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import Searchbar from "../../atoms/Searchbar";
import Card from "../../atoms/Card";


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
    min-height: 100vh;
    width: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    padding: 40px 20px;
    box-sizing: border-box;

    animation: ${fadeIn} 1.5s ease-out;

    transition:
        background ${({ theme }) => theme.transition.normal},
        color ${({ theme }) => theme.transition.normal};
`;

const BlockDiv = styled.div`
    width: 100%;
    max-width: 1200px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

    gap: 20px;

    margin-top: 35px;
`;

const Title = styled.h1`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 50px;
    letter-spacing: 8px;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
        font-size: 45px;
        letter-spacing: 5px;
    }
`;

const Subtitle = styled.p`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};

    max-width: 550px;

    line-height: 1.7;

    margin: 10px 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
        font-size: 16px;
        padding: 0 10px;
    }
`;

const StyledSearch = styled(Searchbar)`
    height: 50px;
    width: 300px;

    // border: 1px solid ${({ theme }) => theme.colors.border};

    text-align: center;

    margin: 20px 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
        width: 100%;
        max-width: 300px;
    }
`;

const BetaText = styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};

    opacity: 0.75;

    margin: -2px 0 18px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
        font-size: 12px;
    }
`;

const Column = styled.div``;


function StartPage() {

    const navigate = useNavigate();

    return (
        <Wrapper>

            <Column>
                <Title>
                    IUNONI
                </Title>
            </Column>


            <Subtitle>
                Bringing Latin to life
            </Subtitle>



            <StyledSearch />

            <BetaText>
                Currently in beta
            </BetaText>

            <BlockDiv>

                <Card
                    title="Lessons"
                    onClick={() => navigate("/lesson")}
                >
                    Master Latin step by step through structured lessons
                    covering grammar, vocabulary, and reading.
                </Card>


                <Card
                    title="Trainer"
                    onClick={() => navigate("/trainer")}
                >
                    Train vocabulary, add words to your list and use our built-in
                    algorithm for spaced repetition.
                </Card>


                <Card
                    title="Read"
                    onClick={() => navigate("/read")}
                >
                    Read texts from beginner to the Aeneid, and lookup words on
                    the spot.
                </Card>

            </BlockDiv>

        </Wrapper>
    );
}

export default StartPage;