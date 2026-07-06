import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";

const Wrapper = styled.div`
    // width: 100%;
    background-color: rgba(178, 178, 178, 0.1);
    padding: 10px;
`;

const SwitchRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

const SwitchButton = styled.button`
    border: none;
    padding: 10px 16px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 13px;

    background: ${({ active }) =>
        active ? "black" : "rgba(0,0,0,0.08)"};

    color: ${({ active }) =>
        active ? "white" : "black"};
`;

const GerundRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 6px 0;
`;

const CaseLabel = styled.div`
    width: 100px;
    font-size: 15px;
    font-weight: 600;
`;

const CaseForm = styled.div`
    font-size: 20px;

    &.highlight {
        background-color: rgba(255, 215, 0, 0.4);
        font-weight: bold;
        border-radius: 5px;
        padding: 2px 6px;
    }
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const GridRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const InfinitiveGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 0px;
`;

const Line =styled.hr`
    border: none;
    height: 0.5px;
    background-color: black;
    opacity: 10%;
    margin: 10px 0;
`;

const GerundiveTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const GerundiveTH = styled.th`
    text-align: left;
    padding: 8px 14px;
    font-size: 15px;
    font-weight: 600;
`;

const GerundiveTD = styled.td`
    padding: 8px 14px;
    font-size: 20px;
`;

const InfinitiveBlock = styled.div``;

const TenseBlock = styled.div``;

const SectionTitle = styled.h3`
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const FormList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const FormRow = styled.div`
    font-size: 20px;
    padding: 4px 8px;
    border-radius: 5px;

    &.highlight {
        background-color: ${({ theme }) => theme.colors.highlight};
        font-weight: bold;
    }
`;

const TENSES = [
    "present",
    "imperfect",
    "future",
    "perfect",
    "pluperfect",
    "future perfect",
];

const PERSON_ORDER = [
    { number: "singular", person: 1 },
    { number: "singular", person: 2 },
    { number: "singular", person: 3 },
    { number: "plural", person: 1 },
    { number: "plural", person: 2 },
    { number: "plural", person: 3 },
];

const CASE_ORDER = [
    "nominative",
    "genitive",
    "dative",
    "accusative",
    "ablative",
    "vocative",
];

const CASE_LABELS = {
    nominative: "Nom.",
    genitive: "Gen.",
    dative: "Dat.",
    accusative: "Acc.",
    ablative: "Abl.",
    vocative: "Voc.",
};

