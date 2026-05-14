import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";

const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
`;

const Title = styled.h1`
    font-size: 50px;
    font-family: "Cormorant Garamond", serif;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Subtitle = styled.p`
    font-size: 22px;
    opacity: 0.7;
    margin-bottom: 60px;
`;

const Verbum = styled.p`
    font-size: 50px;
    text-decoration: underline;
    margin-bottom: 30px;

    color: ${(props) => {
        if (props.state === 1) return "green";
        if (props.state === 2) return "red";
        return "black";
    }};
`;

const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const Loading = styled.p`
    font-size: 30px;
`;

const Finished = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RestartButton = styled.button`
    margin-top: 20px;
    padding: 12px 24px;
    border: 1px solid black;
    background: white;
    cursor: pointer;
    font-size: 18px;

    &:hover {
        background: #f5f5f5;
    }
`;

function Trainer() {
    const [words, setWords] = useState([]);
    const [selected, setSelected] = useState(null);
    const [step, setStep] = useState(0);
    const [finished, setFinished] = useState(false);

    const navigate = useNavigate();

    // --------------------
    // fetch random trainer words
    // --------------------
    useEffect(() => {
        fetch("http://localhost:8080/api/trainer/random")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setWords(data);
                } else {
                    setWords([]);
                }
            })
            .catch((err) => {
                console.error(err);
                setWords([]);
            });
    }, []);

    // --------------------
    // loading state
    // --------------------
    if (!words || words.length === 0) {
        return (
            <Wrapper>
                <Loading>Loading...</Loading>
            </Wrapper>
        );
    }

    const current = words[step];

    // --------------------
    // next question
    // --------------------
    function Next() {
        if (step < words.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    }

    // --------------------
    // restart trainer
    // --------------------
    function Restart() {
        window.location.reload();
    }

    // --------------------
    // finished screen
    // --------------------
    if (finished) {
        return (
            <Wrapper>
                <Finished>
                    <Title>Optime!</Title>
                    <Subtitle>You finished the trainer.</Subtitle>

                    <RestartButton onClick={Restart}>
                        Restart
                    </RestartButton>
                </Finished>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {/* <Title>Trainer</Title>
            <Subtitle>Exerce vocabula Latina.</Subtitle> */}

            <Verbum
                state={
                    selected !== null
                        ? selected === current.correct
                            ? 1
                            : 2
                        : 0
                }
            >
                {current.latin}
            </Verbum>

            {current.answers.map((answer, index) => (
                <AnswerButton
                    key={index}
                    index={answer}
                    correct={current.correct}
                    selected={selected}
                    setSelected={setSelected}
                >
                    {answer}
                </AnswerButton>
            ))}

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton
                        onClick={Next}
                        state={
                            selected === current.correct
                                ? 1
                                : 2
                        }
                    >
                        {">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </Wrapper>
    );
}

export default Trainer;