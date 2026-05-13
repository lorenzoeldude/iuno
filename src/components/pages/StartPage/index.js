import styled, { keyframes } from "styled-components";
import Searchbar from "../../atoms/Searchbar";

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
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    animation: ${fadeIn} 1.5s ease-out;
`;

const BlockDiv = styled.div`
    display: flex;
`;

const Title = styled.h1`
    font-family: "Luxurious Roman", serif;
    font-size: 60px;
    letter-spacing: 8px;
    margin: 0;
`;

const Subtitle = styled.p`
    font-size: 18px;
    opacity: 0.7;
    margin-top: 10px;
    max-width: 500px;
`;

const Button = styled.a`
    margin: 30px 10px;
    padding: 12px 24px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    font-size: 20px;
    letter-spacing: 2px;
    transition: all 0.2s ease;

    &:hover {
        background: black;
        color: white;
    }
`;

const StyledSearch = styled(Searchbar)`
    height: 40px;
    width: 200px;
    text-align: center;
    margin: 30px 0;
`;

function StartPage() {
    return (
        <Wrapper>
            <Title>IUNO</Title>

            {/* <Subtitle>
                Learn Latin through reading, grammar, and interactive vocabulary.
                Double-click any word to explore its meaning instantly.
            </Subtitle> */}

            <Subtitle>
                Learn Latin step by step through reading lessons, and look up words with our built in dictionary. Practice vocabulary and learn new words everyday.<br/>
            </Subtitle>

            <StyledSearch />

            <BlockDiv>
                <Button href="/lectiones">
                    Lectiones
                </Button>

                <Button href="/dictionary/urbs">
                    Verbum Diēī
                </Button>

                <Button href="/dictionary/luna">
                    Verbum
                </Button>
            </BlockDiv>
        </Wrapper>
    );
}

export default StartPage;