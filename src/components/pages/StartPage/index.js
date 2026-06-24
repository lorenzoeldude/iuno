import styled, { keyframes } from "styled-components";
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    padding: 40px 20px;
    box-sizing: border-box;

    animation: ${fadeIn} 1.5s ease-out;
`;

const BlockDiv = styled.div`
    width: 100%;
    max-width: 1200px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 20px;

    margin-top: 35px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Title = styled.h1`
    font-family: "Luxurious Roman", serif;
    font-size: 60px;
    letter-spacing: 8px;
    margin: 0;

    @media (max-width: 600px) {
        font-size: 45px;
        letter-spacing: 5px;
    }
`;

const Subtitle = styled.p`
    font-size: 18px;
    opacity: 0.7;

    max-width: 550px;

    line-height: 1.7;

    margin: 10px 0;
`;

const StyledSearch = styled(Searchbar)`
    height: 50px;
    width: 300px;

    border: 1px solid #e6e1d8;

    text-align: center;

    margin: 20px 0;
`;


function StartPage() {

    return (
        <Wrapper>

            <Title>
                IUNO
            </Title>

            <Subtitle>
                Learn Latin now
            </Subtitle>

            <StyledSearch />

            <BlockDiv>

                <Card
                    href="/lectiones"
                    title="Lessons"
                >
                    Master Latin step by step through structured lessons covering grammar, vocabulary, and reading.
                </Card>


                <Card
                    href="/trainer"
                    title="Trainer"
                >
                    Train vocabulary, create word lists and use our built-in algorithm for spaced repition.
                </Card>


                <Card
                    href="/read"
                    title="Read"
                >
                    Read texts from beginner to the Aeneid, and lookup words on the spot.
                </Card>

            </BlockDiv>

        </Wrapper>
    );
}

export default StartPage;