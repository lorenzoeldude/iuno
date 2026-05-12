import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../../atoms/ProgressBar";
import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

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

        if(step < vocabulas.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            navigate("/lectiones/1/grammatica");
        }
    }

    const progress = (step / (vocabulas.length - 1)) * 100;

    return (
        <LessonLayout active={"vocabula"}>

            <ProgressBar progress={progress} />

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