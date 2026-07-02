import styled from "styled-components";

const Wrapper = styled.div`
    background-color: rgba(178, 178, 178, 0.1);
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
                                            <TD>{CASE_LABELS[caseName]}</TD>

                                            <FormCell
                                                form={getForm(
                                                    caseName,
                                                    "singular",
                                                    "masculine"
                                                )}
                                                highlightedForm={highlightedForm}
                                            />

                                            <FormCell
                                                form={getForm(
                                                    caseName,
                                                    "singular",
                                                    "feminine"
                                                )}
                                                highlightedForm={highlightedForm}
                                            />

                                            <FormCell
                                                form={getForm(
                                                    caseName,
                                                    "singular",
                                                    "neuter"
                                                )}
                                                highlightedForm={highlightedForm}
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
                                            <TD>{CASE_LABELS[caseName]}</TD>

                                            <FormCell
                                                form={getForm(
                                                    caseName,
                                                    "plural",
                                                    "masculine"
                                                )}
                                                highlightedForm={highlightedForm}
                                            />

                                            <FormCell
                                                form={getForm(
                                                    caseName,
                                                    "plural",
                                                    "feminine"
                                                )}
                                                highlightedForm={highlightedForm}
                                            />

                                            <FormCell
                                                form={getForm(
                                                    caseName,
                                                    "plural",
                                                    "neuter"
                                                )}
                                                highlightedForm={highlightedForm}
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

                            {hasSingular && <TH>Sing.</TH>}
                            {hasPlural && <TH>Plur.</TH>}
                        </tr>
                    </thead>

                    <tbody>
                        {CASE_ORDER.map((caseName) => (
                            <tr key={caseName}>
                                <TD>{CASE_LABELS[caseName]}</TD>

                                {hasSingular && (
                                    <FormCell
                                        form={getForm(
                                            caseName,
                                            "singular"
                                        )}
                                        highlightedForm={highlightedForm}
                                    />
                                )}

                                {hasPlural && (
                                    <FormCell
                                        form={getForm(
                                            caseName,
                                            "plural"
                                        )}
                                        highlightedForm={highlightedForm}
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