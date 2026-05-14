import styled from "styled-components";

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

const Button = styled.div`
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

// const Button = styled.a`
//     margin: 30px 10px;
//     padding: 12px 24px;
//     border: 1px solid black;
//     text-decoration: none;
//     color: black;
//     font-size: 20px;
//     letter-spacing: 2px;
//     transition: all 0.2s ease;

//     background-color: ${(props) => {
//         if (props.state === 1) return "green";
//         if (props.state === 2) return "red";
//         return "#ffffff";
//     }};

//     &:hover {
//         color: white;
//     }
// `;

function AnswerButton({
    children,
    index,
    correct,
    selected,
    setSelected
}) {

    function handleClick() {

        if(selected !== null) return;

        setSelected(index);

        if(index === correct) {
            correctSound.currentTime = 0;
            correctSound.play();
        } else {
            wrongSound.currentTime = 0;
            wrongSound.play();
        }
    }

    function getState() {

        if(selected === null) return 0;

        if(index === correct) return 1;

        if(index === selected) return 2;

        return 0;
    }

    return (
        <Button
            onClick={handleClick}
            state={getState()}
        >
            {children}
        </Button>
    );
}

export default AnswerButton;