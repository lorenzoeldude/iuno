import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

import useSoundEffects from "../../../hooks/useSoundEffects";

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
    line-height: 1.3;
    font-size: 30px;
    text-align: left;
    margin: 12px 0;
`;

const Question = styled.p`
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

    const { id } = useParams();

    const navigate = useNavigate();

    const sounds = useSoundEffects();

    const [slides, setSlides] = useState([]);
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        async function fetchLesson() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/lessons/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch lesson");
                }

                const lesson = await response.json();
                setSlides(lesson.grammar || []);
            } catch (err) {
                console.error(err);
            }
        }

        fetchLesson();
    }, [id]);

    if (slides.length === 0) {
        return (
            <LessonLayout
                active="grammatica"
                completed={["textus", "vocabula"]}
                progress={0}
            >
                Loading...
            </LessonLayout>
        );
    }

    const current = slides[step];

    const progress =
        slides.length > 1
            ? (step / (slides.length - 1)) * 100
            : 100;

    function Next() {
        if (step < slides.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            navigate(`/lessons/${id}/examinatio`);
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
                                <Text
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: line }}
                                />
                            ))}
                        </>
                    )}

                    {(current.type === "quizEnding" || current.type === "quizWord") && (
                        <>
                            <Question>
                                {current.sentenceBefore}

                                {current.type === "quizWord" && " "}

                                <span
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    {selected === null
                                        ? "_"
                                        : current.correct}
                                </span>

                                {" "}

                                {current.ending}
                            </Question>

                            <QuizOptions>
                                {current.options.map((option) => (
                                    <AnswerButton
                                        key={option}
                                        index={option}
                                        correct={current.correct}
                                        selected={selected}
                                        setSelected={setSelected}
                                        sounds={sounds}
                                    >
                                        {current.type === "quizEnding"
                                            ? `-${option}`
                                            : option}
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