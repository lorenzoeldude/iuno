import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "../../atoms/Card";


const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 40px;
`;

const Arrow = styled.div`
    text-align: center;
    font-size: 32px;
    opacity: 0.5;
`;



function Lectiones() {

    const navigate = useNavigate();

    return (
        <Wrapper>

            <Grid>

                <Card
                    href="/lectiones/1/textus"
                    title="I"
                    size="small"
                >
                    <Title>
                        Familia Romana
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="II"
                    size="small"
                >
                    <Title>
                        In Urbs
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="III"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="IV"
                    size="small"
                >
                    <Title>
                        In Urbs
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="V"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="VI"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="VII"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="VIII"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="IX"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
                <Arrow>↓</Arrow>
                <Card
                    href="/lectiones/1/textus"
                    title="X"
                    size="small"
                >
                    <Title>
                        Via Longa
                    </Title>
                </Card>
            </Grid>

        </Wrapper>
    );
}

export default Lectiones;