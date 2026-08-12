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
    max-width: 700px;

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

const Verbum = styled.p`
    font-size: clamp(40px, 6vw, 60px);
    text-decoration: underline;
    margin-bottom: 40px;
    text-align: center;

    color: ${(props) => {
        if (props.state === 1) return "green";
        if (props.state === 2) return "red";
        return props.theme.colors.text;
    }};
`;

const Answers = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ArrowDiv = styled.div`
    position: fixed;

    left: 50%;
    bottom: 30px;

    transform: translateX(-50%);
`;

function Vocabula() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [step, setStep] = useState(0);

    const sounds = useSoundEffects();

    // =====================================================
    // FETCH VOCABULARY QUESTIONS
    // =====================================================

    useEffect(() => {

        async function fetchVocabulary() {

            try {

                const response = await fetch(
                    `${API_URL}/api/lessons/${id}/vocabulary`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch vocabulary"
                    );
                }

                const data = await response.json();

                setQuestions(data);

            } catch (error) {

                console.error(
                    "Error loading vocabulary:",
                    error
                );

            }

        }

        fetchVocabulary();

    }, [id]);

    // =====================================================
    // COMPLETE VOCABULARY SECTION
    // =====================================================

    async function completeVocabulary() {

        const token = localStorage.getItem("token");

        if (!token) {
            console.warn(
                "No auth token. Vocabulary progress will not be saved."
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
                        section: "vocabulary",
                    }),
                }
            );

            if (!response.ok) {

                console.error(
                    "Failed to update vocabulary progress:",
                    response.status
                );

            }

        } catch (error) {

            console.error(
                "VOCABULARY PROGRESS ERROR:",
                error
            );

        }

    }

    // =====================================================
    // NEXT QUESTION
    // =====================================================

    async function Next() {

        if (step < questions.length - 1) {

            setStep(step + 1);
            setSelected(null);

            return;
        }

        // Last vocabulary question completed.

        await completeVocabulary();

        navigate(
            `/lessons/${id}/grammatica`
        );
    }

    // =====================================================
    // PROGRESS
    // =====================================================

    const progress =
        questions.length > 1
            ? (step / (questions.length - 1)) * 100
            : 0;

    // =====================================================
    // LOADING
    // =====================================================

    if (questions.length === 0) {

        return (
            <LessonLayout
                active="vocabula"
                completed={["textus"]}
                progress={0}
            >
                Loading...
            </LessonLayout>
        );

    }

    // =====================================================
    // CURRENT QUESTION
    // =====================================================

    const current = questions[step];

    const displayWord =
        current.infinitive ||
        current.lemma;

    const correctAnswer =
        current.answers.indexOf(
            current.correct
        );

    // =====================================================
    // RENDER
    // =====================================================

    return (

        <LessonLayout
            active="vocabula"
            completed={["textus"]}
            progress={progress}
        >

            <Wrapper>

                <Content>

                    <Verbum
                        state={
                            selected !== null
                                ? selected === correctAnswer
                                    ? 1
                                    : 2
                                : 0
                        }
                    >

                        {displayWord}

                    </Verbum>

                    <Answers>

                        {current.answers.map(
                            (answer, index) => (

                                <AnswerButton
                                    key={index}
                                    index={index}
                                    correct={correctAnswer}
                                    selected={selected}
                                    setSelected={setSelected}
                                    sounds={sounds}
                                >

                                    {answer}

                                </AnswerButton>

                            )
                        )}

                    </Answers>

                </Content>

            </Wrapper>

            {selected !== null && (

                <ArrowDiv>

                    <ArrowButton
                        onClick={Next}
                        state={
                            selected === correctAnswer
                                ? 1
                                : 2
                        }
                    >

                        {">"}

                    </ArrowButton>

                </ArrowDiv>

            )}

        </LessonLayout>

    );
}

export default Vocabula;