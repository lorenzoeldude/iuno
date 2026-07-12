import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";

import useSoundEffects from "../../../hooks/useSoundEffects";


import { API_URL } from "../../../config";

const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
`;

const Verbum = styled.p`
    font-size: 50px;
    text-decoration: underline;
    margin-bottom: 30px;

    color: ${(props) => {
        if (props.state === 1) return "green";
        if (props.state === 2) return "red";
        return "black";
    }};
`;

const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

function ListTrainer() {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    const sounds = useSoundEffects();

    // =====================================================
    // FETCH QUESTION (FROM USER LIST)
    // =====================================================
    const fetchQuestion = useCallback(async () => {
        const token = localStorage.getItem("token");

        setLoading(true);
        setSelected(null);

        try {
            const res = await fetch(
                `${API_URL}/api/trainer/list/random`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch list trainer question");
            }

            const data = await res.json();

            setQuestion(data);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }, []);

    // =====================================================
    // INITIAL LOAD
    // =====================================================
    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    // =====================================================
    // LOADING
    // =====================================================
    if (loading || !question) {
        return <Wrapper />;
    }

    return (
        <Wrapper>
            <Verbum
                state={
                    selected !== null
                        ? selected === question.correct
                            ? 1
                            : 2
                        : 0
                }
            >
                {question.lemma}
            </Verbum>

            {question.answers.map((answer, index) => (
                <AnswerButton
                    key={index}
                    index={answer}
                    correct={question.correct}
                    selected={selected}
                    setSelected={setSelected}
                    sounds={sounds}
                >
                    {answer}
                </AnswerButton>
            ))}

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton
                        onClick={fetchQuestion}
                        state={selected === question.correct ? 1 : 2}
                    >
                        {">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </Wrapper>
    );
}

export default ListTrainer;