function VerbTable({ forms, highlightedForm }) {

    const [voice, setVoice] = useState("active");
    const [mood, setMood] = useState("indicative");
    const [participle, setParticiple] = useState("ppp");

    function normalizeLatin(word) {
        return word
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function isHighlighted(form) {
        return (
            highlightedForm &&
            normalizeLatin(form) === normalizeLatin(highlightedForm)
        );
    }

    const highlightedData = useMemo(() => {
        return forms.find(
            f =>
                normalizeLatin(f.form) === normalizeLatin(highlightedForm)
        );
    }, [forms, highlightedForm]);

    useEffect(() => {

        if (!highlightedData) return;

        // infinitives
        if (highlightedData.mood === "infinitive") {
            setVoice(highlightedData.voice);
            setMood("indicative"); // keep Indicative selected
            return;
        }

        // normal finite verbs
        if (
            highlightedData.voice &&
            highlightedData.mood &&
            highlightedData.tense
        ) {
            setVoice(highlightedData.voice);
            setMood(highlightedData.mood);
        }

        // participles
        if (highlightedData.mood === "participle") {
            setVoice("participle");

            if (
                highlightedData.tense === "perfect" &&
                highlightedData.voice === "passive"
            ) {
                setParticiple("ppp");
            }

            if (
                highlightedData.tense === "present" &&
                highlightedData.voice === "active"
            ) {
                setParticiple("pap");
            }

            if (
                highlightedData.tense === "future" &&
                highlightedData.voice === "active"
            ) {
                setParticiple("fap");
            }
        }

    }, [highlightedData]);

    // =====================================================
    // FINITE FORMS
    // =====================================================
    const finiteForms = useMemo(() => {
        return forms.filter((form) => {
            return (
                form.tense &&
                form.mood === mood &&
                form.voice === voice &&
                !form.non_finite
            );
        });
    }, [forms, mood, voice]);

    function getGerundive(
        grammaticalCase,
        number,
        gender
    ) {
        return (
            gerundives.find(
                (f) =>
                    f.grammatical_case === grammaticalCase &&
                    f.number === number &&
                    f.gender === gender
            )?.form || "—"
        );
    }

    function getParticiple(
        grammaticalCase,
        number,
        gender
    ) {
        return (
            participles.find(
                (f) =>
                    f.grammatical_case === grammaticalCase &&
                    f.number === number &&
                    f.gender === gender
            )?.form || "—"
        );
    }

    function getFormsForTense(tense) {
        return finiteForms.filter((form) => form.tense === tense);
    }

    function renderTenseBlock(tense) {
        const formsForTense = getFormsForTense(tense);

        if (!formsForTense.length) return null;

        return (
            <TenseBlock>
                <SectionTitle>
                    {tense.charAt(0).toUpperCase() + tense.slice(1)}
                </SectionTitle>

                <FormList>
                    {PERSON_ORDER.map((p) => {
                        const form = formsForTense.find(
                            (f) =>
                                f.person === p.person &&
                                f.number === p.number
                        );

                        return (
                            <FormRow
                                key={`${p.person}-${p.number}`}
                                className={
                                    normalizeLatin(form?.form) === normalizeLatin(highlightedForm)
                                        ? "highlight"
                                        : ""
                                }
                            >
                                {form?.form || "—"}
                            </FormRow>
                        );
                    })}
                </FormList>
            </TenseBlock>
        );
    }

    const tenseRows = [];
    for (let i = 0; i < TENSES.length; i += 3) {
        tenseRows.push(TENSES.slice(i, i + 3));
    }

    const infinitives = useMemo(() => {
        return forms.filter(
            (form) =>
                form.mood === "infinitive" &&
                form.voice === voice
        );
    }, [forms, voice]);

    const gerunds = useMemo(() => {
        return forms.filter(
            (form) => form.mood === "gerund"
        );
    }, [forms]);

    const gerundives = useMemo(() => {
        return forms.filter(
            (form) => form.mood === "gerundive"
        );
    }, [forms]);

    const participles = useMemo(() => {
        let tense;
        let voice;

        switch (participle) {
            case "pap":
                tense = "present";
                voice = "active";
                break;

            case "ppp":
                tense = "perfect";
                voice = "passive";
                break;

            case "fap":
                tense = "future";
                voice = "active";
                break;

            default:
                return [];
        }

        return forms.filter(
            (f) =>
                f.mood === "participle" &&
                f.tense === tense &&
                f.voice === voice
        );
    }, [forms, participle]);

    // GERUNDS
    const genitiveGerund =
        gerunds.find(f => f.grammatical_case === "genitive")?.form;

    const dativeGerund =
        gerunds.find(f => f.grammatical_case === "dative")?.form;

    const accusativeGerund =
        gerunds.find(f => f.grammatical_case === "accusative")?.form;

    const ablativeGerund =
        gerunds.find(f => f.grammatical_case === "ablative")?.form;


    // INFINITIVES
    const presentInfinitive =
        infinitives.find(f => f.tense === "present")?.form;

    const perfectInfinitive =
        infinitives.find(f => f.tense === "perfect")?.form;

    const futureInfinitive =
        infinitives.find(f => f.tense === "future")?.form;


    // PARTICIPLES
    // const presentActiveParticiple =
    //     participles.find(
    //         f => f.tense === "present" && f.voice === "active"
    //     )?.form;

    // const perfectPassiveParticiple =
    //     participles.find(
    //         f => f.tense === "perfect" && f.voice === "passive"
    //     )?.form;

    // const futureActiveParticiple =
    //     participles.find(
    //         f => f.tense === "future" && f.voice === "active"
    //     )?.form;

    return (
        <Wrapper>

            {/* MODE */}
            <SwitchRow>
                <SwitchButton
                    active={voice === "active"}
                    onClick={() => setVoice("active")}
                >
                    Active
                </SwitchButton>

                <SwitchButton
                    active={voice === "passive"}
                    onClick={() => setVoice("passive")}
                >
                    Passive
                </SwitchButton>

                <SwitchButton
                    active={voice === "gerund"}
                    onClick={() => setVoice("gerund")}
                >
                    Gerund
                </SwitchButton>

                <SwitchButton
                    active={voice === "gerundive"}
                    onClick={() => setVoice("gerundive")}
                >
                    Gerundive
                </SwitchButton>

                <SwitchButton
                    active={voice === "participle"}
                    onClick={() => setVoice("participle")}
                >
                    Participle
                </SwitchButton>
            </SwitchRow>

            {/* MOOD */}
            {voice !== "gerund" && voice !== "gerundive" && voice !== "participle" && (
                <SwitchRow>
                    <SwitchButton
                        active={mood === "indicative"}
                        onClick={() => setMood("indicative")}
                    >
                        Indicative
                    </SwitchButton>

                    <SwitchButton
                        active={mood === "subjunctive"}
                        onClick={() => setMood("subjunctive")}
                    >
                        Subjunctive
                    </SwitchButton>

                    <SwitchButton
                        active={mood === "imperative"}
                        onClick={() => setMood("imperative")}
                    >
                        Imperative
                    </SwitchButton>
                </SwitchRow>
            )}

            {voice === "participle" && (
                <SwitchRow>
                    <SwitchButton
                        active={participle === "ppp"}
                        onClick={() => setParticiple("ppp")}
                    >
                        PPP
                    </SwitchButton>

                    <SwitchButton
                        active={participle === "pap"}
                        onClick={() => setParticiple("pap")}
                    >
                        PAP
                    </SwitchButton>

                    <SwitchButton
                        active={participle === "fap"}
                        onClick={() => setParticiple("fap")}
                    >
                        FAP
                    </SwitchButton>
                </SwitchRow>
            )}

            {/* GRID */}
            {voice === "gerund" ? (

                <InfinitiveGrid>

                    <div>
                        <GerundRow>
                            <CaseLabel>Genitive</CaseLabel>
                            <CaseForm
                                className={isHighlighted(genitiveGerund) ? "highlight" : ""}
                            >
                                {genitiveGerund || "—"}
                            </CaseForm>
                        </GerundRow>

                        <GerundRow>
                            <CaseLabel>Dative</CaseLabel>
                            <CaseForm
                                className={isHighlighted(dativeGerund) ? "highlight" : ""}
                            >
                                {dativeGerund || "—"}
                            </CaseForm>
                        </GerundRow>

                        <GerundRow>
                            <CaseLabel>Accusative</CaseLabel>
                            <CaseForm
                                className={isHighlighted(accusativeGerund) ? "highlight" : ""}
                            >
                                {accusativeGerund || "—"}
                            </CaseForm>
                        </GerundRow>

                        <GerundRow>
                            <CaseLabel>Ablative</CaseLabel>
                            <CaseForm
                                className={isHighlighted(ablativeGerund) ? "highlight" : ""}
                            >
                                {ablativeGerund || "—"}
                            </CaseForm>
                        </GerundRow>
                    </div>

                </InfinitiveGrid>

            ) : (

                <>
                    <Grid>
                        {tenseRows.map((row, idx) => (
                            <GridRow key={idx}>
                                {row.map((tense) => renderTenseBlock(tense))}
                            </GridRow>
                        ))}
                    </Grid>

                    {/* infinitives */}
                </>

            )}
            
            {voice === "gerundive" && (

                <GerundiveTable>
                    <thead>
                        <tr>
                            <GerundiveTH></GerundiveTH>
                            <GerundiveTH></GerundiveTH>
                            <GerundiveTH>Masc.</GerundiveTH>
                            <GerundiveTH>Fem.</GerundiveTH>
                            <GerundiveTH>Neut.</GerundiveTH>
                        </tr>
                    </thead>

                    <tbody>

                        {/* SINGULAR */}
                        {CASE_ORDER.map((caseName, index) => (
                            <tr key={`sing-${caseName}`}>

                                {index === 0 && (
                                    <GerundiveTD rowSpan={CASE_ORDER.length}>
                                        Sing.
                                    </GerundiveTD>
                                )}

                                <GerundiveTD>{CASE_LABELS[caseName]}</GerundiveTD>

                                <GerundiveTD>
                                    {getGerundive(
                                        caseName,
                                        "singular",
                                        "masculine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getGerundive(
                                        caseName,
                                        "singular",
                                        "feminine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getGerundive(
                                        caseName,
                                        "singular",
                                        "neuter"
                                    )}
                                </GerundiveTD>

                            </tr>
                        ))}

                        {/* PLURAL */}
                        {CASE_ORDER.map((caseName, index) => (
                            <tr key={`plur-${caseName}`}>

                                {index === 0 && (
                                    <GerundiveTD rowSpan={CASE_ORDER.length}>
                                        Plur.
                                    </GerundiveTD>
                                )}

                                <GerundiveTD>{CASE_LABELS[caseName]}</GerundiveTD>

                                <GerundiveTD>
                                    {getGerundive(
                                        caseName,
                                        "plural",
                                        "masculine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getGerundive(
                                        caseName,
                                        "plural",
                                        "feminine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getGerundive(
                                        caseName,
                                        "plural",
                                        "neuter"
                                    )}
                                </GerundiveTD>

                            </tr>
                        ))}

                    </tbody>
                </GerundiveTable>

            )}

            {voice === "participle" && (

    <GerundiveTable>
        <thead>
            <tr>
                <GerundiveTH></GerundiveTH>
                <GerundiveTH></GerundiveTH>
                <GerundiveTH>Masc.</GerundiveTH>
                <GerundiveTH>Fem.</GerundiveTH>
                <GerundiveTH>Neut.</GerundiveTH>
            </tr>
        </thead>

        <tbody>

            {/* SINGULAR */}
            {CASE_ORDER.map((caseName, index) => (
                            <tr key={`sing-${caseName}`}>

                                {index === 0 && (
                                    <GerundiveTD rowSpan={CASE_ORDER.length}>
                                        Sing.
                                    </GerundiveTD>
                                )}

                                <GerundiveTD>
                                    {CASE_LABELS[caseName]}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getParticiple(
                                        caseName,
                                        "singular",
                                        "masculine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getParticiple(
                                        caseName,
                                        "singular",
                                        "feminine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getParticiple(
                                        caseName,
                                        "singular",
                                        "neuter"
                                    )}
                                </GerundiveTD>

                            </tr>
                        ))}

                        {/* PLURAL */}
                        {CASE_ORDER.map((caseName, index) => (
                            <tr key={`plur-${caseName}`}>

                                {index === 0 && (
                                    <GerundiveTD rowSpan={CASE_ORDER.length}>
                                        Plur.
                                    </GerundiveTD>
                                )}

                                <GerundiveTD>
                                    {CASE_LABELS[caseName]}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getParticiple(
                                        caseName,
                                        "plural",
                                        "masculine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getParticiple(
                                        caseName,
                                        "plural",
                                        "feminine"
                                    )}
                                </GerundiveTD>

                                <GerundiveTD>
                                    {getParticiple(
                                        caseName,
                                        "plural",
                                        "neuter"
                                    )}
                                </GerundiveTD>

                            </tr>
                        ))}

                    </tbody>
                </GerundiveTable>

            )}

            <Line />

            {infinitives.length > 0 && (
                <InfinitiveGrid>

                    <InfinitiveBlock>
                        <SectionTitle>Infinitive Present</SectionTitle>
                        <FormRow
                            className={isHighlighted(presentInfinitive) ? "highlight" : ""}
                        >
                            {presentInfinitive || "—"}
                        </FormRow>
                    </InfinitiveBlock>

                    <InfinitiveBlock>
                        <SectionTitle>Infinitive Perfect</SectionTitle>
                        <FormRow
                            className={isHighlighted(perfectInfinitive) ? "highlight" : ""}
                        >
                            {perfectInfinitive || "—"}
                        </FormRow>
                    </InfinitiveBlock>

                    <InfinitiveBlock>
                        <SectionTitle>Infinitive Future</SectionTitle>
                        <FormRow
                            className={isHighlighted(futureInfinitive) ? "highlight" : ""}
                        >
                            {futureInfinitive || "—"}
                        </FormRow>
                    </InfinitiveBlock>

                </InfinitiveGrid>
            )}

        </Wrapper>
    );
}

export default VerbTable;