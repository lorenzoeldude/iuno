import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.colors.accent};
`;

const SwitchRow = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SwitchButton = styled.button`
    flex-shrink: 0;

    border: none;
    padding: 8px 16px;
    border-radius: 999px;
    cursor: pointer;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    font-weight: 400;

    background: ${({ active, theme }) =>
        active
            ? theme.colors.accent
            : `${theme.colors.accent}14`};

    color: ${({ active }) =>
        active ? "white" : "inherit"};
`;

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;

    scrollbar-width: thin;
`;

const Table = styled.table`
    width: max-content;
    min-width: 100%;

    border-collapse: collapse;
    table-layout: fixed;
`;

const TH = styled.th`
    width: 100px;

    text-align: left;

    padding: 8px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 18px;
    font-weight: 600;

    white-space: nowrap;
`;

const CaseTH = styled.th`
    width: 55px;

    text-align: left;

    padding: 8px 0;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 18px;
    font-weight: 600;

    white-space: nowrap;
`;

const TD = styled.td`
    padding: 8px;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 20px;
    line-height: 1;

    text-align: left;
    white-space: nowrap;

    min-width: 100px;

    &.case {
        width: 55px;
        min-width: 55px;

        padding-left: 0;

        font-size: 16px;
        font-weight: 600;
    }

    &.highlight {
        background-color: ${({ theme }) =>
            `${theme.colors.accent}26`};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 8px;
        font-size: 19px;

        &.case {
            padding-left: 0;
            font-size: 16px;
        }
    }
`;

const SectionRow = styled.tr`
    ${TH},
    ${CaseTH} {
        padding-top: 8px;
        padding-bottom: 8px;
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
            return (
                !form.degree ||
                form.degree === "positive"
            );
        }

        return form.degree === degree;
    });

    const adverbObj = forms.find(
        (form) =>
            form.form_type === "adverb" &&
            (
                degree === "positive"
                    ? (
                        !form.degree ||
                        form.degree === "positive"
                    )
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
                        <SectionRow>

                            <CaseTH>
                                Sing.
                            </CaseTH>

                            <TH>
                                Masc.
                            </TH>

                            <TH>
                                Fem.
                            </TH>

                            <TH>
                                Neut.
                            </TH>

                        </SectionRow>
                    </thead>

                    <tbody>

                        {CASE_ORDER.map((caseName) => (
                            <tr
                                key={`singular-${caseName}`}
                            >

                                <TD className="case">
                                    {CASE_LABELS[caseName]}
                                </TD>

                                <FormCell
                                    form={getForm(
                                        caseName,
                                        "singular",
                                        "masculine"
                                    )}
                                    highlightedForm={
                                        highlightedForm
                                    }
                                />

                                <FormCell
                                    form={getForm(
                                        caseName,
                                        "singular",
                                        "feminine"
                                    )}
                                    highlightedForm={
                                        highlightedForm
                                    }
                                />

                                <FormCell
                                    form={getForm(
                                        caseName,
                                        "singular",
                                        "neuter"
                                    )}
                                    highlightedForm={
                                        highlightedForm
                                    }
                                />

                            </tr>
                        ))}

                        <SectionRow>

                            <CaseTH>
                                Plur.
                            </CaseTH>

                            <TH>
                                Masc.
                            </TH>

                            <TH>
                                Fem.
                            </TH>

                            <TH>
                                Neut.
                            </TH>

                        </SectionRow>

                        {CASE_ORDER.map((caseName) => (
                            <tr
                                key={`plural-${caseName}`}
                            >

                                <TD className="case">
                                    {CASE_LABELS[caseName]}
                                </TD>

                                <FormCell
                                    form={getForm(
                                        caseName,
                                        "plural",
                                        "masculine"
                                    )}
                                    highlightedForm={
                                        highlightedForm
                                    }
                                />

                                <FormCell
                                    form={getForm(
                                        caseName,
                                        "plural",
                                        "feminine"
                                    )}
                                    highlightedForm={
                                        highlightedForm
                                    }
                                />

                                <FormCell
                                    form={getForm(
                                        caseName,
                                        "plural",
                                        "neuter"
                                    )}
                                    highlightedForm={
                                        highlightedForm
                                    }
                                />

                            </tr>
                        ))}

                        {adverbObj && (
                            <tr>

                                <CaseTH>
                                    Adverb
                                </CaseTH>

                                <TD
                                    colSpan={3}
                                    className={
                                        adverbHighlighted
                                            ? "highlight"
                                            : ""
                                    }
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