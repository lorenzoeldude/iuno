import styled from "styled-components";
import { useState } from "react";
import Input from "../../../styled/Input";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TH = styled.th`
    padding: 14px;
`;

const TD = styled.td`
    padding: 14px;
`;

const SwitchRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
`;

const SwitchButton = styled.button`
    border: none;
    padding: 10px 16px;
    border-radius: 999px;
    cursor: pointer;

    background: ${({ $active }) =>
        $active ? "black" : "rgba(0,0,0,0.08)"};

    color: ${({ $active }) =>
        $active ? "white" : "black"};
`;

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

const GENDERS = [
    "masculine",
    "feminine",
    "neuter",
];

function VerbParticipleEditor({
    forms,
    setForms,
}) {

    const [participle, setParticiple] = useState("present");

    function getMetadata() {
        switch (participle) {
            case "present":
                return {
                    mood: "participle",
                    tense: "present",
                    voice: "active",
                };

            case "perfect":
                return {
                    mood: "participle",
                    tense: "perfect",
                    voice: "passive",
                };

            case "future":
                return {
                    mood: "participle",
                    tense: "future",
                    voice: "active",
                };

            default:
                return {};
        }
    }

    function getValue(
        caseName,
        number,
        gender,
    ) {
        const meta = getMetadata();

        const form = forms.find(
            f =>
                f.mood === meta.mood &&
                f.tense === meta.tense &&
                f.voice === meta.voice &&
                f.grammatical_case === caseName &&
                f.number === number &&
                f.gender === gender
        );

        return form?.form || "";
    }

    function setValue(
        caseName,
        number,
        gender,
        value,
    ) {

        const meta = getMetadata();

        setForms(prev => {

            const existing = prev.find(
                f =>
                    f.mood === meta.mood &&
                    f.tense === meta.tense &&
                    f.voice === meta.voice &&
                    f.grammatical_case === caseName &&
                    f.number === number &&
                    f.gender === gender
            );

            if (existing) {
                return prev.map(f =>
                    f === existing
                        ? { ...f, form: value }
                        : f
                );
            }

            return [
                ...prev,
                {
                    form: value,
                    mood: meta.mood,
                    tense: meta.tense,
                    voice: meta.voice,
                    grammatical_case: caseName,
                    number,
                    gender,
                },
            ];
        });
    }

    function renderSection(number) {
        return (
            <>
                <tr>
                    <TH>
                        {number === "singular"
                            ? "Singular"
                            : "Plural"}
                    </TH>

                    <TH>Masculine</TH>
                    <TH>Feminine</TH>
                    <TH>Neuter</TH>
                </tr>

                {CASE_ORDER.map(caseName => (
                    <tr key={`${number}-${caseName}`}>

                        <TD>
                            {CASE_LABELS[caseName]}
                        </TD>

                        {GENDERS.map(gender => (
                            <TD key={gender}>
                                <Input
                                    value={getValue(
                                        caseName,
                                        number,
                                        gender
                                    )}
                                    onChange={e =>
                                        setValue(
                                            caseName,
                                            number,
                                            gender,
                                            e.target.value
                                        )
                                    }
                                />
                            </TD>
                        ))}

                    </tr>
                ))}
            </>
        );
    }

    return (
        <>
            <SwitchRow>

                <SwitchButton
                    $active={participle === "present"}
                    onClick={() => setParticiple("present")}
                >
                    Present Active
                </SwitchButton>

                <SwitchButton
                    $active={participle === "perfect"}
                    onClick={() => setParticiple("perfect")}
                >
                    Perfect Passive
                </SwitchButton>

                <SwitchButton
                    $active={participle === "future"}
                    onClick={() => setParticiple("future")}
                >
                    Future Active
                </SwitchButton>

            </SwitchRow>

            <Table>
                <tbody>
                    {renderSection("singular")}
                    {renderSection("plural")}
                </tbody>
            </Table>
        </>
    );
}

export default VerbParticipleEditor;