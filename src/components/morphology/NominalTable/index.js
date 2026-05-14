import styled from "styled-components";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
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

function NominalTable({ forms }) {

    // only nominal forms
    const nominalForms = forms.filter(
        (form) => form.case
    );

    function getForm(caseName, number, gender = null) {

        const found = nominalForms.find((form) => {

            // must match case + number
            if (
                form.case !== caseName ||
                form.number !== number
            ) {
                return false;
            }

            // if gender specified, must match gender
            if (gender && form.gender !== gender) {
                return false;
            }

            return true;
        });

        return found?.form || "—";
    }

    // determine whether genders exist
    const hasMasculine = nominalForms.some(
        (f) => f.gender === "masculine"
    );

    const hasFeminine = nominalForms.some(
        (f) => f.gender === "feminine"
    );

    const hasNeuter = nominalForms.some(
        (f) => f.gender === "neuter"
    );

    // =====================================================
    // SIMPLE NOMINAL TABLE
    // nouns / pronouns without gender variants
    // =====================================================

    if (
        !hasMasculine &&
        !hasFeminine &&
        !hasNeuter
    ) {

        return (

            <Table>

                <thead>
                    <tr>
                        <TH></TH>
                        <TH>Singular</TH>
                        <TH>Plural</TH>
                    </tr>
                </thead>

                <tbody>

                    {CASE_ORDER.map((caseName) => (

                        <tr key={caseName}>

                            <TD>
                                {CASE_LABELS[caseName]}
                            </TD>

                            <TD>
                                {getForm(caseName, "singular")}
                            </TD>

                            <TD>
                                {getForm(caseName, "plural")}
                            </TD>

                        </tr>
                    ))}

                </tbody>

            </Table>
        );
    }

    // =====================================================
    // GENDERED TABLE
    // adjectives / gendered pronouns
    // =====================================================

    return (

        <Table>

            <thead>

                <tr>

                    <TH></TH>

                    {hasMasculine && (
                        <TH>Masculine</TH>
                    )}

                    {hasFeminine && (
                        <TH>Feminine</TH>
                    )}

                    {hasNeuter && (
                        <TH>Neuter</TH>
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
                            <TD>
                                {getForm(
                                    caseName,
                                    "singular",
                                    "masculine"
                                )}
                            </TD>
                        )}

                        {hasFeminine && (
                            <TD>
                                {getForm(
                                    caseName,
                                    "singular",
                                    "feminine"
                                )}
                            </TD>
                        )}

                        {hasNeuter && (
                            <TD>
                                {getForm(
                                    caseName,
                                    "singular",
                                    "neuter"
                                )}
                            </TD>
                        )}

                    </tr>
                ))}

            </tbody>

        </Table>
    );
}

export default NominalTable;