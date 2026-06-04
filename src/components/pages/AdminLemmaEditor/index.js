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
    const [lemmaNormalized, setLemmaNormalized] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [gender, setGender] = useState("");
    const [irregular, setIrregular] = useState(false);

    const [definitions, setDefinitions] = useState("");
    const [meaningsText, setMeaningsText] = useState("");

    const [derivatives, setDerivatives] = useState("");

    // examples
    const [example1, setExample1] = useState("");
    const [example2, setExample2] = useState("");
    const [example3, setExample3] = useState("");

    // grammar fields
    const [declension, setDeclension] = useState("");
    const [conjugation, setConjugation] = useState("");
    const [genitive, setGenitive] = useState("");

    // verb-only fields
    const [perfect, setPerfect] = useState("");
    const [supine, setSupine] = useState("");
    const [infinitive, setInfinitive] = useState("");

    // adjective-only fields
    const [feminine, setFeminine] = useState("");
    const [neuter, setNeuter] = useState("");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const isVerb = partOfSpeech === "verb";
    const isAdjective = partOfSpeech === "adjective";
    const isNoun = partOfSpeech === "noun";
    // const isPronoun = partOfSpeech === "pronoun";
    // const isNominal = partOfSpeech === "noun" || partOfSpeech === "adjective" || partOfSpeech === "pronoun";

    async function handleSubmit() {
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("http://localhost:8080/api/admin/write-word/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lemma: {
                        lemma,
                        lemma_normalized: lemmaNormalized,
                        part_of_speech: partOfSpeech,
                        gender,
                        irregular,
                        
                        declension: (isNoun || isAdjective) && declension !== ""
                            ? parseInt(declension, 10)
                            : null,

                        conjugation: isVerb
                            ? Number(conjugation) || 0
                            : 0,

                        genitive: (isNoun || isAdjective) ? genitive : "",

                        infinitive: isVerb ? infinitive : "",
                        perfect: isVerb ? perfect : "",
                        supine: isVerb ? supine : "",

                        feminine: isAdjective ? feminine : "",
                        neuter: isAdjective ? neuter : "",
                    },

                    examples: [example1, example2, example3],

                    meanings: meaningsText
                        .split(",")
                        .map(m => m.trim())
                        .filter(Boolean),
                    
                    definitions: definitions
                        .split("\n")
                        .map(d => d.trim())
                        .filter(Boolean),

                    derivatives: derivatives
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
                placeholder="lemma (e.g. lūna)"
                value={lemma}
                onChange={(e) => setLemma(e.target.value)}
            />

            <Input
                placeholder="lemma normalized (e.g. luna)"
                value={lemmaNormalized}
                onChange={(e) => setLemmaNormalized(e.target.value)}
            />

            <Select
                value={irregular ? "true" : "false"}
                onChange={(e) => setIrregular(e.target.value === "true")}
            >
                <option value="false">regular</option>
                <option value="true">irregular</option>
            </Select>

            {/* part_of_speech */}
            <Select
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
            >
                <option value="">part of speech</option>
                <option value="noun">noun</option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="pronoun">pronoun</option>
                <option value="adverb">adverb</option>
                <option value="preposition">preposition</option>
                <option value="conjunction">conjunction</option>
            </Select>


            {/* GENDER (NOUNS ONLY) */}
            {isNoun && (
                <>
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">gender</option>
                        <option value="masculine">masculine</option>
                        <option value="feminine">feminine</option>
                        <option value="neuter">neuter</option>
                    </Select>
                </>
            )}

            {/* DECLENSION */}
            {(isAdjective || isNoun) && (
                <>
                    <Select
                        value={declension}
                        onChange={(e) => setDeclension(e.target.value)}
                    >
                        <option value="">declension</option>

                        {isNoun ? (
                            <>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="4">4th</option>
                                <option value="5">5th</option>
                            </>
                        ) : (
                            <>
                                <option value="12">
                                    1st/2nd Declension
                                </option>

                                <option value="31">
                                    3rd Declension (1 termination)
                                </option>

                                <option value="32">
                                    3rd Declension (2 terminations)
                                </option>

                                <option value="33">
                                    3rd Declension (3 terminations)
                                </option>
                            </>
                        )}
                    </Select>

                    <Input
                        placeholder="genitive"
                        value={genitive}
                        onChange={(e) => setGenitive(e.target.value)}
                    />
                </>
            )}

            {/* ADJECTIVE ONLY */}
            {isAdjective && (
                <>
                    <Input
                            placeholder="feminine (nominative singular)"
                            value={feminine}
                            onChange={(e) => setFeminine(e.target.value)}
                        />

                    <Input
                        placeholder="neuter (nominative singular)"
                        value={neuter}
                        onChange={(e) => setNeuter(e.target.value)}
                        />
                </>
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
                        placeholder="perfect (e.g. amavī)"
                        value={perfect}
                        onChange={(e) => setPerfect(e.target.value)}
                    />

                    <Input
                        placeholder="supine (e.g. amātum)"
                        value={supine}
                        onChange={(e) => setSupine(e.target.value)}
                    />

                    <Input
                        placeholder="infinitve"
                        value={infinitive}
                        onChange={(e) => setInfinitive(e.target.value)}
                    />
                </>
            )}

            <TextArea
                placeholder="definition"
                value={definitions}
                onChange={(e) => setDefinitions(e.target.value)}
            />

            {/* Examples */}
            <TextArea
                placeholder="example1"
                value={example1}
                onChange={(e) => setExample1(e.target.value)}
            />
            <TextArea
                placeholder="example2"
                value={example2}
                onChange={(e) => setExample2(e.target.value)}
            />
            <TextArea
                placeholder="example3"
                value={example3}
                onChange={(e) => setExample3(e.target.value)}
            />

            <TextArea
                placeholder="meanings (comma separated: moon, moonlight)"
                value={meaningsText}
                onChange={(e) => setMeaningsText(e.target.value)}
            />

            <TextArea
                placeholder="derivatives (comma separated: lunar, lunatic)"
                value={derivatives}
                onChange={(e) => setDerivatives(e.target.value)}
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