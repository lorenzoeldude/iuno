import styled from "styled-components";
import Card from "../../atoms/Card";


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

const WordCardContent = styled.div`
    display: flex;
    flex-direction: column;
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


function Vocabulary() {

    return (
        <Wrapper>

            {/* ========================================= */}
            {/* WORD OF THE DAY */}
            {/* ========================================= */}

            <Card
                href="/dictionary/urbs"
                title=""
            >

                <WordCardContent>

                    <SmallLabel>
                        Word of the day
                    </SmallLabel>

                    <BigWord>
                        urbs
                    </BigWord>

                </WordCardContent>

            </Card>


            {/* ========================================= */}
            {/* TRAINERS */}
            {/* ========================================= */}

            <Grid>

                <Card
                    href="/trainer"
                    title="Train Words"
                >
                    Practice random Latin words from the dictionary.
                </Card>

            </Grid>

        </Wrapper>
    );
}

export default Vocabulary;