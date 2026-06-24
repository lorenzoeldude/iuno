import styled from "styled-components";
import { useState } from "react";
import NounFormEditor from "../Editors/NounFormEditor";
import AdjectiveFormEditor from "../Editors/AdjectiveFormEditor";
import VerbFormEditor from "../Editors/VerbFormEditor";
import Input from "../../styled/Input";
import PronounFormEditor from "../Editors/PronounFormEditor";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0 auto;
`;

const TopDiv = styled.div`
    width: 50%;
`; 

const BelowDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
`;

const RowDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
`;

const Left = styled.div`

`;

const Right = styled.div`
    // border: 1px solid black;
    // height: 400px;
`;

const SectionTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 10px;
`;

const Lemma = styled(Input)`
    font-family: "Montserrat", sans-serif;
    font-size: 50px;
    font-weight: 700;
    box-shadow: none;
    text-align: center;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    font-size: 15px;
    margin-bottom: 15px;
    // border: 1px solid rgba(201, 201, 201, 0.2);
    border: none;
    min-height: 20px;
    resize: none;
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    font-size: 18px;
    margin-bottom: 15px;
    border: 1px solid rgba(142, 142, 142, 0.1);
    background: white;
`;

const Button = styled.button`
    padding: 15px 24px;
    font-size: 16px;
    border: none;
    border-radius: 999px;
    cursor: pointer;

    background: rgba(72, 72, 72, 1);
    color: white;
    
    margin-top: 30px;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover {
        background: rgba(0, 0, 0, 1);
    }
`;

const Line = styled.hr`
    border: none;
    height: 1px;
    background: rgba(0,0,0,0.08);
    margin: 30px 0;
`;

const Row = styled.div`
    display: flex;
    gap: 10px;
`;

const Note = styled.p`
    font-size: 20px;
    margin: 20px 0;
`;

