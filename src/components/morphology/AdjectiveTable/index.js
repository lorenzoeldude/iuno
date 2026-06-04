import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
    background-color: rgba(178, 178, 178, 0.1);
    border-radius: 10px;
`;

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
    font-size: 15px;

    background: ${({ active }) =>
        active ? "black" : "rgba(0,0,0,0.08)"};

    color: ${({ active }) =>
        active ? "white" : "black"};
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TH = styled.th`
    text-align: left;
    padding: 14px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-size: 17px;
    font-weight: 600;
`;

const TD = styled.td`
    padding: 14px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-size: 21px;
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

function AdjectiveTable({ forms }) {

    const [degree, setDegree] = useState("positive");

    const adjectiveForms = forms.filter((form) => {

        if (!form.grammatical_case) {
            return false;
        }

        if (degree === "positive") {
            return !form.degree || form.degree === "positive";
        }

        return form.degree === degree;
    });

    const adverb = forms.find(
        (form) =>
            form.form_type === "adverb" &&
            (
                degree === "positive"
                    ? (!form.degree || form.degree === "positive")
                    : form.degree === degree
            )
    )?.form;

    function getForm(caseName, number, gender) {
        return (
            adjectiveForms.find(
                (form) =>
                    form.grammatical_case === caseName &&
                    form.number === number &&
                    form.gender === gender
            )?.form || "—"
        );
    }

    return (
        <Wrapper>

            <SwitchRow>

                <SwitchButton
                    active={degree === "positive"}
                    onClick={() => setDegree("positive")}
                >
                    Positive
                </SwitchButton>

                <SwitchButton
                    active={degree === "comparative"}
                    onClick={() => setDegree("comparative")}
                >
                    Comparative
                </SwitchButton>

                <SwitchButton
                    active={degree === "superlative"}
                    onClick={() => setDegree("superlative")}
                >
                    Superlative
                </SwitchButton>

            </SwitchRow>

            <Table>

                <thead>
                    <tr>
                        <TH></TH>
                        <TH></TH>
                        <TH>Masculine</TH>
                        <TH>Feminine</TH>
                        <TH>Neuter</TH>
                    </tr>
                </thead>

                <tbody>

                    {CASE_ORDER.map((caseName, index) => (
                        <tr key={`singular-${caseName}`}>

                            {index === 0 && (
                                <TD rowSpan={CASE_ORDER.length}>
                                    Sing.
                                </TD>
                            )}

                            <TD>{CASE_LABELS[caseName]}</TD>

                            <TD>
                                {getForm(
                                    caseName,
                                    "singular",
                                    "masculine"
                                )}
                            </TD>

                            <TD>
                                {getForm(
                                    caseName,
                                    "singular",
                                    "feminine"
                                )}
                            </TD>

                            <TD>
                                {getForm(
                                    caseName,
                                    "singular",
                                    "neuter"
                                )}
                            </TD>

                        </tr>
                    ))}

                    {CASE_ORDER.map((caseName, index) => (
                        <tr key={`plural-${caseName}`}>

                            {index === 0 && (
                                <TD rowSpan={CASE_ORDER.length}>
                                    Plur.
                                </TD>
                            )}

                            <TD>{CASE_LABELS[caseName]}</TD>

                            <TD>
                                {getForm(
                                    caseName,
                                    "plural",
                                    "masculine"
                                )}
                            </TD>

                            <TD>
                                {getForm(
                                    caseName,
                                    "plural",
                                    "feminine"
                                )}
                            </TD>

                            <TD>
                                {getForm(
                                    caseName,
                                    "plural",
                                    "neuter"
                                )}
                            </TD>

                        </tr>
                    ))}

                </tbody>

            </Table>

            {adverb && (
                <div
                    style={{
                        padding: "0 14px 14px 14px",
                        fontSize: "18px",
                    }}
                >
                    <strong>Adverb:</strong> {adverb}
                </div>
            )}

        </Wrapper>
    );
}

export default AdjectiveTable;