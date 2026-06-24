import styled from "styled-components";

const ArrowButton = styled.button`
    font-size: 50px;
    padding: 10px 16px;
    cursor: pointer;
    background: none;
    border: none;
    opacity: 50%;

    &:hover {
        opacity: 100%;
    }

    color: ${(props) => props.color || "black"};
`;

export default ArrowButton;