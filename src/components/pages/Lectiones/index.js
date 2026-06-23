import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "../../atoms/Card";


const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 40px;
`;


function Lectiones() {

    const navigate = useNavigate();

    return (
        <Wrapper>

            <Grid>

                <Card
                    href="/lectiones/1/textus"
                    title="CAPITVLVM I"
                    size="small"
                >
                    <Title>
                        Familia Romana
                    </Title>
                </Card>

            </Grid>

        </Wrapper>
    );
}

export default Lectiones;