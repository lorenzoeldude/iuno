import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Content = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem 0 100px;
`;

const Verbum = styled.p`
    font-size: clamp(40px, 6vw, 60px);
    text-decoration: underline;
    margin-bottom: 40px;
    text-align: center;

    color: ${(props) => {
        if (props.state === 1) return "green";
        if (props.state === 2) return "red";
        return props.theme.colors.text;
    }};
`;

const Answers = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
`;

function Vocabula() {
    const vocabulas = [
        "Fluvius",
        "Luna",
        "Via",
        "Oppidum",
        "Ōsculum",
        "Puella",
        "Vir",
        "Puer"
    ];

    const answers = [
        ["moon", "river", "forest"],
        ["head", "car", "moon"],
        ["hand", "road", "arm"],
        ["city", "star", "river"],
        ["sword", "kiss", "forest"],
        ["girl", "river", "forest"],
        ["boy", "river", "man"],
        ["boy", "river", "forest"],
    ];

    const correctAnswer = [1, 2, 1, 0, 1, 0, 2, 0];

    const [selected, setSelected] = useState(null);
    const [step, setStep] = useState(0);

    const navigate = useNavigate();

    function Next() {
        if (step < vocabulas.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            navigate("/lesson/1/grammatica");
        }
    }

    const progress = (step / (vocabulas.length - 1)) * 100;

    return (
        <LessonLayout
            active="vocabula"
            completed={["textus"]}
            progress={progress}
        >
            <Wrapper>
                <Content>
                    <Verbum
                        state={
                            selected !== null
                                ? selected === correctAnswer[step]
                                    ? 1
                                    : 2
                                : 0
                        }
                    >
                        {vocabulas[step]}
                    </Verbum>

                    <Answers>
                        {answers[step].map((answer, index) => (
                            <AnswerButton
                                key={index}
                                index={index}
                                correct={correctAnswer[step]}
                                selected={selected}
                                setSelected={setSelected}
                            >
                                {answer}
                            </AnswerButton>
                        ))}
                    </Answers>
                </Content>
            </Wrapper>

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton
                        onClick={Next}
                        state={
                            selected === correctAnswer[step]
                                ? 1
                                : 2
                        }
                    >
                        {">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Vocabula;