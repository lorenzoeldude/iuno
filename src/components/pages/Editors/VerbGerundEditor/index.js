import styled from "styled-components";
import Input from "../../../styled/Input";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TH = styled.th`
    padding: 14px;
    text-align: left;
`;

const TD = styled.td`
    padding: 14px;
`;

const CASE_ORDER = [
    "genitive",
    "dative",
    "accusative",
    "ablative",
];

const CASE_LABELS = {
    genitive: "Gen.",
    dative: "Dat.",
    accusative: "Acc.",
    ablative: "Abl.",
};

function VerbGerundEditor({
    forms,
    setForms,
}) {

    function getValue(caseName) {
        const form = forms.find(
            f =>
                f.mood === "gerund" &&
                f.grammatical_case === caseName
        );

        return form?.form || "";
    }

    function setValue(caseName, value) {

        setForms(prev => {

            const existing = prev.find(
                f =>
                    f.mood === "gerund" &&
                    f.grammatical_case === caseName
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
                    mood: "gerund",
                    grammatical_case: caseName,
                },
            ];
        });
    }

    return (
        <Table>

            <thead>
                <tr>
                    <TH>Case</TH>
                    <TH>Form</TH>
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
                                value={getValue(caseName)}
                                onChange={e =>
                                    setValue(
                                        caseName,
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

export default VerbGerundEditor;