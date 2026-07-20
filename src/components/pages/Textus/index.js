import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowButton from "../../atoms/ArrowButton";
import LessonLayout from "../../layout/LessonLayout";
import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

const UnderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem 0 7rem;
`;

const TextDiv = styled.div`
    width: min(760px, 100%);
`;

const FirstText = styled.p`
    font-size: clamp(30px, 3vw, 50px);
    line-height: 1.7;
    text-align: left;
    margin: 0;
    white-space: pre-line;

    &::first-letter {
        color: red;
        font-size: 1.8em;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        font-size: clamp(24px, 6vw, 34px);
        line-height: 1.6;
    }
`;

const Text = styled.div`
    font-size: clamp(28px, 2.8vw, 44px);
    line-height: 1.7;
    text-align: left;
    white-space: pre-line;

    @media (max-width: 768px) {
        font-size: clamp(22px, 5.5vw, 32px);
        line-height: 1.6;
    }
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);

    display: flex;
    gap: 28px;

    z-index: 20;
`;

function Textus() {
    const { id } = useParams();
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const [sentences, setSentences] = useState([]);
    const [index, setIndex] = useState(0);

    const {
        popup,
        entry,
        lookupWord,
        closePopup,
    } = useDictionaryLookup();

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
                setSentences(lesson.text || []);
            } catch (err) {
                console.error("Error loading lesson:", err);
            }
        }

        fetchLesson();
    }, [id]);

    if (sentences.length === 0) {
        return (
            <LessonLayout
                active="textus"
                completed={[]}
                progress={0}
            >
                Loading...
            </LessonLayout>
        );
    }

    const nextSentence = () => {
        if (index < sentences.length - 1) {
            setIndex(index + 1);
        } else {
            navigate(`/lessons/${id}/vocabula`);
        }
    };

    const previousSentence = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const progress =
        sentences.length > 1
            ? (index / (sentences.length - 1)) * 100
            : 100;

    return (
        <LessonLayout
            active="textus"
            completed={[]}
            progress={progress}
        >
            <UnderWrapper ref={wrapperRef}>
                <ContentWrapper>
                    <TextDiv>
                        {index === 0 ? (
                            <FirstText>
                                <ClickableText
                                    text={sentences[index].text}
                                    onWordClick={(word, e) =>
                                        lookupWord(word, e, wrapperRef)
                                    }
                                />
                            </FirstText>
                        ) : (
                            <Text>
                                <ClickableText
                                    text={sentences[index].text}
                                    onWordClick={(word, e) =>
                                        lookupWord(word, e, wrapperRef)
                                    }
                                />
                            </Text>
                        )}

                        <DictionaryPopup
                            popup={popup}
                            entry={entry}
                            onClose={closePopup}
                        />
                    </TextDiv>
                </ContentWrapper>
            </UnderWrapper>

            <ArrowDiv>
                <ArrowButton onClick={previousSentence}>
                    {"<"}
                </ArrowButton>

                <ArrowButton onClick={nextSentence}>
                    {">"}
                </ArrowButton>
            </ArrowDiv>
        </LessonLayout>
    );
}

export default Textus;