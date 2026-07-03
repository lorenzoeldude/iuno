import styled from "styled-components";
import { useState } from "react";

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
    align-items: center;

    padding: 2rem 0 100px;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(28px, 4vw, 42px);
    text-decoration: underline;
    text-align: center;
    margin-bottom: 30px;
`;

const Question = styled.p`
    font-size: clamp(28px, 4vw, 42px);
    text-align: center;
    line-height: 1.5;
    margin-bottom: 40px;
`;

const Answers = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 18px;
`;

const ResultText = styled.p`
    font-size: clamp(28px, 4vw, 40px);
    text-align: center;
    margin: 12px 0;
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
`;

function Examinatio() {
    const questions = [
        {
            type: "vocab",
            question: "Quid est fluvius?",
            options: ["river", "moon", "road"],
            correct: "river"
        },
        {
            type: "vocab",
            question: "Quid est puella?",
            options: ["girl", "boy", "city"],
            correct: "girl"
        },
        {
            type: "vocab",
            question: "Quid est via?",
            options: ["road", "water", "sun"],
            correct: "road"
        },
        {
            type: "vocab",
            question: "Quid est luna?",
            options: ["moon", "river", "house"],
            correct: "moon"
        },
        {
            type: "vocab",
            question: "Quid est vir?",
            options: ["woman", "man", "child"],
            correct: "man"
        },
        {
            type: "grammar",
            before: "Fluviī magn",
            after: " sunt.",
            options: ["us", "ī"],
            correct: "ī"
        },
        {
            type: "grammar",
            before: "Via long",
            after: " est.",
            options: ["a", "ae"],
            correct: "a"
        },
        {
            type: "grammar",
            before: "Oppida magn",
            after: " sunt.",
            options: ["a", "um"],
            correct: "a"
        },
        {
            type: "grammar",
            before: "Servus bon",
            after: " est.",
            options: ["us", "ī"],
            correct: "us"
        },
        {
            type: "grammar",
            before: "Viae long",
            after: " sunt.",
            options: ["a", "ae"],
            correct: "ae"
        },
        {
            type: "text",
            question: "Quis per viam ambulat?",
            options: ["Marcus", "Nīlus", "Puella"],
            correct: "Marcus"
        },
        {
            type: "text",
            question: "Ubi habitat Marcus?",
            options: ["In Italiā", "In Rōmā", "In Graeciā"],
            correct: "In Rōmā"
        },
        {
            type: "text",
            question: "Quid Marcus videt?",
            options: ["Mālum", "Canem", "Equum"],
            correct: "Mālum"
        },
        {
            type: "text",
            question: "Quāle est mālum?",
            options: ["Rubrum", "Nigrum", "Parvum"],
            correct: "Rubrum"
        },
        {
            type: "text",
            question: "Quid in caelō est?",
            options: ["Lūna", "Sōl", "Aqua"],
            correct: "Sōl"
        },
        {
            type: "grammar",
            before: "Puer",
            after: " sunt.",
            options: ["ī", "us"],
            correct: "ī"
        },
        {
            type: "vocab",
            question: "Quid est oppidum?",
            options: ["city", "river", "moon"],
            correct: "city"
        },
        {
            type: "text",
            question: "Estne Rōma calida?",
            options: ["Ita", "Nōn"],
            correct: "Ita"
        },
        {
            type: "grammar",
            before: "Oppidum magn",
            after: " est.",
            options: ["um", "a"],
            correct: "um"
        },
        {
            type: "text",
            question: "Estne Marcus fessus?",
            options: ["Ita", "Nōn"],
            correct: "Ita"
        }
    ];

    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);

    const current = questions[step];

    const progress = (step / questions.length) * 100;

    function nextQuestion() {
        if (selected === current.correct) {
            setScore(score + 1);
        }

        setStep(step + 1);
        setSelected(null);
    }

    function getRank() {
        if (score >= 18) return "Magister";
        if (score >= 14) return "Discipulus";
        if (score >= 10) return "Tiro";

        return "Novicius";
    }

    if (step >= questions.length) {
        return (
            <LessonLayout
                active="examinatio"
                progress={100}
            >
                <Wrapper>
                    <Content>
                        <Title>Exāminātiō Perfecta</Title>

                        <ResultText>
                            Puncta: {score} / {questions.length}
                        </ResultText>

                        <ResultText>
                            Gradus: {getRank()}
                        </ResultText>
                    </Content>
                </Wrapper>
            </LessonLayout>
        );
    }

    return (
        <LessonLayout
            active="examinatio"
            progress={progress}
        >
            <Wrapper>
                <Content>
                    <Question>
                        {current.type === "grammar" ? (
                            <>
                                {current.before}

                                <span
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    {selected !== null
                                        ? current.correct
                                        : "_"}
                                </span>

                                {current.after}
                            </>
                        ) : (
                            current.question
                        )}
                    </Question>

                    <Answers>
                        {current.options.map((option) => (
                            <AnswerButton
                                key={option}
                                index={option}
                                correct={current.correct}
                                selected={selected}
                                setSelected={setSelected}
                            >
                                {option}
                            </AnswerButton>
                        ))}
                    </Answers>
                </Content>
            </Wrapper>

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton onClick={nextQuestion}>
                        {step === questions.length - 1
                            ? "Perfice"
                            : ">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Examinatio;