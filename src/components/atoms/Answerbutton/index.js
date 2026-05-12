import styled from "styled-components";

const AnswerButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    width: 300px;
    height: 50px;
    margin: 10px 0;
    font-size: 30px;
    color: white;
    cursor: pointer;
    border: 2px solid #212121;

    background-color: ${(props) => {
        if (props.state === 1) return "green";
        if (props.state === 2) return "red";
        return "#212121";
    }};

    &:hover {
        border: 2px solid #d9d9d9;
    }
`;

export default AnswerButton;