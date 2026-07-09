import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 15px;
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    outline: none;

    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &::placeholder {
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.6;
    }

    &:focus {
        outline: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
`;

export default Input;