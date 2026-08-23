import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

import useSoundEffects from "../../../hooks/useSoundEffects";

import { API_URL } from "../../../config";

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

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

    width: 100%;
`;

const Title = styled.h1`
    width: 100%;

    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: clamp(28px, 4vw, 42px);

    text-decoration: underline;
    text-align: left;

    margin: 0 0 40px;
`;

const Text = styled.div`
    width: 100%;

    font-size: 30px;
    line-height: 1.3;
    text-align: left;

    margin: 12px 0;

    strong {
        font-size: 36px;
        font-weight: 900;
    }

    .blue {
        color: #4a78c2;
    }

    .red {
        color: #d64545;
    }

    .green {
        color: #3a9d5d;
    }

    .orange {
        color: #d9822b;
    }

    .purple {
        color: #9b59b6;
    }

    .grammar {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: 24px;

        width: 100%;

        font-size: 36px;
        font-weight: 800;
    }

    .grammar-word {
        display: flex;
        flex-direction: column;
        align-items: center;

        flex-shrink: 0;
    }

    .grammar-case {
        margin-top: 5px;

        font-size: 14px;
        font-weight: 600;
        line-height: 1;
    }
`;

const SentenceQuestion = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 20px;
`;

const Sentence = styled.div`
    width: 100%;

    font-family: "Cormorant Garamond", serif;
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 600;
    line-height: 1.3;

    text-align: center;

    margin-bottom: 14px;

    padding-bottom: 14px;

`;

