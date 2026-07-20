import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

import useSoundEffects from "../../../hooks/useSoundEffects";

import { API_URL } from "../../../config";


const Page = styled.div`
    width: min(90%, 1200px);

    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 80px;

    margin: 0 auto;
    padding: 40px 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: 94%;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        padding: 12px 0;
    }
`;

const InfoPanel = styled.div`
    width: 100%;
    max-width: 450px;

    padding: 25px;

    opacity: ${({ visible }) => (visible ? 1 : 0)};

    transform: ${({ visible }) =>
        visible
            ? "translateX(0)"
            : "translateX(10px)"};

    transition:
        opacity 0.4s ease,
        transform 0.4s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 100%;
        padding: 0;

        transform: none;

        max-height: ${({ visible }) =>
            visible ? "1000px" : "0"};

        overflow: hidden;

        transition:
            max-height 0.35s ease,
            opacity 0.35s ease;
    }
`;


const PanelTitle = styled.h6`
    margin-bottom: 12px;
    font-size: 18px;
`;


const Definition = styled.p`
    font-size: 25px;
    line-height: 1.5;
    margin-bottom: 30px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 21px;
    }
`;


const Example = styled.p`
    line-height: 1.6;
    margin-bottom: 12px;
    font-size: 25px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 21px;
    }
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

    flex-shrink: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: 100%;
        margin-right: 0;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-right: 60px;
    }
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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 40px;
        text-align: center;
    }
`;


const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-top: 10px;
    }
`;



function Trainer({ mode = "all", listId = null }) {


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

    const sounds = useSoundEffects();



    // =====================================================
    // FETCH QUESTION
    // =====================================================

    const fetchQuestion = useCallback(async () => {
        setLoading(true);
        setSelected(null);

        console.log("api_url: ", API_URL);

        try {
            let url;

            if (mode === "all") {

                url = `${API_URL}/api/trainer/random`;

            } else if (mode === "list") {

                url = `${API_URL}/api/trainer/list/random`;

            } else if (mode === "book") {

                url = `${API_URL}/api/trainer/book/random?list_id=${encodeURIComponent(listId)}`;

            } else if (mode === "lesson") {

                url = `${API_URL}/api/lessons/${listId}/trainer/random`;

            }
            
            const token = localStorage.getItem("token");
            const headers = {};

            if (mode === "list" && token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const res = await fetch(url, { headers });

            if (!res.ok) {
                throw new Error("Failed to fetch trainer question");
            }

            const data = await res.json();

            setQuestion(data);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }, [mode, listId]);



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

                            sounds={sounds}

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