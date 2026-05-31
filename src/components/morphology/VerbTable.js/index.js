import styled from "styled-components";
import { useMemo, useState } from "react";

const Wrapper = styled.div`
    // width: 100%;
    background-color: rgba(178, 178, 178, 0.1);
    border-radius: 10px;
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
    font-size: 15px;

    background: ${({ active }) =>
        active ? "black" : "rgba(0,0,0,0.08)"};

    color: ${({ active }) =>
        active ? "white" : "black"};
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

function VerbTable({ forms }) {

    const [voice, setVoice] = useState("active");
    const [mood, setMood] = useState("indicative");

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
                            <FormRow key={`${p.person}-${p.number}`}>
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

    return (
        <Wrapper>

            {/* VOICE */}
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
            </SwitchRow>

            {/* MOOD */}
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

            {/* GRID */}
            <Grid>
                {tenseRows.map((row, idx) => (
                    <GridRow key={idx}>
                        {row.map((tense) => renderTenseBlock(tense))}
                    </GridRow>
                ))}
            </Grid>

            <Line />

            {infinitives.length > 0 && (
                <InfinitiveGrid>

                    <InfinitiveBlock>
                        <SectionTitle>Infinitive Present</SectionTitle>
                        <FormRow>
                            {
                                infinitives.find(
                                    f => f.tense === "present"
                                )?.form || "—"
                            }
                        </FormRow>
                    </InfinitiveBlock>

                    <InfinitiveBlock>
                        <SectionTitle>Infinitive Perfect</SectionTitle>
                        <FormRow>
                            {
                                infinitives.find(
                                    f => f.tense === "perfect"
                                )?.form || "—"
                            }
                        </FormRow>
                    </InfinitiveBlock>

                    <InfinitiveBlock>
                        <SectionTitle>Infinitive Future</SectionTitle>
                        <FormRow>
                            {
                                infinitives.find(
                                    f => f.tense === "future"
                                )?.form || "—"
                            }
                        </FormRow>
                    </InfinitiveBlock>

                </InfinitiveGrid>
            )}

        </Wrapper>
    );
}

export default VerbTable;