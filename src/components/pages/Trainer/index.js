import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

import { API_URL } from "../../../config";


const Page = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 80px;
    position: relative;
`;


const InfoPanel = styled.div`
    padding: 25px;

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
    margin-right: 100px;
`;


const Verbum = styled.p`
    font-size: 50px;
    text-decoration: underline;
    margin-bottom: 30px;

    cursor: ${(props) =>
        props.clickable ? "pointer" : "default"};

    &:hover {
        opacity: ${(props) =>
            props.clickable ? 0.7 : 1};
    }
`;


const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;



function Trainer({ mode = "all" }) {


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
    // FETCH QUESTION
    // =====================================================

    const fetchQuestion = useCallback(async () => {
        setLoading(true);
        setSelected(null);

        console.log("api_url: ", API_URL);

        try {
            const url =
                mode === "list"
                    ? `${API_URL}/api/trainer/list/random`
                    : `${API_URL}/api/trainer/random`;

            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch trainer question");
            }

            const data = await res.json();

            setQuestion(data);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }, [mode]);



    // =====================================================
    // RELOAD WHEN MODE CHANGES
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
                                        wrapperRef
                                    )
                                }

                            />


                        </Definition>




                        <PanelTitle>
                            Examples
                        </PanelTitle>




                        {question.examples?.slice(0, 3).map(
                            (example, index) => (


                                <Example key={index}>


                                    {index + 1}.{" "}



                                    <ClickableText

                                        text={example}

                                        onWordClick={(word, e) =>
                                            lookupWord(
                                                word,
                                                e,
                                                wrapperRef
                                            )
                                        }

                                    />


                                </Example>


                            )
                        )}



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