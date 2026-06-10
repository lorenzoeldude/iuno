import styled from "styled-components";
import { Input } from "../../AdminLemmaEditor";

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

function NounFormEditor({ forms, setForms }) {
    function getValue(caseName, number) {
        const form = forms.find(
            f =>
                f.grammatical_case === caseName &&
                f.number === number
        );

        return form?.form || "";
    }

    function setValue(caseName, number, value) {
        setForms(prev => {
            const existing = prev.find(
                f =>
                    f.grammatical_case === caseName &&
                    f.number === number
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
                    grammatical_case: caseName,
                    number,
                    form: value,
                },
            ];
        });
    }

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
                        <TD>{CASE_LABELS[caseName]}</TD>

                        <TD>
                            <Input
                                value={getValue(caseName, "singular")}
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
                                value={getValue(caseName, "plural")}
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

export default NounFormEditor;