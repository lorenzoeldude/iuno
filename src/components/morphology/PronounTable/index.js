import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.colors.accent};
`;

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;

    scrollbar-width: thin;
`;

const Table = styled.table`
    width: 100%;
    min-width: max-content;

    border-collapse: collapse;
`;

const TH = styled.th`
    text-align: left;
    padding: 10px 14px;

    font-family: "Cormorant Garamond", serif;
    font-size: 18px;
    font-weight: 600;

    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 8px 10px;
        font-size: 16px;
    }
`;

const TD = styled.td`
    padding: 10px 14px;

    font-family: "Cormorant Garamond", serif;
    font-size: 21px;
    line-height: 1;

    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 8px 10px;
        font-size: 19px;
    }

    &.case {
        font-size: 17px;
        font-weight: 600;
    }

    &.highlight {
        background-color: ${({ theme }) =>
            `${theme.colors.accent}33`};
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

function PronounTable({ forms, highlightedForm }) {
    const pronounForms = forms.filter(
        (f) => f.grammatical_case
    );

    const genders = [
        ...new Set(
            pronounForms
                .map((f) => f.gender)
                .filter(Boolean)
        ),
    ];

    const hasGender = genders.length > 1;

    const hasSingular = pronounForms.some(
        (f) => f.number === "singular"
    );

    const hasPlural = pronounForms.some(
        (f) => f.number === "plural"
    );

    function getForm(caseName, number, gender = null) {
        return pronounForms.find((form) => {
            return (
                form.grammatical_case === caseName &&
                form.number === number &&
                (
                    hasGender
                        ? form.gender === gender
                        : true
                )
            );
        });
    }

    if (hasGender) {
        return (
            <Wrapper>
                <TableWrapper>
                    <Table>
                        <tbody>

                            {hasSingular && (
                                <>
                                    <tr>
                                        <TH>Sing.</TH>
                                        <TH>Masc.</TH>
                                        <TH>Fem.</TH>
                                        <TH>Neut.</TH>
                                    </tr>

                                    {CASE_ORDER.map((caseName) => (
                                        <tr key={`sg-${caseName}`}>

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
                                </>
                            )}

                            {hasPlural && (
                                <>
                                    <tr>
                                        <TH>Plur.</TH>
                                        <TH>Masc.</TH>
                                        <TH>Fem.</TH>
                                        <TH>Neut.</TH>
                                    </tr>

                                    {CASE_ORDER.map((caseName) => (
                                        <tr key={`pl-${caseName}`}>

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
                                </>
                            )}

                        </tbody>
                    </Table>
                </TableWrapper>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TableWrapper>
                <Table>

                    <thead>
                        <tr>
                            <TH></TH>

                            {hasSingular && (
                                <TH>Sing.</TH>
                            )}

                            {hasPlural && (
                                <TH>Plur.</TH>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {CASE_ORDER.map((caseName) => (
                            <tr key={caseName}>

                                <TD className="case">
                                    {CASE_LABELS[caseName]}
                                </TD>

                                {hasSingular && (
                                    <FormCell
                                        form={getForm(
                                            caseName,
                                            "singular"
                                        )}
                                        highlightedForm={
                                            highlightedForm
                                        }
                                    />
                                )}

                                {hasPlural && (
                                    <FormCell
                                        form={getForm(
                                            caseName,
                                            "plural"
                                        )}
                                        highlightedForm={
                                            highlightedForm
                                        }
                                    />
                                )}

                            </tr>
                        ))}
                    </tbody>

                </Table>
            </TableWrapper>
        </Wrapper>
    );
}

export default PronounTable;