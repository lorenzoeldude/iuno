import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
`;

const TextTitle = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 100;
    font-size: 25px;
    text-align: center;
`;

const SectionTitle = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: 45px;
    margin-bottom: 40px;
    text-align: center;
`;

const Text = styled.div`
    font-family: "Cormorant Garamond", serif;
    font-size: 25px;
    line-height: 1.5;
    max-width: 750px;

    .verse {
        margin: 0;
        // padding-left: 2em;
        // text-indent: -2em;
    }

    .verse.bold {
        font-weight: 800;
        font-size: 30px;
    }

    .stanza {
        margin-bottom: 1.5em;
    }

    // .stanza:first-child .verse:first-child::first-letter {
    //     color: red;
    //     font-size: 2em;
    //     font-weight: bold;
    // }
`;

function TextSection() {
    const wrapperRef = useRef(null);

    const { author, title, position } = useParams();

    const [section, setSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        popup,
        entry,
        lookupWord,
        closePopup,
    } = useDictionaryLookup();

    useEffect(() => {

        setLoading(true);
        setError(null);

        fetch(
            `http://localhost:8080/api/text-section/${author}/${title}/${position}`
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error("Text section not found");
                }

                return res.json();
            })
            .then(data => {
                setSection(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

    }, [author, title, position]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!section) {
        return null;
    }

    return (
        <Wrapper ref={wrapperRef}>
            <TextTitle>
                {section.text_title}
            </TextTitle>

            <SectionTitle>
                {section.section_title && `${section.section_title}`}
            </SectionTitle>

            <Text>
                {section.content
                    .trim()
                    .split("\n\n")
                    .map((stanza, i) => (
                        <div className="stanza" key={i}>
                            {stanza.split("\n").map((line, j) => {
                                const boldMatch = line.match(/^<b>(.*?)<\/b>$/);

                                return (
                                    <div
                                        className={`verse ${boldMatch ? "bold" : ""}`}
                                        key={j}
                                    >
                                        {boldMatch ? (
                                            <ClickableText
                                                text={boldMatch[1]}
                                                onWordClick={(word, e) =>
                                                    lookupWord(
                                                        word,
                                                        e,
                                                        wrapperRef,
                                                    )
                                                }
                                            />
                                        ) : (
                                            <ClickableText
                                                text={line}
                                                onWordClick={(word, e) =>
                                                    lookupWord(
                                                        word,
                                                        e,
                                                        wrapperRef,
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
            </Text>

            <DictionaryPopup
                popup={popup}
                entry={entry}
                onClose={closePopup}
            />
        </Wrapper>
    );
}

export default TextSection;