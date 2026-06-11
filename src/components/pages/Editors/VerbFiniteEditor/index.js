import styled from "styled-components";
import Input from "../../../styled/Input";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TH = styled.th`
    padding: 10px;
    text-align: left;
`;

const TD = styled.td`
    padding: 10px;
`;

const SwitchRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
`;

const SwitchButton = styled.button`
    border: none;
    padding: 10px 16px;
    border-radius: 999px;
    cursor: pointer;

    background: ${({ $active }) =>
        $active ? "black" : "rgba(0,0,0,0.08)"};

    color: ${({ $active }) =>
        $active ? "white" : "black"};
`;

const PERSON_ORDER = [
    { person: 1, number: "singular", label: "1st Sing." },
    { person: 2, number: "singular", label: "2nd Sing." },
    { person: 3, number: "singular", label: "3rd Sing." },
    { person: 1, number: "plural", label: "1st Plur." },
    { person: 2, number: "plural", label: "2nd Plur." },
    { person: 3, number: "plural", label: "3rd Plur." },
];

const TENSES = [
    "present",
    "imperfect",
    "future",
    "perfect",
    "pluperfect",
    "future perfect",
];

function VerbFiniteEditor({
    forms,
    setForms,
    voice,
    setVoice,
    mood,
    setMood,
}) {

    function getValue(tense, person, number) {
        const form = forms.find(
            f =>
                f.tense === tense &&
                f.person === person &&
                f.number === number &&
                f.voice === voice &&
                f.mood === mood
        );

        return form?.form || "";
    }

    function setValue(
        tense,
        person,
        number,
        value
    ) {
        setForms(prev => {

            const existing = prev.find(
                f =>
                    f.tense === tense &&
                    f.person === person &&
                    f.number === number &&
                    f.voice === voice &&
                    f.mood === mood
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
                    tense,
                    person,
                    number,
                    voice,
                    mood,
                },
            ];
        });
    }

    return (
        <>
            {/* <SwitchRow>

                <SwitchButton
                    $active={voice === "active"}
                    onClick={() => setVoice("active")}
                >
                    Active
                </SwitchButton>

                <SwitchButton
                    $active={voice === "passive"}
                    onClick={() => setVoice("passive")}
                >
                    Passive
                </SwitchButton>

            </SwitchRow> */}

            <SwitchRow>

                <SwitchButton
                    $active={mood === "indicative"}
                    onClick={() => setMood("indicative")}
                >
                    Indicative
                </SwitchButton>

                <SwitchButton
                    $active={mood === "subjunctive"}
                    onClick={() => setMood("subjunctive")}
                >
                    Subjunctive
                </SwitchButton>

                <SwitchButton
                    $active={mood === "imperative"}
                    onClick={() => setMood("imperative")}
                >
                    Imperative
                </SwitchButton>

            </SwitchRow>

            <Table>

                <thead>
                    <tr>
                        <TH></TH>

                        {TENSES.map(tense => (
                            <TH key={tense}>
                                {tense}
                            </TH>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {PERSON_ORDER.map(row => (
                        <tr
                            key={`${row.person}-${row.number}`}
                        >
                            <TD>{row.label}</TD>

                            {TENSES.map(tense => (
                                <TD key={tense}>
                                    <Input
                                        value={getValue(
                                            tense,
                                            row.person,
                                            row.number
                                        )}
                                        onChange={e =>
                                            setValue(
                                                tense,
                                                row.person,
                                                row.number,
                                                e.target.value
                                            )
                                        }
                                    />
                                </TD>
                            ))}
                        </tr>
                    ))}

                </tbody>

            </Table>
        </>
    );
}

export default VerbFiniteEditor;