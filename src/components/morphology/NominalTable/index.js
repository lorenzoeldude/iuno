import styled from "styled-components";

const Wrapper = styled.div`
    background-color: rgba(178, 178, 178, 0.1);
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

    &.highlight {
        background-color: rgba(255, 215, 0, 0.4);
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

function NominalTable({ forms, highlightedForm }) {

    const nominalForms = forms.filter(
        (form) => form.grammatical_case
    );

    function getForm(
        caseName,
        number,
        gender = null
    ) {

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

                            <TD>
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
                                        highlightedForm={highlightedForm}
                                    />

                                    <FormCell
                                        form={getForm(
                                            caseName,
                                            "plural",
                                            "masculine"
                                        )}
                                        highlightedForm={highlightedForm}
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
                                </>
                            )}

                        </tr>
                    ))}

                </tbody>

            </Table>
        </Wrapper>
    );
}

export default NominalTable;