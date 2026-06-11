import styled from "styled-components";
import Input from "../../../styled/Input";

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

function VerbGerundiveEditor({
    forms,
    setForms,
}) {

    function getValue(
        caseName,
        number,
        gender,
    ) {
        const form = forms.find(
            f =>
                f.mood === "gerundive" &&
                f.grammatical_case === caseName &&
                f.number === number &&
                f.gender === gender
        );

        return form?.form || "";
    }

    function setValue(
        caseName,
        number,
        gender,
        value,
    ) {

        setForms(prev => {

            const existing = prev.find(
                f =>
                    f.mood === "gerundive" &&
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
                    mood: "gerundive",
                    grammatical_case: caseName,
                    number,
                    gender,
                },
            ];
        });
    }

    function renderSection(number) {
        return (
            <>
                <tr>
                    <TH>
                        {number === "singular"
                            ? "Singular"
                            : "Plural"}
                    </TH>

                    <TH>Masculine</TH>
                    <TH>Feminine</TH>
                    <TH>Neuter</TH>
                </tr>

                {CASE_ORDER.map(caseName => (
                    <tr key={`${number}-${caseName}`}>

                        <TD>
                            {CASE_LABELS[caseName]}
                        </TD>

                        {GENDERS.map(gender => (
                            <TD key={gender}>
                                <Input
                                    value={getValue(
                                        caseName,
                                        number,
                                        gender
                                    )}
                                    onChange={e =>
                                        setValue(
                                            caseName,
                                            number,
                                            gender,
                                            e.target.value
                                        )
                                    }
                                />
                            </TD>
                        ))}

                    </tr>
                ))}
            </>
        );
    }

    return (
        <Table>

            <tbody>
                {renderSection("singular")}
                {renderSection("plural")}
            </tbody>

        </Table>
    );
}

export default VerbGerundiveEditor;