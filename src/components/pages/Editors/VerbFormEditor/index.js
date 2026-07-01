import { useState } from "react";
import styled from "styled-components";

import VerbFiniteEditor from "../VerbFiniteEditor";
import VerbInfinitiveEditor from "../VerbInfinitiveEditor";
import VerbGerundEditor from "../VerbGerundEditor";
import VerbGerundiveEditor from "../VerbGerundiveEditor";
import VerbParticipleEditor from "../VerbParticipleEditor";

const Wrapper = styled.div`
    background-color: rgba(178, 178, 178, 0.1);
    border-radius: 10px;
`;

const SwitchRow = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
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

function VerbFormEditor({ forms, setForms }) {

    const [mode, setMode] = useState("active");
    const [mood, setMood] = useState("indicative");
    const [participle, setParticiple] = useState("ppp");
    // const [voice, setVoice] = useState("active");

    return (
        <Wrapper>

            <SwitchRow>

                <SwitchButton
                    $active={mode === "active"}
                    onClick={() => setMode("active")}
                >
                    Active
                </SwitchButton>

                <SwitchButton
                    $active={mode === "passive"}
                    onClick={() => setMode("passive")}
                >
                    Passive
                </SwitchButton>

                <SwitchButton
                    $active={mode === "gerund"}
                    onClick={() => setMode("gerund")}
                >
                    Gerund
                </SwitchButton>

                <SwitchButton
                    $active={mode === "gerundive"}
                    onClick={() => setMode("gerundive")}
                >
                    Gerundive
                </SwitchButton>

                <SwitchButton
                    $active={mode === "participle"}
                    onClick={() => setMode("participle")}
                >
                    Participle
                </SwitchButton>

                <SwitchButton
                    $active={mode === "infinitive"}
                    onClick={() => setMode("infinitive")}
                >
                    Infinitive
                </SwitchButton>

            </SwitchRow>

            {(mode === "active" || mode === "passive") && (
                <VerbFiniteEditor
                    forms={forms}
                    setForms={setForms}
                    voice={mode}
                    mood={mood}
                    setMood={setMood}
                />
            )}

            {mode === "infinitive" && (
                <VerbInfinitiveEditor
                    forms={forms}
                    setForms={setForms}
                    voice="active"
                />
            )}

            {mode === "gerund" && (
                <VerbGerundEditor
                    forms={forms}
                    setForms={setForms}
                />
            )}

            {mode === "gerundive" && (
                <VerbGerundiveEditor
                    forms={forms}
                    setForms={setForms}
                />
            )}

            {mode === "participle" && (
                <VerbParticipleEditor
                    forms={forms}
                    setForms={setForms}
                    participle={participle}
                    setParticiple={setParticiple}
                />
            )}

        </Wrapper>
    );
}

export default VerbFormEditor;