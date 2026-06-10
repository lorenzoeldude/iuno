import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";

import NominalTable from "../../morphology/NominalTable";
import VerbTable from "../../morphology/VerbTable.js";
import AdjectiveTable from "../../morphology/AdjectiveTable/index.js";

// ===================== styles =====================

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 85%;
    margin: 0 auto;
    padding-top: 0px;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
`;

const FirstLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px;
`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Headline = styled.p`

`;

const Main = styled.div``;

const Sidebar = styled.div`
    position: sticky;
    top: 20px;
`;

const Header = styled.div`
    margin-bottom: 25px;
`;

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
`;

const WordHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px;
    // padding-bottom: 30px;
`;

// const WordRow = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 15px;
// `;

const BigWord = styled.span`
    font-family: "Montserrat", sans-serif;
    font-size: 55px;
    font-weight: 700;
    margin: 0;
    text-decoration: underline;
`;

const Word = styled.h1`
    font-family: "Montserrat", sans-serif;
    font-size: 64px;
    font-weight: 700;
    margin: 0;
`;

const SaveButton = styled.button`
    font-size: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

const Meaning = styled.p`
    background-color: rgb(255, 205, 205);
    padding: 4px 6px;
    border-radius: 0px;
    font-size: 20px;
    margin-top: 10px;
    // line-height: 1.6;
`;

const Meta = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
`;

const Tag = styled.div`
    border: 0.5px solid rgba(0,0,0,0.1);
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 15px;
`;

const Line = styled.hr`
    border: none;
    height: 1px;
    background: rgba(0,0,0,0.08);
    margin: 30px 0;
`;

