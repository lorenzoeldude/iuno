import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../../atoms/ProgressBar";
import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

const TextDiv = styled.div`
    width: 100%;
`;

const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: 30px;
    text-decoration: underline;
    margin-bottom: 40px;
`;

const Text = styled.p`
    font-size: 35px;
`;

function Grammatica() {

    const navigate = useNavigate();

    const slides = [

        // masculine
        {
            type: "explanation",
            title: "Singulāris et Plūrālis",
            text: [
                "Nīlus fluvius magnus est.",
                "Nīlus et Rhēnus fluviī magnī sunt.",
                "Fluvius singularis est. Fluviī pluralis sunt.",
                "Singulāris: -us. Plūrālis: -ī."
            ]
        },

        {
            type: "quiz",
            sentenceBefore: "I et II parvī numer",
            correct: "ī",
            options: ["us", "ī"],
            ending: "sunt"
        },

        {
            type: "quiz",
            sentenceBefore: "Servus bon",
            correct: "us",
            options: ["us", "ī"],
            ending: "est"
        },

        // feminine
        {
            type: "explanation",
            title: "Fēminīnum",
            text: [
                "Via longa est.",
                "Viae longae sunt.",
                "Via singularis est. Viae pluralis sunt.",
                "Singulāris: -a. Plūrālis: -ae."
            ]
        },

        {
            type: "quiz",
            sentenceBefore: "Via long",
            correct: "a",
            options: ["a", "ae"],
            ending: "est"
        },

        {
            type: "quiz",
            sentenceBefore: "Viae long",
            correct: "ae",
            options: ["a", "ae"],
            ending: "sunt"
        },

        // neuter
        {
            type: "explanation",
            title: "Neutrum",
            text: [
                "Oppidum magnum est.",
                "Oppida magna sunt.",
                "Oppidum singularis est. Oppida pluralis sunt.",
                "Singulāris: -um. Plūrālis: -a."
            ]
        },

        {
            type: "quiz",
            sentenceBefore: "Oppidum magn",
            correct: "um",
            options: ["um", "a"],
            ending: "est"
        },

        {
            type: "quiz",
            sentenceBefore: "Oppida magn",
            correct: "a",
            options: ["um", "a"],
            ending: "sunt"
        }
    ];

    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);

    const current = slides[step];

    const progress = (step / (slides.length - 1)) * 100;

    function Next() {

        if (step < slides.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            navigate("/lectiones/1/examinatio");
        }
    }

    function Back() {

        if (step > 0) {
            setStep(step - 1);
            setSelected(null);
        }
    }

    return (
        <LessonLayout active={"grammatica"}>

            <ProgressBar progress={progress} />

            {current.type === "explanation" && (

                <TextDiv>

                    <Title>
                        {current.title}
                    </Title>

                    {current.text.map((line, index) => (
                        <Text key={index}>
                            {line}
                        </Text>
                    ))}

                    <ArrowDiv>

                        {step > 0 && (
                            <ArrowButton onClick={Back}>
                                {"<"}
                            </ArrowButton>
                        )}

                        <ArrowButton onClick={Next}>
                            {">"}
                        </ArrowButton>

                    </ArrowDiv>

                </TextDiv>
            )}

            {current.type === "quiz" && (
                <>

                    <Text>

                        {current.sentenceBefore}

                        <span
                            style={{
                                textDecoration: "underline"
                            }}
                        >
                            {selected === null
                                ? "_"
                                : current.correct}
                        </span>

                        {" "}

                        {current.ending}.

                    </Text>

                    <ArrowDiv
                        style={{
                            margin: "30px 0"
                        }}
                    >

                        {current.options.map((option, index) => (

                            <AnswerButton
                                key={index}
                                index={option}
                                correct={current.correct}
                                selected={selected}
                                setSelected={setSelected}
                            >
                                -{option}
                            </AnswerButton>

                        ))}

                    </ArrowDiv>

                    {selected !== null && (

                        <ArrowDiv>

                            <ArrowButton onClick={Back}>
                                {"<"}
                            </ArrowButton>

                            <ArrowButton onClick={Next}>
                                {">"}
                            </ArrowButton>

                        </ArrowDiv>
                    )}

                </>
            )}

        </LessonLayout>
    );
}

export default Grammatica;