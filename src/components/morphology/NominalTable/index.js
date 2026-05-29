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

    const nominalForms = forms.filter((form) => form.grammatical_case);

    function getForm(caseName, number, gender = null) {

        const found = nominalForms.find((form) => {

            if (form.grammatical_case !== caseName || form.number !== number) {
                return false;
            }

            if (gender && form.gender !== gender) {
                return false;
            }

            return true;
        });

        return found?.form || "—";
    }

    const hasMasculine = nominalForms.some(f => f.gender === "masculine");
    const hasFeminine = nominalForms.some(f => f.gender === "feminine");
    const hasNeuter = nominalForms.some(f => f.gender === "neuter");

    return (
        <Table>

            {/* =====================================================
                HEADER
            ===================================================== */}
            <thead>

                <tr>
                    {/* <TH></TH> */}

                    {/* {hasMasculine && <TH colSpan={2}>Masculine</TH>}
                    {hasFeminine && <TH colSpan={2}>Feminine</TH>}
                    {hasNeuter && <TH colSpan={2}>Neuter</TH>} */}
                </tr>

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

            {/* =====================================================
                BODY
            ===================================================== */}
            <tbody>

                {CASE_ORDER.map((caseName) => (
                    <tr key={caseName}>

                        <TD>{CASE_LABELS[caseName]}</TD>

                        {hasMasculine && (
                            <>
                                <TD>{getForm(caseName, "singular", "masculine")}</TD>
                                <TD>{getForm(caseName, "plural", "masculine")}</TD>
                            </>
                        )}

                        {hasFeminine && (
                            <>
                                <TD>{getForm(caseName, "singular", "feminine")}</TD>
                                <TD>{getForm(caseName, "plural", "feminine")}</TD>
                            </>
                        )}

                        {hasNeuter && (
                            <>
                                <TD>{getForm(caseName, "singular", "neuter")}</TD>
                                <TD>{getForm(caseName, "plural", "neuter")}</TD>
                            </>
                        )}

                    </tr>
                ))}

            </tbody>

        </Table>
    );
}

export default NominalTable;