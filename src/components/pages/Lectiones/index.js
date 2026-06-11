import styled from "styled-components";
import { HeroCard } from "../Vocabulary";
import { useNavigate } from "react-router-dom";


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

export const Capitula = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center; 
    flex-direction: column;
    height: 100px;
    width: 500px;
    margin: 0px 0;
    background-color: #ffffff;
    // border: 0.5px solid black;
    text-decoration: none;
    color: black;
    transition: all 0.2s ease;

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
    font-size: 40px;
`;

const Link = styled.a`
    text-decoration: none;
`;

function Lectiones () {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Grid>
                <HeroCard onClick={() => navigate("/lectiones/1/textus")}>
                    <Title>CAPITVLVM I</Title>
                </HeroCard>
            </Grid>
        </Wrapper>
    );
}

export default Lectiones;