import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 15px;
    margin-bottom: 15px;
    // border: 0.1px solid rgba(190, 190, 190, 0.2);
    border: none;

    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
`;

export default Input;