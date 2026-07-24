import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";
import NavigationButton from "../../atoms/NavigationButton";
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
    align-items: center;

    padding: 2rem 0 100px;
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
    const { id } = useParams();

    const navigate = useNavigate();
    const sounds = useSoundEffects();

    const [questions, setQuestions] = useState([]);

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
                setQuestions(lesson.exam || []);
            } catch (err) {
                console.error(err);
            }
        }

        fetchLesson();
    }, [id]);

    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);

    if (questions.length === 0) {
        return (
            <LessonLayout
                active="examinatio"
                completed={["textus", "vocabula", "grammatica"]}
                progress={0}
            >
                Loading...
            </LessonLayout>
        );
    }

    const current = questions[step];
    const progress = (step / questions.length) * 100;

    function nextQuestion() {
        if (selected === current.correct) {
            setScore(score + 1);
        }

        setStep(step + 1);
        setSelected(null);
    }

    if (step >= questions.length) {
        return (
            <LessonLayout
                active="examinatio"
                progress={100}
            >
                <Wrapper>
                    <Content>
                        <ResultText>
                            Correct: {score} / {questions.length}
                        </ResultText>

                        <div style={{ marginTop: "40px" }}>
                            <NavigationButton onClick={() => navigate("/lessons")}>
                                Finish Lesson
                            </NavigationButton>
                        </div>
                    </Content>
                </Wrapper>
            </LessonLayout>
        );
    }

    const isFillQuestion =
        current.type === "word" || current.type === "ending";

    return (
        <LessonLayout
            active="examinatio"
            completed={["textus", "vocabula", "grammatica"]}
            progress={progress}
        >
            <Wrapper>
                <Content>
                    <Question>
                        {isFillQuestion ? (
                            <>
                                {current.before}

                                {current.type === "word" && " "}

                                <span
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    {selected !== null ? current.correct : "_"}
                                </span>

                                {" "}

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
                                sounds={sounds}
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
                            ? "Finish"
                            : ">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Examinatio;