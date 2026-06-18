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

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-weight: 800;
    font-size: 30px;
`;

const Text = styled.div`
    font-family: "Cormorant Garamond", serif;
    font-size: 28px;
    line-height: 1.6;
    max-width: 750px;

    .verse {
        margin: 0;
        padding-left: 2em;
        text-indent: -2em;
    }

    .stanza {
        margin-bottom: 1.5em;
    }

    .stanza:first-child .verse:first-child::first-letter {
        color: red;
        font-size: 2em;
        font-weight: bold;
    }
`;

function Aeneis() {
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
            `http://localhost:8080/api/text/${author}/${title}/${position}`
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
            <Title>
                {section.text_title}
                {section.section_title && ` — ${section.section_title}`}
            </Title>

            <Text>
                {section.content
                    .trim()
                    .split("\n\n")
                    .map((stanza, i) => (
                        <div className="stanza" key={i}>
                            {stanza.split("\n").map((line, j) => (
                                <div className="verse" key={j}>
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
                                </div>
                            ))}
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

export default Aeneis;