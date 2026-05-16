import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    padding: 40px 0;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 25px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 18px;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    font-size: 18px;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    min-height: 120px;
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    font-size: 18px;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    background: white;
`;

const Button = styled.button`
    padding: 12px 18px;
    font-size: 16px;
    border: none;
    border-radius: 999px;
    cursor: pointer;

    background: black;
    color: white;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Row = styled.div`
    display: flex;
    gap: 10px;
`;

function AdminLemmaEditor() {

    const [lemma, setLemma] = useState("");
    const [lemmaDisplay, setLemmaDisplay] = useState("");
    const [type, setType] = useState("");
    const [gender, setGender] = useState("");

    const [definition, setDefinition] = useState("");
    const [meaningsText, setMeaningsText] = useState("");

    // grammar fields
    const [declension, setDeclension] = useState("");
    const [conjugation, setConjugation] = useState("");

    // verb-only fields
    const [stem, setStem] = useState("");
    const [perfect, setPerfect] = useState("");
    const [supine, setSupine] = useState("");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const isVerb = type === "verb";
    const isNominal = type === "noun" || type === "adjective" || type === "pronoun";

    async function handleSubmit() {
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("http://localhost:8080/api/admin/lemma", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    word: {
                        lemma,
                        lemma_display: lemmaDisplay,
                        type,
                        gender,

                        definition,

                        declension: isNominal
                            ? Number(declension) || 0
                            : 0,

                        conjugation: isVerb
                            ? Number(conjugation) || 0
                            : 0,

                        stem: isVerb ? stem : "",
                        perfect: isVerb ? perfect : "",
                        supine: isVerb ? supine : ""
                    },

                    meanings: meaningsText
                        .split(",")
                        .map(m => m.trim())
                        .filter(Boolean)
                })
            });

            if (!res.ok) {
                throw new Error("Failed to save lemma");
            }

            const data = await res.json();
            setStatus(`Saved (id: ${data.id})`);

        } catch (err) {
            setStatus("Error saving lemma");
        }

        setLoading(false);
    }

    return (
        <Wrapper>

            <Title>Admin Dictionary Editor</Title>

            <Input
                placeholder="lemma (e.g. luna)"
                value={lemma}
                onChange={(e) => setLemma(e.target.value)}
            />

            <Input
                placeholder="lemma display (e.g. lūna)"
                value={lemmaDisplay}
                onChange={(e) => setLemmaDisplay(e.target.value)}
            />

            {/* TYPE */}
            <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">type</option>
                <option value="noun">noun</option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="pronoun">pronoun</option>
                <option value="adverb">adverb</option>
                <option value="preposition">preposition</option>
                <option value="conjunction">conjunction</option>
            </Select>

            {/* GENDER */}
            <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="">gender</option>
                <option value="masculine">masculine</option>
                <option value="feminine">feminine</option>
                <option value="neuter">neuter</option>
            </Select>

            {/* DECLENSION (NOMINAL ONLY) */}
            {isNominal && (
                <Select
                    value={declension}
                    onChange={(e) => setDeclension(e.target.value)}
                >
                    <option value="">declension</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                </Select>
            )}

            {/* CONJUGATION (VERB ONLY) */}
            {isVerb && (
                <>
                    <Select
                        value={conjugation}
                        onChange={(e) => setConjugation(e.target.value)}
                    >
                        <option value="">conjugation</option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                    </Select>

                    <Input
                        placeholder="stem (e.g. ama, reg, aud)"
                        value={stem}
                        onChange={(e) => setStem(e.target.value)}
                    />

                    <Input
                        placeholder="perfect stem (e.g. amav, rex)"
                        value={perfect}
                        onChange={(e) => setPerfect(e.target.value)}
                    />

                    <Input
                        placeholder="supine stem (e.g. amat, rect)"
                        value={supine}
                        onChange={(e) => setSupine(e.target.value)}
                    />
                </>
            )}

            <TextArea
                placeholder="definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
            />

            <TextArea
                placeholder="meanings (comma separated: moon, moonlight)"
                value={meaningsText}
                onChange={(e) => setMeaningsText(e.target.value)}
            />

            <Row>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save Lemma"}
                </Button>
            </Row>

            {status && (
                <p style={{ marginTop: "15px", fontSize: "16px" }}>
                    {status}
                </p>
            )}

        </Wrapper>
    );
}

export default AdminLemmaEditor;