import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NominalTable from "../../morphology/NominalTable";
import VerbTable from "../../morphology/VerbTable.js";

const Wrapper = styled.div`
    width: 72%;
    margin: 0 auto;
    padding: 40px 0 80px 0;
`;

const Header = styled.div`
    margin-bottom: 25px;
`;

const Word = styled.h1`
    font-family: "Montserrat", sans-serif;
    font-size: 64px;
    font-weight: 700;
    margin: 0;
`;

const Meaning = styled.p`
    font-size: 28px;
    opacity: 0.7;
    margin-top: 10px;
`;

const Meta = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const Tag = styled.div`
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 999px;
    padding: 8px 15px;
    font-size: 15px;
`;

const Line = styled.hr`
    border: none;
    height: 1px;
    background: rgba(0,0,0,0.08);
    margin: 40px 0;
`;

const Section = styled.section`
    margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 18px;
`;

const Definition = styled.p`
    font-size: 24px;
    line-height: 1.7;
`;

const Example = styled.p`
    font-size: 23px;
    line-height: 1.7;
    font-style: italic;
    margin: 10px 0;
`;

const Loading = styled.p`
    font-size: 28px;
`;

function Verbum() {

    const { word } = useParams();

    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/word/${word}`)
            .then((res) => {

                if (!res.ok) {
                    throw new Error("Word not found");
                }

                return res.json();
            })
            .then((data) => {

                setWordData(data);
                setLoading(false);
            })
            .catch((err) => {

                setError(err.message);
                setLoading(false);
            });

    }, [word]);

    if (loading) {

        return (
            <Wrapper>
                <Loading>Loading...</Loading>
            </Wrapper>
        );
    }

    if (error || !wordData) {

        return (
            <Wrapper>
                <Loading>
                    Error: {error || "Unknown error"}
                </Loading>
            </Wrapper>
        );
    }

    const wordInfo = wordData.word;

    function renderMorphology() {

        // =====================================================
        // VERBS
        // =====================================================

        if (wordInfo.type === "verb") {

            return (
                <VerbTable
                    forms={wordData.forms}
                />
            );
        }

        // =====================================================
        // NOMINAL SYSTEM
        // =====================================================

        if (
            wordInfo.type === "noun" ||
            wordInfo.type === "adjective" ||
            wordInfo.type === "pronoun"
        ) {

            return (
                <NominalTable
                    forms={wordData.forms}
                />
            );
        }

        // =====================================================
        // INDECLINABLES
        // =====================================================

        return (
            <Definition>
                This word has no inflectional morphology.
            </Definition>
        );
    }

    return (

        <Wrapper>

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Header>

                <Word>
                    {wordInfo.lemma_display || wordInfo.lemma}
                </Word>

                <Meaning>
                    {wordData.meanings?.map((m, index) => (
                        <span key={m.id}>
                            {m.english}
                            {index < wordData.meanings.length - 1 ? " · " : ""}
                        </span>
                    ))}
                </Meaning>

                <Meta>

                    <Tag>
                        {wordInfo.type}
                    </Tag>

                    {wordInfo.gender && (
                        <Tag>
                            {wordInfo.gender}
                        </Tag>
                    )}

                    {wordInfo.declension > 0 && (
                        <Tag>
                            {wordInfo.declension}. declension
                        </Tag>
                    )}

                    {wordInfo.conjugation > 0 && (
                        <Tag>
                            {wordInfo.conjugation}. conjugation
                        </Tag>
                    )}

                    {wordInfo.is_irregular && (
                        <Tag>
                            irregular
                        </Tag>
                    )}

                </Meta>

            </Header>

            <Line />

            {/* =====================================================
                DEFINITION
            ===================================================== */}

            <Section>

                <SectionTitle>
                    Definitio
                </SectionTitle>

                <Definition>
                    {wordInfo.definition}
                </Definition>

            </Section>

            {/* =====================================================
                EXAMPLES
            ===================================================== */}

            {wordData.examples?.length > 0 && (

                <Section>

                    <SectionTitle>
                        Exempla
                    </SectionTitle>

                    {wordData.examples.map((example) => (

                        <Example key={example.id}>
                            {example.latin}
                        </Example>
                    ))}

                </Section>
            )}

            {/* =====================================================
                MORPHOLOGY
            ===================================================== */}

            <Section>

                <SectionTitle>
                    Morphologia
                </SectionTitle>

                {renderMorphology()}

            </Section>

        </Wrapper>
    );
}

export default Verbum;