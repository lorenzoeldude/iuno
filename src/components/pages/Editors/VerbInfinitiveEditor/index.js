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

const TENSES = [
    "present",
    "perfect",
    "future",
];

function VerbInfinitiveEditor({
    forms,
    setForms,
    voice,
}) {

    function getValue(tense) {
        const form = forms.find(
            f =>
                f.mood === "infinitive" &&
                f.voice === voice &&
                f.tense === tense
        );

        return form?.form || "";
    }

    function setValue(tense, value) {

        setForms(prev => {

            const existing = prev.find(
                f =>
                    f.mood === "infinitive" &&
                    f.voice === voice &&
                    f.tense === tense
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
                    mood: "infinitive",
                    voice,
                    tense,
                },
            ];
        });
    }

    return (
        <Table>

            <thead>
                <tr>
                    <TH>Tense</TH>
                    <TH>Form</TH>
                </tr>
            </thead>

            <tbody>

                {TENSES.map(tense => (
                    <tr key={tense}>

                        <TD>
                            {tense.charAt(0).toUpperCase() +
                                tense.slice(1)}
                        </TD>

                        <TD>
                            <Input
                                value={getValue(tense)}
                                onChange={e =>
                                    setValue(
                                        tense,
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

export default VerbInfinitiveEditor;