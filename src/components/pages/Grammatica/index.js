import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Content = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 2rem 0 100px;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: clamp(28px, 4vw, 42px);
    text-decoration: underline;
    text-align: left;
    margin-bottom: 40px;
`;

const Text = styled.p`
    font-size: clamp(26px, 3vw, 38px);
    line-height: 1.6;
    text-align: left;
    margin: 12px 0;
`;

const QuizOptions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);

    display: flex;
    gap: 20px;
`;

function Grammatica() {
    const navigate = useNavigate();

    const slides = [
        {
            type: "explanation",
            title: "Singulāris et Plūrālis",
            text: [
                "Nīlus fluvius magnus est.",
                "Nīlus et Rhēnus fluviī magnī sunt.",
                "Fluvius singulāris est. Fluviī plūrālēs sunt.",
                "Singulāris: -us. Plūrālis: -ī."
            ]
        },
        {
            type: "quiz",
            sentenceBefore: "Fluviī parv",
            correct: "ī",
            options: ["us", "ī"],
            ending: "sunt."
        },
        {
            type: "quiz",
            sentenceBefore: "Servus bon",
            correct: "us",
            options: ["us", "ī"],
            ending: "est."
        },
        {
            type: "explanation",
            title: "Fēminīnum",
            text: [
                "Via longa est.",
                "Viae longae sunt.",
                "Via singulāris est. Viae plūrālēs sunt.",
                "Singulāris: -a. Plūrālis: -ae."
            ]
        },
        {
            type: "quiz",
            sentenceBefore: "Via long",
            correct: "a",
            options: ["a", "ae"],
            ending: "est."
        },
        {
            type: "quiz",
            sentenceBefore: "Viae long",
            correct: "ae",
            options: ["a", "ae"],
            ending: "sunt."
        },
        {
            type: "explanation",
            title: "Neutrum",
            text: [
                "Oppidum magnum est.",
                "Oppida magna sunt.",
                "Oppidum singulāre est. Oppida plūrālia sunt.",
                "Singulāris: -um. Plūrālis: -a."
            ]
        },
        {
            type: "quiz",
            sentenceBefore: "Oppidum magn",
            correct: "um",
            options: ["um", "a"],
            ending: "est."
        },
        {
            type: "quiz",
            sentenceBefore: "Oppida magn",
            correct: "a",
            options: ["um", "a"],
            ending: "sunt."
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
            navigate("/lesson/1/examinatio");
        }
    }

    function Back() {
        if (step > 0) {
            setStep(step - 1);
            setSelected(null);
        }
    }

    return (
        <LessonLayout
            active="grammatica"
            completed={["textus", "vocabula"]}
            progress={progress}
        >
            <Wrapper>
                <Content>
                    {current.type === "explanation" && (
                        <>
                            <Title>{current.title}</Title>

                            {current.text.map((line, index) => (
                                <Text key={index}>{line}</Text>
                            ))}
                        </>
                    )}

                    {current.type === "quiz" && (
                        <>
                            <Text>
                                {current.sentenceBefore}

                                <span
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    {selected === null
                                        ? "_"
                                        : current.correct}
                                </span>{" "}

                                {current.ending}
                            </Text>

                            <QuizOptions>
                                {current.options.map((option) => (
                                    <AnswerButton
                                        key={option}
                                        index={option}
                                        correct={current.correct}
                                        selected={selected}
                                        setSelected={setSelected}
                                    >
                                        -{option}
                                    </AnswerButton>
                                ))}
                            </QuizOptions>
                        </>
                    )}
                </Content>
            </Wrapper>

            {(current.type === "explanation" || selected !== null) && (
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
            )}
        </LessonLayout>
    );
}

export default Grammatica;