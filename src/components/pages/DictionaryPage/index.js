import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config.js";

import ClickableText from "../../atoms/ClickableText/index.js";
import DictionaryPopup from "../../atoms/DictionaryPopup/index.js";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups.js";

import NominalTable from "../../morphology/NominalTable/index.js";
import VerbTable from "../../morphology/VerbTable.js/index.js";
import AdjectiveTable from "../../morphology/AdjectiveTable/index.js";
import PronounTable from "../../morphology/PronounTable/index.js";
import LoginRequiredPopup from "../../atoms/LoginRequiredPopup/index.js";


const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: min(85%, 1400px);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 94%;
    }
    margin: 0 auto;
    padding-top: 0px;
    position: relative;
`;

const EditButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.opposite};
    font-size: 16px;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: 50px;
    }
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
    margin: 0;
    text-align: center;
    line-height: 1.4;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 18px;
    }
`;

const Main = styled.div`
`;

const Sidebar = styled.div`
    position: sticky;
    top: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        position: static;
    }
`;

const WordHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px;
`;

const BigWord = styled.span`
    font-family: "Montserrat", sans-serif;
    font-size: 55px;
    font-weight: 700;
    margin: 0;
    text-decoration: underline;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 38px;
    }
`;

const SaveButton = styled.button`
    font-size: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
        opacity: 1;
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

const Meaning = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const MeaningItem = styled.span`
    background: rgb(255, 205, 205);
    font-size: 20px;
    padding: 4px 8px;
    color: black;
`;

const Meta = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
`;

const Tag = styled.div`
    border: 0.5px solid rgba(0,0,0,0.1);
    border: 0.5px solid ${({ theme }) => theme.colors.textSecondary};
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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 24px;
    }
`;

const Definition = styled.p`
    font-size: 24px;
    line-height: 1.7;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 20px;
    }
`;

const Example = styled.p`
    font-size: 23px;
    line-height: 1.7;
    font-style: italic;
    margin-bottom: 10px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 19px;
    }
`;

const Loading = styled.p`
    font-size: 28px;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;
`;

// ===================== component =====================

function DictionaryPage() {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    const {
        popup,
        entry,
        lookupWord,
        closePopup,
    } = useDictionaryLookup();

    const { word } = useParams();
    const [searchParams] = useSearchParams();

    const highlightedForm = searchParams.get("form");

    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("wordData: ", wordData);

    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const [token] = useState(() => localStorage.getItem("token"));
    const isAuthed = !!token;

    const [isAdmin, setIsAdmin] = useState(false);

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    
    useEffect(() => {

        if (!token) return;

        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            setIsAdmin(payload.is_admin === true);

        } catch (err) {
            console.error("Invalid JWT");
        }

    }, [token]);

    // =====================================================
    // FETCH WORD DATA
    // =====================================================
    useEffect(() => {

        setLoading(true);
        setError(null);

        fetch(`${API_URL}/api/word/${word}`)
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

        fetch(`${API_URL}/api/word-lists/lemma/${lemmaId}`, {
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
                    `${API_URL}/api/word-lists/add-lemma`,
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
                    `${API_URL}/api/word-lists/lemma/${lemmaId}`,
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
            return <VerbTable forms={wordData.forms} highlightedForm={highlightedForm}/>;
        }

        if (
            wordInfo.part_of_speech === "noun"
        ) {
            return <NominalTable forms={wordData.forms} highlightedForm={highlightedForm}/>;
        }

        if (wordInfo.part_of_speech === "adjective") {
            return <AdjectiveTable forms={wordData.forms} highlightedForm={highlightedForm}/>;
        }

        if (wordInfo.part_of_speech === "pronoun") {
            return <PronounTable forms={wordData.forms} highlightedForm={highlightedForm}/>;
        }

        return (
            <Definition>
                This word has no inflectional morphology.
            </Definition>
        );
    }

    return (
        <Wrapper ref={wrapperRef}>
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

                        {(wordInfo.part_of_speech === "pronoun" || wordInfo.part_of_speech === "preposition" || wordInfo.part_of_speech === "conjunction" || wordInfo.part_of_speech === "adverb") && (
                            <Headline>
                                <BigWord>{wordInfo.lemma}</BigWord>
                            </Headline>
                        )}
                        
                    </WordHeader>

                    <SaveButton
                        disabled={saving}
                        onClick={() => {
                            if (!isAuthed) {
                                setShowLoginPopup(true);
                                return;
                            }

                            toggleList(wordInfo.id);
                        }}
                    >
                        {saved ? <FaCheckCircle /> : "+"}
                    </SaveButton>

                    {isAdmin && (
                        <EditButton
                            onClick={() =>
                                navigate(`/admin/editor/${wordInfo.id}`)
                            }
                        >
                            Edit
                        </EditButton>
                    )}

                </FirstLine>
                <Meaning>
                    {wordData.meanings?.map((m, index) => (
                        <>
                            <MeaningItem key={m.id}>
                                {m.governs_case ? `+${m.governs_case}: ` : ""}
                                {m.meaning}
                            </MeaningItem>
                            {index < wordData.meanings.length - 1 ? " · " : ""}
                        </>
                    ))}
                </Meaning>
                <Meta>
                    <Tag>{wordInfo.part_of_speech}</Tag>

                    {wordInfo.gender && <Tag>{wordInfo.gender}</Tag>}
                    {wordInfo.declension > 0 && (
                        <Tag>
                            {[1, 2, 12].includes(wordInfo.declension) && "1st/2nd declension"}

                            {[3, 31, 32, 33].includes(wordInfo.declension) && "3rd declension"}

                            {wordInfo.declension === 4 && "4th declension"}

                            {wordInfo.declension === 5 && "5th declension"}
                        </Tag>
                    )}
                    {wordInfo.conjugation > 0 && (
                        <Tag>{wordInfo.conjugation}. conjugation</Tag>
                    )}
                </Meta>
            </HeaderDiv>


            <Line />
            <Content>
                <Main>
                    <Section>
                        <SectionTitle>Definition</SectionTitle>
                        <Definition>
                            <ClickableText
                                text={wordData.definitions?.[0]?.definition || ""}
                                onWordClick={(word, e) =>
                                    lookupWord(
                                        word,
                                        e,
                                        wrapperRef,
                                    )
                                }
                            />
                        </Definition>
                    </Section>

                    {wordData.examples?.length > 0 && (
                        <Section>
                            <SectionTitle>Examples</SectionTitle>
                            {wordData.examples.map((example) => (
                                <Example key={example.id}>
                                    -{" "}
                                    <ClickableText
                                        text={example.latin}
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
                        {renderMorphology()}
                    </Section>
                </Sidebar>
            </Content>
            <DictionaryPopup
                popup={popup}
                entry={entry}
                onClose={closePopup}
            />
            {showLoginPopup && (
                <Overlay onClick={() => setShowLoginPopup(false)}>
                    <LoginRequiredPopup
                        open={showLoginPopup}
                        onClose={() => setShowLoginPopup(false)}
                        title="Login Required"
                        message="Log in to create a word list and add this word."
                    />
                </Overlay>
            )}
        </Wrapper>
    );
}

export default DictionaryPage;