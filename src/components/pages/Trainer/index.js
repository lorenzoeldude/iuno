import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

const Page = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    gap: 100px;
    align-items: center;
    padding-top: 80px;
    position: relative;
`;

const InfoPanel = styled.div`
    padding: 25px;
    min-width: 300px;

    opacity: ${(props) => (props.visible ? 1 : 0)};
    transform: ${(props) =>
        props.visible
            ? "translateX(0)"
            : "translateX(10px)"};

    transition:
        opacity 0.4s ease,
        transform 0.4s ease;
`;

const PanelTitle = styled.h6`
    margin-bottom: 12px;
`;

const Definition = styled.p`
    font-size: 25px;
    line-height: 1.5;
    margin-bottom: 30px;
`;

const Example = styled.p`
    line-height: 1.6;
    margin-bottom: 12px;
`;

const AnswerWrapper = styled.div`
    transition: opacity 0.3s ease;

    opacity: ${(props) =>
        props.fade ? 0.1 : 1};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Verbum = styled.p`
    font-size: 50px;
    text-decoration: underline;
    margin-bottom: 30px;
    cursor: ${(props) => (props.clickable ? "pointer" : "default")};

    color: ${(props) => {
        // if (props.state === 1) return "green";
        // if (props.state === 2) return "red";
        return "black";
    }};

    &:hover {
        opacity: ${(props) => (props.clickable ? 0.7 : 1)};
    }
`;

const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

function Trainer() {

    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const wrapperRef = useRef(null);

    const {
        popup,
        entry,
        lookupWord,
        closePopup,
    } = useDictionaryLookup();


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

            console.log("data: ", data);

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

        return <Wrapper />;

    }


    return (

        <Page ref={wrapperRef}>

            <Wrapper>

                <Verbum
                    clickable={selected !== null}

                    onClick={() => {

                        if (selected !== null) {

                            navigate(
                                `/dictionary/${question.lemma_normalized}`
                            );

                        }

                    }}

                    state={
                        selected !== null
                            ? selected === question.correct
                                ? 1
                                : 2
                            : 0
                    }
                >

                    {question.infinitive || question.lemma}

                </Verbum>


                {question.answers.map((answer, index) => (

                    <AnswerWrapper
                        key={index}
                        fade={
                            selected === question.correct &&
                            answer !== question.correct
                        }
                    >

                        <AnswerButton
                            index={answer}
                            correct={question.correct}
                            selected={selected}
                            setSelected={setSelected}
                        >
                            {answer}
                        </AnswerButton>

                    </AnswerWrapper>

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
            <InfoPanel visible={selected !== null}>

                {selected !== null && (

                    <>

                        <PanelTitle>
                            Definition
                        </PanelTitle>


                        <Definition>

                            <ClickableText
                                text={question.definition}
                                onWordClick={(word, e) =>
                                    lookupWord(
                                        word,
                                        e,
                                        wrapperRef,
                                    )
                                }
                            />

                        </Definition>


                        <PanelTitle>
                            Examples
                        </PanelTitle>


                        {question.examples?.slice(0, 3).map((example, index) => (

                            <Example key={index}>

                                {index + 1}.{" "}

                                <ClickableText
                                    text={example}
                                    onWordClick={(word, e) =>
                                        lookupWord(
                                            word,
                                            e,
                                            wrapperRef,
                                        )
                                    }
                                />

                            </Example>

                        ))}

                    </>

                )}

            </InfoPanel>

            <DictionaryPopup
                popup={popup}
                entry={entry}
                onClose={closePopup}
            />

        </Page>

    );
}

export default Trainer;