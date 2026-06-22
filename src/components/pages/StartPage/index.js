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

const Card = styled.a`
    min-height: 220px;

    padding: 80px;

    background: white;
    border: 1px solid #e6e1d8;

    text-decoration: none;
    color: black;

    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: all 0.25s ease;

    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 3px;

        background: #b89b5e;

        transform: scaleX(0);
        transform-origin: left;

        transition: transform 0.25s ease;
    }

    &:hover {
        transform: translateY(-4px);

        border-color: #b89b5e;

        box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.08);

        color: black;
    }

    &:hover::before {
        transform: scaleX(1);
    }
`;

const CardTitle = styled.h2`
    font-size: 30px;
    margin: 0 0 10px 0;
`;

const CardText = styled.p`
    font-size: 20px;
    line-height: 1.6;
    opacity: 0.75;
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

                <Card href="/lectiones">

                    <CardTitle>
                        Lessons
                    </CardTitle>

                    <CardText>
                        Learn Latin by reading through our guided lessons.
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


                <Card href="/read">

                    <CardTitle>
                        Read
                    </CardTitle>

                    <CardText>
                        Read texts from beginner to the Aeneid, and lookup words on the spot.
                    </CardText>

                </Card>

            </BlockDiv>

        </Wrapper>
    );
}

export default StartPage;