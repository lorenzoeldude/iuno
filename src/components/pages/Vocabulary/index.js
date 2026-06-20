import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Capitula } from "../Lectiones";

const Wrapper = styled.div`
    width: 72%;
    margin: 0 auto;
    padding: 20px 0 60px 0;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export const HeroCard = styled.div`
    width: 100%;
    padding: 50px;
    border-radius: 0px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: 0.15s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
        background: rgba(0,0,0,0.03);
        transform: translateY(-2px);
    }

    &:visited {
        color: black;
    }
`;

const Card = styled(HeroCard)`

`;

const Card2 = styled.div`
    padding: 40px;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.08);
    cursor: pointer;
    transition: 0.15s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 220px;

    &:hover {
        background: rgba(0,0,0,0.03);
        transform: translateY(-2px);
    }
`;

const SmallLabel = styled.p`
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.5;
    margin-bottom: 12px;
`;

const BigWord = styled.h1`
    font-size: 72px;
    margin: 0;
    font-family: "Cormorant Garamond", serif;
`;

const CardTitle = styled.h2`
    font-size: 38px;
    margin-bottom: 12px;
`;

const CardText = styled.p`
    font-size: 18px;
    opacity: 0.7;
    line-height: 1.5;
`;

function Vocabulary() {

    const navigate = useNavigate();

    return (
        <Wrapper>

            {/* ========================================= */}
            {/* WORD OF THE DAY */}
            {/* ========================================= */}

            <HeroCard
                onClick={() => navigate("/dictionary/urbs")}
            >

                <SmallLabel>
                    Word of the day
                </SmallLabel>

                <BigWord>
                    urbs
                </BigWord>

            </HeroCard>

            {/* ========================================= */}
            {/* TRAINERS */}
            {/* ========================================= */}

            <Grid>

                {/* <Card onClick={() => navigate("/listtrainer")}>

                    <CardTitle>
                        Vocabulary
                    </CardTitle>

                    <CardText>
                        Train the words from your vocabulary list.
                    </CardText>

                </Card> */}

                <Card onClick={() => navigate("/trainer")}>

                    <CardTitle>
                        Train Words
                    </CardTitle>

                    <CardText>
                        Practice random Latin words from the dictionary.
                    </CardText>

                </Card>

            </Grid>

        </Wrapper>
    );
}

export default Vocabulary;