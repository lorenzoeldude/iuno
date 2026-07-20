import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

import useSoundEffects from "../../../hooks/useSoundEffects";


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

    const [questions, setQuestions] = useState([]);

    const [selected, setSelected] = useState(null);
    const [step, setStep] = useState(0);

    const navigate = useNavigate();

    const sounds = useSoundEffects();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/lessons/${id}/vocabulary`)
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch(console.error);
    }, [id]);

    function Next() {
        if (step < questions.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            navigate(`/lessons/${id}/grammatica`);
        }
    }

    const progress = questions.length > 1 ? (step / (questions.length - 1)) * 100 : 0;

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

    const correctAnswer = questions[step].answers.indexOf(questions[step].correct);

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
                        {questions[step].lemma}
                    </Verbum>

                    <Answers>
                        {questions[step].answers.map((answer, index) => (
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
                        ))}
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