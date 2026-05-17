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
    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    animation: ${fadeIn} 1.5s ease-out;
`;

const BlockDiv = styled.div`
    display: flex;
    gap: 18px;
    margin-top: 35px;
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
    max-width: 550px;
    line-height: 1.7;
`;

const Card = styled.a`
    width: 240px;
    min-height: 180px;

    padding: 28px;

    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 22px;

    text-decoration: none;
    color: black;

    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: all 0.2s ease;

    &:hover {
        background: black;
        color: white;
        transform: translateY(-2px);
    }
`;

const CardTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 14px;
`;

const CardText = styled.p`
    font-size: 16px;
    line-height: 1.6;
    opacity: 0.75;
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

            <StyledSearch />

            {/* <Subtitle>
                Learn Latin step by step through reading lessons,
                and look up words instantaneously with IUNO's
                built in dictionary. Practice vocabulary and
                learn new words everyday.
            </Subtitle> */}

            <BlockDiv>

                <Card href="/lectiones">

                    <CardTitle>
                        Lessons
                    </CardTitle>

                    <CardText>
                        Learn Latin by reading guided lessons.
                    </CardText>

                </Card>

                <Card href="/vocabulary">

                    <CardTitle>
                        Vocabulary
                    </CardTitle>

                    <CardText>
                        Train your vocabulary and create word lists.
                    </CardText>

                </Card>

                <Card href="/dictionary/urbs">

                    <CardTitle>
                        Grammar
                    </CardTitle>

                    <CardText>
                        Practice Latin grammar interactively.
                    </CardText>

                </Card>


            </BlockDiv>

        </Wrapper>
    );
}

export default StartPage;