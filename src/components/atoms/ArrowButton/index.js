import styled from "styled-components";

const ArrowButton = styled.button`
    font-size: 50px;
    // padding: 0px 16px;
    cursor: pointer;
    background: none;
    border: none;
    opacity: 70%;

    &:hover {
        opacity: 100%;
    }

    color: ${({ theme }) => theme.colors.text};
`;

export default ArrowButton;