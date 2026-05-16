import styled from "styled-components";
import { useState, useEffect } from "react";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";

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

const Loading = styled.p`
    font-size: 30px;
`;

function Trainer() {

    const [question, setQuestion] = useState(null);

    const [selected, setSelected] = useState(null);

    const [loading, setLoading] = useState(true);

    // =====================================================
    // FETCH ONE QUESTION
    // =====================================================
    async function fetchQuestion() {

        setLoading(true);

        try {

            const res = await fetch(
                "http://localhost:8080/api/trainer/random"
            );

            const data = await res.json();

            setQuestion(data);

        } catch (err) {

            console.error(err);

        }

        setSelected(null);

        setLoading(false);
    }

    // =====================================================
    // INITIAL FETCH
    // =====================================================
    useEffect(() => {

        fetchQuestion();

    }, []);

    // =====================================================
    // LOADING
    // =====================================================
    if (loading || !question) {

        return (
            <Wrapper>
                <Loading>Loading...</Loading>
            </Wrapper>
        );
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
                >
                    {answer}
                </AnswerButton>

            ))}

            {selected !== null && (

                <ArrowDiv>

                    <ArrowButton
                        onClick={fetchQuestion}
                        state={
                            selected === question.correct
                                ? 1
                                : 2
                        }
                    >
                        {">"}
                    </ArrowButton>

                </ArrowDiv>

            )}

        </Wrapper>
    );
}

export default Trainer;