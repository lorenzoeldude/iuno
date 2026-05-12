import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";
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


function Vocabula () {

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

    // const [index, setIndex] = useState(0);

    function Next() {

    if(step < vocabulas.length - 1) {
        setStep(step + 1);
        setSelected(null);
    } else {
        navigate("/lectiones/1/grammatica");
    }
}

    function Check(identity) {

        // prevents second click
        if(selected !== null) return;

        setSelected(identity);
    }

    function getButtonState(index) {

        // nothing selected yet
        if(selected === null) return 0;

        // correct answer = green
        if(correctAnswer[step] === index) return 1;

        // clicked wrong answer = red
        if(selected === index) return 2;

        // everything else grey
        return 0;
    }

    const progress = (step / (vocabulas.length - 1)) * 100;

    return (
        <LessonLayout active={"vocabula"}>

                <ProgressBar progress={progress} />

                <Verbum state={
                                selected !== null
                                    ? selected === correctAnswer[step]
                                        ? 1
                                        : 2
                                    : 0
                            }
                        >
                    {vocabulas[step]}
                </Verbum>

                <AnswerButton
                    onClick={() => Check(0)}
                    state={getButtonState(0)}
                >
                    {answers[step][0]}
                </AnswerButton>

                <AnswerButton
                    onClick={() => Check(1)}
                    state={getButtonState(1)}
                >
                    {answers[step][1]}
                </AnswerButton>

                <AnswerButton
                    onClick={() => Check(2)}
                    state={getButtonState(2)}
                >
                    {answers[step][2]}
                </AnswerButton>

                {selected !== null && (
                    <ArrowDiv>
                        <ArrowButton onClick={Next} state={
                                selected !== null
                                    ? selected === correctAnswer[step]
                                        ? 1
                                        : 2
                                    : 0
                            }>{">"}</ArrowButton>
                    </ArrowDiv>
                )}

        </LessonLayout>
    );
}

export default Vocabula;