import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    width: 100%;
    justify-content: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
`;

const Capitula = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center; 
    height: 100px;
    width: 500px;
    margin: 0px 0;
    background-color: #ffffff;
    border: 0.5px solid black;
    text-decoration: none;
    color: black;

    &:visited {
        color: black;
        text-decoration: none;
    }

    &:hover {
        background-color: #2e2e2e;
        color: white;
    }

    &:active {
        color: black;
    }
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 60px;
`;

const Link = styled.a`
    text-decoration: none;
`;

function Lectiones () {
    return (
        <Wrapper>
            <Grid>
                <Link href="/lectiones/1/textus">
                    <Capitula>
                        <Title>I</Title>
                    </Capitula>
                </Link>

                <Link href="/lectiones/1/textus">
                    <Capitula>
                        <Title>II</Title>
                    </Capitula>
                </Link>

                <Link href="/lectiones/1/textus">
                    <Capitula>
                        <Title>III</Title>
                    </Capitula>
                </Link>

                <Link href="/lectiones/1/textus">
                    <Capitula>
                        <Title>IV</Title>
                    </Capitula>
                </Link>

                <Link href="/lectiones/Unus">
                    <Capitula>
                        <Title>V</Title>
                    </Capitula>
                </Link>
            </Grid>
        </Wrapper>
    );
}

export default Lectiones;