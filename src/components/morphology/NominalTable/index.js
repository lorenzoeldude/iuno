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

    font-family: ${({ theme }) => theme.fonts.body};
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

    font-family: ${({ theme }) => theme.fonts.body};
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
            `${theme.colors.accent}256`};
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

function NominalTable({ forms, highlightedForm }) {
    const nominalForms = forms.filter(
        (form) => form.grammatical_case
    );

    function getForm(caseName, number, gender = null) {
        return nominalForms.find((form) => {
            if (
                form.grammatical_case !== caseName ||
                form.number !== number
            ) {
                return false;
            }

            if (gender && form.gender !== gender) {
                return false;
            }

            return true;
        });
    }

    const hasMasculine = nominalForms.some(
        (f) => f.gender === "masculine"
    );

    const hasFeminine = nominalForms.some(
        (f) => f.gender === "feminine"
    );

    const hasNeuter = nominalForms.some(
        (f) => f.gender === "neuter"
    );

    return (
        <Wrapper>
            <TableWrapper>
                <Table>

                    <thead>
                        <tr>
                            <TH></TH>

                            {hasMasculine && (
                                <>
                                    <TH>Sing.</TH>
                                    <TH>Plur.</TH>
                                </>
                            )}

                            {hasFeminine && (
                                <>
                                    <TH>Sing.</TH>
                                    <TH>Plur.</TH>
                                </>
                            )}

                            {hasNeuter && (
                                <>
                                    <TH>Sing.</TH>
                                    <TH>Plur.</TH>
                                </>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {CASE_ORDER.map((caseName) => (
                            <tr key={caseName}>

                                <TD className="case">
                                    {CASE_LABELS[caseName]}
                                </TD>

                                {hasMasculine && (
                                    <>
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
                                                "plural",
                                                "masculine"
                                            )}
                                            highlightedForm={
                                                highlightedForm
                                            }
                                        />
                                    </>
                                )}

                                {hasFeminine && (
                                    <>
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
                                                "plural",
                                                "feminine"
                                            )}
                                            highlightedForm={
                                                highlightedForm
                                            }
                                        />
                                    </>
                                )}

                                {hasNeuter && (
                                    <>
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
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>

                </Table>
            </TableWrapper>
        </Wrapper>
    );
}

export default NominalTable;