const Question = styled.div`
    width: 100%;

    font-size: clamp(22px, 3vw, 30px);
    font-weight: 600;
    line-height: 1.4;

    text-align: center;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const QuizOptions = styled.div`

    display: flex;
    flex-direction: column;
    align-items: stretch;

    // gap: 14px;

    margin: 30px auto 0;
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
                    throw new Error(
                        "Failed to fetch lesson"
                    );
                }

                const lesson = await response.json();

                setSlides(
                    lesson.grammar || []
                );
            } catch (error) {
                console.error(
                    "Error loading grammar:",
                    error
                );
            }
        }

        fetchLesson();
    }, [id]);

    // =====================================================
    // COMPLETE GRAMMAR SECTION
    // =====================================================

    async function completeGrammar() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.warn(
                "No auth token. Grammar progress will not be saved."
            );

            return;
        }

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
                        section: "grammar",
                    }),
                }
            );

            if (!response.ok) {
                console.error(
                    "Failed to update grammar progress:",
                    response.status
                );
            }
        } catch (error) {
            console.error(
                "GRAMMAR PROGRESS ERROR:",
                error
            );
        }
    }

    // =====================================================
    // NEXT
    // =====================================================

    async function Next() {
        if (step < slides.length - 1) {
            setStep(step + 1);
            setSelected(null);
            return;
        }

        await completeGrammar();

        navigate(
            `/lessons/${id}/examinatio`
        );
    }

    // =====================================================
    // BACK
    // =====================================================

    function Back() {
        if (step > 0) {
            setStep(step - 1);
            setSelected(null);
        }
    }

    // =====================================================
    // RENDER TEXT
    // =====================================================

    function renderText(lines) {
        const elements = [];

        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            const trimmed = line.trim();

            // =================================================
            // START OF GRAMMAR BLOCK
            // =================================================

            if (
                trimmed ===
                '<span class="grammar">'
            ) {
                let grammarHTML = "";

                let depth = 0;

                grammarHTML += line;

                depth++;

                i++;

                // =================================================
                // COLLECT EVERYTHING UNTIL OUTER SPAN CLOSES
                // =================================================

                while (
                    i < lines.length &&
                    depth > 0
                ) {
                    const currentLine =
                        lines[i];

                    grammarHTML +=
                        currentLine;

                    const openingMatches =
                        currentLine.match(
                            /<span(?:\s[^>]*)?>/g
                        );

                    const closingMatches =
                        currentLine.match(
                            /<\/span>/g
                        );

                    if (openingMatches) {
                        depth +=
                            openingMatches.length;
                    }

                    if (closingMatches) {
                        depth -=
                            closingMatches.length;
                    }

                    i++;
                }

                elements.push(
                    <Text
                        key={`grammar-${i}`}
                        dangerouslySetInnerHTML={{
                            __html: grammarHTML,
                        }}
                    />
                );

                continue;
            }

            // =================================================
            // NORMAL PARAGRAPH
            // =================================================

            elements.push(
                <Text
                    key={i}
                    dangerouslySetInnerHTML={{
                        __html: line,
                    }}
                />
            );

            i++;
        }

        return elements;
    }

    // =====================================================
    // LOADING
    // =====================================================

    if (slides.length === 0) {
        return (
            <LessonLayout
                active="grammatica"
                completed={[
                    "textus",
                    "vocabula",
                ]}
                progress={0}
            >
                Loading...
            </LessonLayout>
        );
    }

    // =====================================================
    // CURRENT SLIDE
    // =====================================================

    const current = slides[step];

    const progress =
        slides.length > 1
            ? (step / (slides.length - 1)) * 100
            : 100;

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <LessonLayout
            active="grammatica"
            completed={[
                "textus",
                "vocabula",
            ]}
            progress={progress}
        >
            <Wrapper>
                <Content>

                    {/* =================================================
                        EXPLANATION
                    ================================================= */}

                    {current.type === "explanation" && (
                        <>
                            <Title>
                                {current.title}
                            </Title>

                            {renderText(
                                current.text
                            )}
                        </>
                    )}

                    {/* =================================================
                        SENTENCE QUESTION
                    ================================================= */}

                    {current.type ===
                        "sentenceQuestion" && (
                        <>
                            <SentenceQuestion>

                                <Sentence>
                                    {current.sentence}
                                </Sentence>

                                <Question>
                                    {current.question}
                                </Question>

                            </SentenceQuestion>

                            <QuizOptions>
                                {current.options.map(
                                    (option) => (
                                        <AnswerButton
                                            key={option}
                                            index={option}
                                            correct={
                                                current.correct
                                            }
                                            selected={
                                                selected
                                            }
                                            setSelected={
                                                setSelected
                                            }
                                            sounds={
                                                sounds
                                            }
                                        >
                                            {option}
                                        </AnswerButton>
                                    )
                                )}
                            </QuizOptions>
                        </>
                    )}

                    {/* =================================================
                        ENDING QUIZ
                    ================================================= */}

                    {current.type ===
                        "quizEnding" && (
                        <>
                            <Question>
                                {current.sentenceBefore}

                                <span
                                    style={{
                                        textDecoration:
                                            "underline",
                                        marginLeft:
                                            "8px",
                                        marginRight:
                                            "8px",
                                    }}
                                >
                                    {selected === null
                                        ? "_"
                                        : current.correct}
                                </span>

                                {current.ending}
                            </Question>

                            <QuizOptions>
                                {current.options.map(
                                    (option) => (
                                        <AnswerButton
                                            key={option}
                                            index={option}
                                            correct={
                                                current.correct
                                            }
                                            selected={
                                                selected
                                            }
                                            setSelected={
                                                setSelected
                                            }
                                            sounds={
                                                sounds
                                            }
                                        >
                                            {`-${option}`}
                                        </AnswerButton>
                                    )
                                )}
                            </QuizOptions>
                        </>
                    )}

                    {/* =================================================
                        WORD QUIZ
                    ================================================= */}

                    {current.type ===
                        "quizWord" && (
                        <>
                            <Question>
                                {current.sentenceBefore}

                                <span
                                    style={{
                                        textDecoration:
                                            "underline",
                                        marginLeft:
                                            "8px",
                                        marginRight:
                                            "8px",
                                    }}
                                >
                                    {selected === null
                                        ? "_"
                                        : current.correct}
                                </span>

                                {current.ending}
                            </Question>

                            <QuizOptions>
                                {current.options.map(
                                    (option) => (
                                        <AnswerButton
                                            key={option}
                                            index={option}
                                            correct={
                                                current.correct
                                            }
                                            selected={
                                                selected
                                            }
                                            setSelected={
                                                setSelected
                                            }
                                            sounds={
                                                sounds
                                            }
                                        >
                                            {option}
                                        </AnswerButton>
                                    )
                                )}
                            </QuizOptions>
                        </>
                    )}

                </Content>
            </Wrapper>

            {/* =====================================================
                NAVIGATION
            ===================================================== */}

            {(current.type === "explanation" ||
                selected !== null) && (
                <ArrowDiv>

                    {step > 0 && (
                        <ArrowButton
                            onClick={Back}
                        >
                            {"<"}
                        </ArrowButton>
                    )}

                    <ArrowButton
                        onClick={Next}
                    >
                        {">"}
                    </ArrowButton>

                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Grammatica;