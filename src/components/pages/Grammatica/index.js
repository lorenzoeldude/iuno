import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../atoms/ProgressBar";
import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";

const Wrapper = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`;

const ContentDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 100px;
    width: 100%;
`;

const TextDiv = styled.div`
    width: 100%;
`;

const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
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
                "Fluvius singularis est. Fluviī pluralis est.",
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
                "Via singularis est. Viae pluralis est.",
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
                "Oppidum singularis est. Oppida pluralis est.",
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

    function selectAnswer(answer) {

        if (selected !== null) return;

        setSelected(answer);
    }

    function getButtonState(option) {

        if (selected === null) return 0;

        if (option === current.correct) return 1;

        if (option === selected) return 2;

        return 0;
    }

    return (
        <Wrapper>

            <ContentDiv>
                <ProgressBar progress={progress} />

                {current.type === "explanation" && (
                    <TextDiv>

                        <Title>{current.title}</Title>

                        {current.text.map((line, index) => (
                            <Text key={index}>
                                {line}
                            </Text>
                        ))}

                        <ArrowDiv>
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

                            {" "}{current.ending}.
                        </Text>

                        <ArrowDiv
                            style={{
                                display: "flex",
                                gap: "20px",
                                margin: "30px 0"
                            }}
                        >
                            {current.options.map((option, index) => (
                                <AnswerButton
                                    key={index}
                                    onClick={() =>
                                        selectAnswer(option)
                                    }
                                    state={getButtonState(option)}
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

            </ContentDiv>

            <Navigatio active={"grammatica"}/>

        </Wrapper>
    );
}

export default Grammatica;