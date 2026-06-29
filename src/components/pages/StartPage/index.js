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

    position: relative;

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

const Footer = styled.div`
    position: absolute;
    bottom: 20px;

    font-size: 12px;
    opacity: 0.5;

    a {
        color: inherit;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Title = styled.h1`
    // LUXURIOUS ROMAN
    // font-family: "Luxurious Roman", serif;
    // font-size: 50px;
    // letter-spacing: 8px;

    // // MONTSERRAT
    // font-family: "Montserrat", sans-serif;
    // font-weight: 700;
    // letter-spacing: 8px;

    // // BODONI
    // font-family: "Bodoni Moda", serif;
    // font-optical-sizing: auto;
    // font-weight: <weight>;
    // font-style: normal;

    // // JOST
    // font-family: "Jost", sans-serif;
    // font-optical-sizing: auto;
    // font-weight: <weight>;
    // font-style: normal;

    // // JOSEFIN
    // font-family: "Josefin Sans", sans-serif;
    // font-optical-sizing: auto;
    // font-weight: 700;
    // font-style: normal;

    // // LEXEND
    // font-family: "Lexend", sans-serif;
    // font-optical-sizing: auto;
    // font-weight: <weight>;
    // font-style: normal;

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

const Image = styled.img`
    height: 100px;
`;

const Column = styled.div`
    // display: flex;
    // justify-content: center;
    // align-items: center;
`;



function StartPage() {

    return (
        <Wrapper>

            <Column>
                <Title>
                    IUNONI
                </Title>
            </Column>

            <Subtitle>
                Where Latin comes alive
            </Subtitle>

            <StyledSearch />

            <BlockDiv>

                <Card
                    href="/lesson"
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

            <Footer>
                © 2026 IUNONI | <a href="/impressum">Impressum</a> | <a href="/privacy">Privacy Policy</a>
            </Footer>

        </Wrapper>
    );
}

export default StartPage;