const Section = styled.section`
    margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 10px;
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

// ===================== component =====================

function Verbum() {

    const { word } = useParams();

    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("wordData: ", wordData);

    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const [token] = useState(() => localStorage.getItem("token"));
    const isAuthed = !!token;

    // =====================================================
    // FETCH WORD DATA
    // =====================================================
    useEffect(() => {

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/word/${word}`)
            .then(res => {
                if (!res.ok) throw new Error("Word not found");
                return res.json();
            })
            .then(data => {
                setWordData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

    }, [word]);

    // =====================================================
    // CHECK SAVED STATE
    // =====================================================
    useEffect(() => {

        if (!isAuthed || !wordData?.lemma?.id) return;

        const lemmaId = wordData.lemma.id;

        fetch(`http://localhost:8080/api/word-lists/lemma/${lemmaId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("check failed");
                return res.json();
            })
            .then(data => {
                setSaved(!!data.saved);
            })
            .catch(console.error);

    }, [isAuthed, token, wordData?.lemma?.id]);

    // =====================================================
    // TOGGLE SAVE / UNSAVE
    // =====================================================
    async function toggleList(lemmaId) {

        if (!token || saving) return;

        setSaving(true);

        try {

            if (!saved) {

                const res = await fetch(
                    "http://localhost:8080/api/word-lists/add-lemma",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ lemma_id: lemmaId }),
                    }
                );

                if (!res.ok) throw new Error("add failed");

                setSaved(true);

            } else {

                const res = await fetch(
                    `http://localhost:8080/api/word-lists/lemma/${lemmaId}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("delete failed");

                setSaved(false);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    // =====================================================
    // LOADING
    // =====================================================
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
                <Loading>Error: {error || "Unknown error"}</Loading>
            </Wrapper>
        );
    }

    const wordInfo = wordData.lemma;

    // =====================================================
    // MORPHOLOGY
    // =====================================================
    function renderMorphology() {

        if (wordInfo.part_of_speech === "verb") {
            return <VerbTable forms={wordData.forms} />;
        }

        if (
            wordInfo.part_of_speech === "noun" ||
            wordInfo.part_of_speech === "pronoun"
        ) {
            return <NominalTable forms={wordData.forms} />;
        }

        if (wordInfo.part_of_speech === "adjective") {
            return <AdjectiveTable forms={wordData.forms} />;
        }

        return (
            <Definition>
                This word has no inflectional morphology.
            </Definition>
        );
    }

    return (
        <Wrapper>
            <HeaderDiv>
                <FirstLine>
                    <WordHeader>
                        {wordInfo.part_of_speech === "verb" && (
                            <Headline>
                                {wordInfo.lemma}, <BigWord>{wordInfo.infinitive}</BigWord>, {wordInfo.perfect}, {wordInfo.supine}
                            </Headline>
                        )}

                        {wordInfo.part_of_speech === "adjective" && (
                            <Headline>
                                <BigWord>{wordInfo.lemma}</BigWord>, {wordInfo.feminine}, {wordInfo.neuter}
                            </Headline>
                        )}

                        {wordInfo.part_of_speech === "noun" && (
                            <Headline>
                                <BigWord>{wordInfo.lemma}</BigWord>, {wordInfo.genitive}
                            </Headline>
                        )}
                    </WordHeader>

                    <SaveButton
                        disabled={!isAuthed || saving}
                        onClick={() => toggleList(wordInfo.id)}
                    >
                        {saved ? <FaCheckCircle/> : <>+</>}
                    </SaveButton>

                </FirstLine>
                <Meaning>
                            {wordData.meanings?.map((m, index) => (
                                <span key={m.id}>
                                    {m.meaning}
                                    {index < wordData.meanings.length - 1 ? " · " : ""}
                                </span>
                            ))}
                        </Meaning>
                <Meta>
                    <Tag>{wordInfo.part_of_speech}</Tag>

                    {wordInfo.gender && <Tag>{wordInfo.gender}</Tag>}
                    {wordInfo.declension > 0 && (
                        <Tag>
                            {/* {wordInfo.declension >= 31 && wordInfo.declension <= 33
                                ? "3rd declension"
                                : `1st/2nd declension`} */}
                            {(wordInfo.declension === 1) || (wordInfo.declension === 2) && (
                                "1st/2nd declension"
                            )}

                            {[1, 2].includes(wordInfo.declension) && "1st/2nd declension"}

                            {[3, 31].includes(wordInfo.declension) && "3rd declension"}

                            {wordInfo.declension === 4 && (
                                "4th declension"
                            )}
                            {wordInfo.declension === 5 && (
                                "5th declension"
                            )}
                        </Tag>
                    )}
                    {wordInfo.conjugation > 0 && (
                        <Tag>{wordInfo.conjugation}. conjugation</Tag>
                    )}
                    {/* {wordInfo.is_irregular ? (
                        <Tag>irregular</Tag>
                    ) : (
                        <Tag>regular</Tag>
                    )} */}
                </Meta>
            </HeaderDiv>


            <Line />
            
            {/* <WordRow> */}
            {/* </WordRow> */}

            <Content>
                

                <Main>

                    <Header>
                        <TopRow>

                            <Left>
                                {/* <Meaning>
                                    {wordData.meanings?.map((m, index) => (
                                        <span key={m.id}>
                                            {m.meaning}
                                            {index < wordData.meanings.length - 1 ? " · " : ""}
                                        </span>
                                    ))}
                                </Meaning> */}

                        

                            </Left>

                        </TopRow>
                    </Header>

                    {/* <Line /> */}
                    <Section>
                        {/* <SectionTitle>Translations</SectionTitle>
                        <Meaning>
                            {wordData.meanings?.map((m, index) => (
                                <span key={m.id}>
                                    {m.meaning}
                                    {index < wordData.meanings.length - 1 ? " · " : ""}
                                </span>
                            ))}
                        </Meaning> */}
                    </Section>

                    <Section>
                        <SectionTitle>Definition</SectionTitle>
                        <Definition>
                            {wordData.definitions?.[0]?.definition || ""}
                        </Definition>
                    </Section>

                    {wordData.examples?.length > 0 && (
                        <Section>
                            <SectionTitle>Examples</SectionTitle>
                            {wordData.examples.map((example) => (
                                <Example key={example.id}>
                                    - {example.latin}
                                </Example>
                            ))}
                        </Section>
                    )}

                    {wordData.derivatives?.length > 0 && (
                        <Section>
                            <SectionTitle>English Derivatives</SectionTitle>
                            {wordData.derivatives.map((derivative, index) => (
                                <span key={derivative.id}>
                                    {derivative.derivative}
                                    {index < wordData.derivatives.length - 1 ? " · " : ""}
                                </span>
                            ))}
                        </Section>
                    )}

                </Main>

                <Sidebar>

                    <Section>
                        {/* <SectionTitle>Morphologia</SectionTitle> */}
                        {renderMorphology()}
                    </Section>

                </Sidebar>

            </Content>

        </Wrapper>
    );
}

export default Verbum;