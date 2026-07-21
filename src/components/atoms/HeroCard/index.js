import styled from "styled-components";

export const HeroCard = styled.div`
    width: 100%;
    padding: 50px;
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