import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";
import { useState } from "react";
import ProgressBar from "../../atoms/ProgressBar";
import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-size: 40px;
    text-decoration: underline;
    margin-bottom: 40px;
`;

const Question = styled.p`
    font-size: 35px;
    text-align: center;
    margin: 40px 0;
`;

const ResultText = styled.p`
    font-size: 40px;
    margin-top: 30px;
`;

function Examinatio() {

    const questions = [

        // vocabulary
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

        // grammar
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

        // text questions
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

        // more mixed
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

    function selectAnswer(option) {

        if(selected !== null) return;

        setSelected(option);

        if(option === current.correct) {
            setScore(score + 1);
        }
    }

    function nextQuestion() {

        setStep(step + 1);
        setSelected(null);
    }

    function getButtonState(option) {

        if(selected === null) return 0;

        if(option === current.correct) return 1;

        if(option === selected) return 2;

        return 0;
    }

    function getRank() {

        if(score >= 18) return "Magister";
        if(score >= 14) return "Discipulus";
        if(score >= 10) return "Tiro";

        return "Novicius";
    }

    // final screen
    if(step >= questions.length) {

        return (
            <LessonLayout active={"examinatio"}>

                    <Title>Exāminātiō Perfecta</Title>

                    <ResultText>
                        Puncta: {score} / {questions.length}
                    </ResultText>

                    <ResultText>
                        Gradus: {getRank()}
                    </ResultText>

            </LessonLayout>
        );
    }

    return (
        <LessonLayout active={"examinatio"}>

                <ProgressBar progress={progress} />
                <Title>Exāminātiō</Title>
            
                <Question>

                    {current.type === "grammar" ? (
                        <>
                            {current.before}

                            <span
                                style={{
                                    textDecoration: "underline"
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

                {current.options.map((option, index) => (
                    <AnswerButton
                        key={index}
                        onClick={() => selectAnswer(option)}
                        state={getButtonState(option)}
                    >
                        {option}
                    </AnswerButton>
                ))}

                {selected !== null && (
                    <ArrowButton onClick={nextQuestion}>
                        {step === questions.length - 1
                            ? "Perfice"
                            : ">"}
                    </ArrowButton>
                )}
        </LessonLayout>
    );
}

export default Examinatio;