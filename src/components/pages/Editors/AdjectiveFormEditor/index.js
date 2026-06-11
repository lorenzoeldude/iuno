import styled from "styled-components";
import { useState } from "react";
import Input from "../../../styled/Input";

const SwitchRow = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
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

function AdjectiveFormEditor({ forms, setForms }) {

    const [degree, setDegree] = useState("positive");

    function getValue(caseName, number, gender) {
        const form = forms.find(
            f =>
                f.degree === degree &&
                f.grammatical_case === caseName &&
                f.number === number &&
                f.gender === gender
        );

        return form?.form || "";
    }

    function setValue(caseName, number, gender, value) {
        setForms(prev => {

            const existing = prev.find(
                f =>
                    f.degree === degree &&
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
                    degree,
                    grammatical_case: caseName,
                    number,
                    gender,
                },
            ];
        });
    }

    return (
        <>
            <SwitchRow>

                <SwitchButton
                    $active={degree === "positive"}
                    onClick={() => setDegree("positive")}
                >
                    Positive
                </SwitchButton>

                <SwitchButton
                    $active={degree === "comparative"}
                    onClick={() => setDegree("comparative")}
                >
                    Comparative
                </SwitchButton>

                <SwitchButton
                    $active={degree === "superlative"}
                    onClick={() => setDegree("superlative")}
                >
                    Superlative
                </SwitchButton>

            </SwitchRow>

            <Table>

                <thead>
                    <tr>
                        <TH></TH>
                        <TH>Masc.</TH>
                        <TH>Fem.</TH>
                        <TH>Neut.</TH>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <TH>Singular</TH>
                    </tr>

                    {CASE_ORDER.map(caseName => (
                        <tr key={`singular-${caseName}`}>

                            <TD>{CASE_LABELS[caseName]}</TD>

                            {GENDERS.map(gender => (
                                <TD key={gender}>
                                    <Input
                                        value={getValue(
                                            caseName,
                                            "singular",
                                            gender
                                        )}
                                        onChange={e =>
                                            setValue(
                                                caseName,
                                                "singular",
                                                gender,
                                                e.target.value
                                            )
                                        }
                                    />
                                </TD>
                            ))}

                        </tr>
                    ))}

                    <tr>
                        <TH>Plural</TH>
                    </tr>

                    {CASE_ORDER.map(caseName => (
                        <tr key={`plural-${caseName}`}>

                            <TD>{CASE_LABELS[caseName]}</TD>

                            {GENDERS.map(gender => (
                                <TD key={gender}>
                                    <Input
                                        value={getValue(
                                            caseName,
                                            "plural",
                                            gender
                                        )}
                                        onChange={e =>
                                            setValue(
                                                caseName,
                                                "plural",
                                                gender,
                                                e.target.value
                                            )
                                        }
                                    />
                                </TD>
                            ))}

                        </tr>
                    ))}

                </tbody>

            </Table>
        </>
    );
}

export default AdjectiveFormEditor;