function AdminLemmaEditor() {

    const [lemma, setLemma] = useState("");
    // const [lemmaNormalized, setLemmaNormalized] = useState("");
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
    const isPronoun = partOfSpeech === "pronoun";

    const [pronounType, setPronounType] = useState("");

    const [manualForms, setManualForms] = useState([]);

    const supportsMorphology = isNoun || isAdjective || isVerb || isPronoun;

    console.log("manual forms: ", manualForms);

    console.log("pronounType: ", pronounType, isPronoun)

    async function loadLemma() {
        const res = await fetch(
            `http://localhost:8080/api/word/${lemma}`
        );

        if (!res.ok) {
            setStatus("Lemma not found");
            return;
        }

        const data = await res.json();

        setPartOfSpeech(data.lemma.part_of_speech);
        setGender(data.lemma.gender || "");
        setDeclension(data.lemma.declension || "");
        setConjugation(data.lemma.conjugation || "");

        setGenitive(data.lemma.genitive || "");
        setPerfect(data.lemma.perfect || "");
        setSupine(data.lemma.supine || "");
        setInfinitive(data.lemma.infinitive || "");

        setFeminine(data.lemma.feminine || "");
        setNeuter(data.lemma.neuter || "");

        setIrregular(data.lemma.irregular);

        setManualForms(data.forms);

        setMeaningsText(
            data.meanings
                .map(m =>
                    m.governs_case
                        ? `${m.governs_case}|${m.meaning}`
                        : m.meaning
                )
                .join(";")
        );

        setDefinitions(
            data.definitions
                .map(d => d.definition)
                .join("\n")
        );

        setDerivatives(
            data.derivatives
                .map(d => d.derivative)
                .join(", ")
        );

        setExample1(data.examples[0]?.latin || "");
        setExample2(data.examples[1]?.latin || "");
        setExample3(data.examples[2]?.latin || "");
    }

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
                        pronoun_type: isPronoun ? pronounType : "",
                    },

                    manual_forms: manualForms,

                    examples: [example1, example2, example3],

                    meanings: meaningsText
                        .split(";")
                        .map(line => line.trim())
                        .filter(Boolean)
                        .map(line => {
                            const [governsCase, translation] = line.split("|");

                            return {
                                meaning: (translation ?? governsCase).trim(),
                                governs_case: translation
                                    ? governsCase.trim()
                                    : null,
                            };
                        }),
                    
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
            <TopDiv>

            <Lemma
                placeholder="lemma"
                value={lemma}
                onChange={(e) => setLemma(e.target.value)}
                onBlur={() => loadLemma(lemma)}
            />

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

            {isPronoun && (
                <Select
                    value={pronounType}
                    onChange={(e) => setPronounType(e.target.value)}
                >
                    <option value="personal">personal</option>
                    <option value="reflexive">reflexive</option>
                    <option value="demonstrative">demonstrative</option>
                    <option value="relative">relative</option>
                    <option value="interrogative">interrogative</option>
                    <option value="indefinite">indefinite</option>
                    <option value="possessive">possessive</option>
                </Select>
            )}


            {/* GENDER (NOUNS ONLY) */}
            {isNoun && (
                <RowDiv>
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">gender</option>
                        <option value="masculine">masculine</option>
                        <option value="feminine">feminine</option>
                        <option value="neuter">neuter</option>
                    </Select>
                </RowDiv>
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
                                <option value="3">3: consonant stem</option>
                                <option value="31">31: mixed i-stem</option>
                                <option value="32">32: pure i-stem</option>
                                <option value="33">33: neuter i-stem</option>
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
                </>
            )}
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
                        <option value="31">3rd IO</option>
                        <option value="4">4th</option>
                    </Select>
                </>
            )}

            <RowDiv>
            {(isAdjective || isNoun) && (
                <>
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
            
            {isVerb && (
                <>

                    <RowDiv>
                        <Input
                            placeholder="infinitive"
                            value={infinitive}
                            onChange={(e) => setInfinitive(e.target.value)}
                        />
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

                    </RowDiv>
                </>
            )}
            </RowDiv>
            <Line />
            </TopDiv>


            <BelowDiv>

                <Left>
                    <SectionTitle>Translation</SectionTitle>
                    <TextArea
                        placeholder={`|and
                    ablative|with
                    accusative|to, toward`}
                        value={meaningsText}
                        onChange={(e) => setMeaningsText(e.target.value)}
                    />

                    <SectionTitle>Definition</SectionTitle>
                    <TextArea
                        placeholder="definition"
                        value={definitions}
                        onChange={(e) => setDefinitions(e.target.value)}
                    />

                    <SectionTitle>Examples</SectionTitle>
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

                    <SectionTitle>Derivatives</SectionTitle>
                    <TextArea
                        placeholder="derivatives (comma separated)"
                        value={derivatives}
                        onChange={(e) => setDerivatives(e.target.value)}
                    />
                </Left>

                {supportsMorphology && (

                <Right>
                    <SectionTitle>Morphology</SectionTitle>
                    <Select
                        value={irregular ? "true" : "false"}
                        onChange={(e) => setIrregular(e.target.value === "true")}
                    >
                        <option value="false">regular</option>
                        <option value="true">irregular</option>
                    </Select>

                    {!irregular && (
                        <Note>Morphology automatically created</Note>
                    )}
                    
                    {isNoun && irregular && (
                        <NounFormEditor
                            forms={manualForms}
                            setForms={setManualForms}
                            gender={gender}
                        />
                    )}
                    
                    {isAdjective && irregular && (
                        <AdjectiveFormEditor
                            forms={manualForms}
                            setForms={setManualForms}
                        />
                    )}

                    {isVerb && irregular && (
                        <VerbFormEditor
                            forms={manualForms}
                            setForms={setManualForms}
                        />
                    )}

                    {isPronoun && irregular && (
                        <PronounFormEditor
                            forms={manualForms}
                            setForms={setManualForms}
                            pronounType={pronounType}
                        />
                    )}

                

                </Right>
                )}
            </BelowDiv>

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