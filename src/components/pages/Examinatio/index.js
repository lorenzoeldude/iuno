import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";
import NavigationButton from "../../atoms/NavigationButton";
import useSoundEffects from "../../../hooks/useSoundEffects";

import { API_URL } from "../../../config";

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

const ScoreText = styled.p`
    font-size: clamp(24px, 3vw, 34px);
    text-align: center;
    margin: 12px 0;
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
`;

const RewardText = styled.p`
    font-size: clamp(22px, 3vw, 30px);
    text-align: center;
    margin: 12px 0;

    color: ${({ theme }) => theme.colors.text};
`;

function Examinatio() {
    const { id } = useParams();
    const navigate = useNavigate();
    const sounds = useSoundEffects();

    const [questions, setQuestions] = useState([]);

    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);

    const [saving, setSaving] = useState(false);

    // =====================================================
    // FETCH LESSON
    // =====================================================

    useEffect(() => {
        async function fetchLesson() {
            try {
                const response = await fetch(
                    `${API_URL}/api/lessons/${id}`
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

    // =====================================================
    // SAVE LESSON COMPLETION
    // =====================================================

    async function completeLesson(finalCorrect) {
        const token = localStorage.getItem("token");

        if (!token || saving) {
            return;
        }

        setSaving(true);

        const percentage = Math.round(
            (finalCorrect / questions.length) * 100
        );

        try {
            const response = await fetch(
                `${API_URL}/api/lessons/${id}/progress`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        section: "examinatio",
                        score: percentage,
                    }),
                }
            );

            if (!response.ok) {
                console.error(
                    "Failed to save lesson progress:",
                    response.status
                );
            }
        } catch (err) {
            console.error(
                "LESSON COMPLETION ERROR:",
                err
            );
        }
    }

    // =====================================================
    // LOADING
    // =====================================================

    if (questions.length === 0) {
        return (
            <LessonLayout
                active="examinatio"
                completed={[
                    "textus",
                    "vocabula",
                    "grammatica",
                ]}
                progress={0}
            >
                Loading...
            </LessonLayout>
        );
    }

    // =====================================================
    // FINISHED
    // =====================================================

    if (step >= questions.length) {
        const percentage = Math.round(
            (score / questions.length) * 100
        );

        return (
            <LessonLayout
                active="examinatio"
                completed={[
                    "textus",
                    "vocabula",
                    "grammatica",
                    "examinatio",
                ]}
                progress={100}
            >
                <Wrapper>
                    <Content>
                        <ResultText>
                            Correct: {score} / {questions.length}
                        </ResultText>

                        <ScoreText>
                            Score: {percentage}%
                        </ScoreText>

                        <RewardText>
                            +100 sestertii
                        </RewardText>

                        <div style={{ marginTop: "40px" }}>
                            <NavigationButton
                                onClick={() =>
                                    navigate("/lessons")
                                }
                            >
                                Finish Lesson
                            </NavigationButton>
                        </div>
                    </Content>
                </Wrapper>
            </LessonLayout>
        );
    }

    const current = questions[step];

    const progress =
        (step / questions.length) * 100;

    const isFillQuestion =
        current.type === "word" ||
        current.type === "ending";

    // =====================================================
    // NEXT QUESTION
    // =====================================================

    async function nextQuestion() {
        const isCorrect =
            selected === current.correct;

        const newScore =
            isCorrect
                ? score + 1
                : score;

        // Last question
        if (step === questions.length - 1) {
            setScore(newScore);

            await completeLesson(newScore);

            setStep(step + 1);
            setSelected(null);

            return;
        }

        setScore(newScore);
        setStep(step + 1);
        setSelected(null);
    }

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <LessonLayout
            active="examinatio"
            completed={[
                "textus",
                "vocabula",
                "grammatica",
            ]}
            progress={progress}
        >
            <Wrapper>
                <Content>
                    <Question>
                        {isFillQuestion ? (
                            <>
                                {current.before}

                                {current.type === "word" &&
                                    " "}

                                <span
                                    style={{
                                        textDecoration:
                                            "underline",
                                    }}
                                >
                                    {selected !== null
                                        ? current.correct
                                        : "_"}
                                </span>

                                {" "}

                                {current.after}
                            </>
                        ) : (
                            current.question
                        )}
                    </Question>

                    <Answers>
                        {current.options.map(
                            (option) => (
                                <AnswerButton
                                    key={option}
                                    index={option}
                                    correct={
                                        current.correct
                                    }
                                    selected={selected}
                                    setSelected={
                                        setSelected
                                    }
                                    sounds={sounds}
                                >
                                    {option}
                                </AnswerButton>
                            )
                        )}
                    </Answers>
                </Content>
            </Wrapper>

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton
                        onClick={nextQuestion}
                        state={
                            selected ===
                            current.correct
                                ? 1
                                : 2
                        }
                    >
                        {step ===
                        questions.length - 1
                            ? "Finish"
                            : ">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Examinatio;