import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
    background-color: rgba(178, 178, 178, 0.1);
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

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
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
    text-decoration: underline;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 10px 8px;
        font-size: 15px;
    }
`;

const TD = styled.td`
    padding: 14px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-size: 21px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 10px 8px;
        font-size: 17px;
    }

    &.highlight {
        background-color: ${({ theme }) => theme.colors.highlight};
        font-weight: bold;
    }
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

function FormCell({ form, highlightedForm }) {

    function normalizeLatin(word) {
        return word
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    const highlighted =
        highlightedForm &&
        normalizeLatin(form?.form) ===
        normalizeLatin(highlightedForm);

    return (
        <TD className={highlighted ? "highlight" : ""}>
            {form?.form || "—"}
        </TD>
    );
}

function AdjectiveTable({ forms, highlightedForm }) {

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

    const adverbObj = forms.find(
        (form) =>
            form.form_type === "adverb" &&
            (
                degree === "positive"
                    ? (!form.degree || form.degree === "positive")
                    : form.degree === degree
            )
    );

    function getForm(caseName, number, gender) {
        return adjectiveForms.find(
            (form) =>
                form.grammatical_case === caseName &&
                form.number === number &&
                form.gender === gender
        );
    }

    function normalizeLatin(word) {
        return word
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    const adverbHighlighted =
        highlightedForm &&
        normalizeLatin(adverbObj?.form) ===
        normalizeLatin(highlightedForm);

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

            <TableWrapper>
            <Table>

                <thead>
                    <tr>
                        <TH><strong>Singular</strong></TH>
                        <TH>Masculine</TH>
                        <TH>Feminine</TH>
                        <TH>Neuter</TH>
                    </tr>
                </thead>

                <tbody>

                    {CASE_ORDER.map((caseName) => (
                        <tr key={`singular-${caseName}`}>

                            <TD>{CASE_LABELS[caseName]}</TD>

                            <FormCell
                                form={getForm(caseName, "singular", "masculine")}
                                highlightedForm={highlightedForm}
                            />

                            <FormCell
                                form={getForm(caseName, "singular", "feminine")}
                                highlightedForm={highlightedForm}
                            />

                            <FormCell
                                form={getForm(caseName, "singular", "neuter")}
                                highlightedForm={highlightedForm}
                            />

                        </tr>
                    ))}

                    <tr>
                        <TH><strong>Plural</strong></TH>
                        <TH>Masculine</TH>
                        <TH>Feminine</TH>
                        <TH>Neuter</TH>
                    </tr>

                    {CASE_ORDER.map((caseName) => (
                        <tr key={`plural-${caseName}`}>

                            <TD>{CASE_LABELS[caseName]}</TD>

                            <FormCell
                                form={getForm(caseName, "plural", "masculine")}
                                highlightedForm={highlightedForm}
                            />

                            <FormCell
                                form={getForm(caseName, "plural", "feminine")}
                                highlightedForm={highlightedForm}
                            />

                            <FormCell
                                form={getForm(caseName, "plural", "neuter")}
                                highlightedForm={highlightedForm}
                            />

                        </tr>
                    ))}

                    {adverbObj && (
                        <tr>
                            <TH><strong>Adverb</strong></TH>

                            <TD
                                colSpan={3}
                                className={adverbHighlighted ? "highlight" : ""}
                            >
                                {adverbObj.form}
                            </TD>
                        </tr>
                    )}

                </tbody>

            </Table>
            </TableWrapper>

        </Wrapper>
    );
}

export default AdjectiveTable;