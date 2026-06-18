import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { HeroCard } from "../Vocabulary";

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
    font-size: 60px;
    margin: 0;
`;

const Author = styled.div`
    opacity: 0.7;
`;

function Litterae() {
    const navigate = useNavigate();

    const [texts, setTexts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/texts")
            .then(res => {
                console.log("status", res.status);
                return res.json();
            })
            .then(data => {
                console.log("texts", data);
                setTexts(data);
            })
            .catch(err => {
                console.error(err);
            });

    }, []);
    // console.log("texts: ", texts);

    return (
        <Wrapper>
            <Grid>
                {texts.map(text => (
                    <HeroCard
                        key={text.id}
                        onClick={() => navigate(`/litterae/${text.author}/${text.title}/1`)}
                    >
                        <Title>{text.title}</Title>
                        <Author>{text.author}</Author>
                    </HeroCard>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default Litterae;