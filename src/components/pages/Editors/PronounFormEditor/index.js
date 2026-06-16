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

function PronounFormEditor({
    forms,
    setForms,
    pronounType,
}) {

    function getValue(
        caseName,
        number,
        gender = null,
    ) {
        const form = forms.find(f => {

            if (
                f.grammatical_case !== caseName ||
                f.number !== number
            ) {
                return false;
            }

            if (
                gender &&
                f.gender !== gender
            ) {
                return false;
            }

            return true;
        });

        return form?.form || "";
    }

    function setValue(
        caseName,
        number,
        value,
        gender = null,
    ) {

        setForms(prev => {

            const existing = prev.find(f => {

                if (
                    f.grammatical_case !== caseName ||
                    f.number !== number
                ) {
                    return false;
                }

                if (
                    gender &&
                    f.gender !== gender
                ) {
                    return false;
                }

                return true;
            });

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
                    grammatical_case: caseName,
                    number,
                    gender,
                },
            ];
        });
    }

    // =====================================
    // PERSONAL / REFLEXIVE
    // =====================================

    if (
        pronounType === "personal" ||
        pronounType === "reflexive"
    ) {
        return (
            <Table>

                <thead>
                    <tr>
                        <TH></TH>
                        <TH>Sing.</TH>
                        <TH>Plur.</TH>
                    </tr>
                </thead>

                <tbody>

                    {CASE_ORDER.map(caseName => (
                        <tr key={caseName}>

                            <TD>
                                {CASE_LABELS[caseName]}
                            </TD>

                            <TD>
                                <Input
                                    value={getValue(
                                        caseName,
                                        "singular"
                                    )}
                                    onChange={e =>
                                        setValue(
                                            caseName,
                                            "singular",
                                            e.target.value
                                        )
                                    }
                                />
                            </TD>

                            <TD>
                                <Input
                                    value={getValue(
                                        caseName,
                                        "plural"
                                    )}
                                    onChange={e =>
                                        setValue(
                                            caseName,
                                            "plural",
                                            e.target.value
                                        )
                                    }
                                />
                            </TD>

                        </tr>
                    ))}

                </tbody>

            </Table>
        );
    }

    // =====================================
    // DEMONSTRATIVE / RELATIVE / ETC.
    // =====================================

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
                    <tr
                        key={`${number}-${caseName}`}
                    >

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
                                            e.target.value,
                                            gender
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

export default PronounFormEditor;