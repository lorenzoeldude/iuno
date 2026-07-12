import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";
import NavigationButton from "../../atoms/NavigationButton";
import useSoundEffects from "../../../hooks/useSoundEffects";

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Content = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem 0 100px;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(28px, 4vw, 42px);
    text-decoration: underline;
    text-align: center;
    margin-bottom: 30px;
`;

const Question = styled.p`
    font-size: clamp(28px, 4vw, 42px);
    text-align: center;
    line-height: 1.5;
    margin-bottom: 40px;
`;

const Answers = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 18px;
`;

const ResultText = styled.p`
    font-size: clamp(28px, 4vw, 40px);
    text-align: center;
    margin: 12px 0;
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
`;

function Examinatio() {
    const navigate = useNavigate();
    const sounds = useSoundEffects();
    const questions = [
        {
            type: "vocab",
            question: "Quid est urbs?",
            options: ["city", "river", "island"],
            correct: "city"
        },
        {
            type: "vocab",
            question: "Quid est fluvius?",
            options: ["river", "mountain", "road"],
            correct: "river"
        },
        {
            type: "vocab",
            question: "Quid est īnsula?",
            options: ["island", "city", "woman"],
            correct: "island"
        },
        {
            type: "vocab",
            question: "Quid est aedificium?",
            options: ["building", "road", "boy"],
            correct: "building"
        },
        {
            type: "vocab",
            question: "Quid est imperium?",
            options: ["empire", "river", "house"],
            correct: "empire"
        },
        {
            type: "grammar",
            before: "Multī puer",
            after: " in Rōmā habitant.",
            options: ["ī", "us"],
            correct: "ī"
        },
        {
            type: "grammar",
            before: "Multae puell",
            after: " in Rōmā habitant.",
            options: ["ae", "a"],
            correct: "ae"
        },
        {
            type: "grammar",
            before: "Aedifici",
            after: " magna sunt.",
            options: ["a", "um"],
            correct: "a"
        },
        {
            type: "grammar",
            before: "Imperium Rōmānum magn",
            after: " est.",
            options: ["um", "a"],
            correct: "um"
        },
        {
            type: "grammar",
            before: "Multī fluvi",
            after: " in Italiā sunt.",
            options: ["ī", "us"],
            correct: "ī"
        },
        {
            type: "text",
            question: "Ubi est Rōma?",
            options: ["In Italiā", "In Graeciā", "In Aegyptō"],
            correct: "In Italiā"
        },
        {
            type: "text",
            question: "Quis in via ambulat?",
            options: ["Marcus", "Padus", "Tiberis"],
            correct: "Marcus"
        },
        {
            type: "text",
            question: "Quid est caput imperiī Rōmānī?",
            options: ["Rōma", "Graecia", "Sicilia"],
            correct: "Rōma"
        },
        {
            type: "text",
            question: "Quae īnsula magna est?",
            options: ["Sicilia", "Italia", "Europa"],
            correct: "Sicilia"
        },
        {
            type: "text",
            question: "Ubi est Nilus?",
            options: ["In Aegyptō", "In Italiā", "In Hispāniā"],
            correct: "In Aegyptō"
        },
        {
            type: "grammar",
            before: "Tiberis fluvius long",
            after: " est.",
            options: ["us", "a"],
            correct: "us"
        },
        {
            type: "vocab",
            question: "Quid est femina?",
            options: ["woman", "man", "girl"],
            correct: "woman"
        },
        {
            type: "text",
            question: "Quid Marcus videt?",
            options: ["Multa aedificia", "Multās īnsulās", "Nilum"],
            correct: "Multa aedificia"
        },
        {
            type: "grammar",
            before: "Multae urb",
            after: " in imperiō Rōmānō sunt.",
            options: ["ēs", "is"],
            correct: "ēs"
        },
        {
            type: "text",
            question: "Estne Aegyptus in Eurōpā?",
            options: ["Nōn", "Ita"],
            correct: "Nōn"
        }
    ];

    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);

    const current = questions[step];

    const progress = (step / questions.length) * 100;

    function nextQuestion() {
        if (selected === current.correct) {
            setScore(score + 1);
        }

        setStep(step + 1);
        setSelected(null);
    }

    // function getRank() {
    //     if (score >= 18) return "Magister";
    //     if (score >= 14) return "Discipulus";
    //     if (score >= 10) return "Tiro";

    //     return "Novicius";
    // }

    if (step >= questions.length) {
        return (
            <LessonLayout
                active="examinatio"
                progress={100}
            >
                <Wrapper>
                    <Content>
                        <Title>Exāminātiō Perfecta</Title>

                        <ResultText>
                            Puncta: {score} / {questions.length}
                        </ResultText>

                        {/* <ResultText>
                            Gradus: {getRank()}
                        </ResultText> */}

                        <div style={{ marginTop: "40px" }}>
                            <NavigationButton onClick={() => navigate("/lesson")}>
                                Finish Lesson
                            </NavigationButton>
                        </div>
                    </Content>
                </Wrapper>
            </LessonLayout>
        );
    }

    return (
        <LessonLayout
            active="examinatio"
            completed={["textus", "vocabula", "grammatica"]}
            progress={progress}
        >
            <Wrapper>
                <Content>
                    <Question>
                        {current.type === "grammar" ? (
                            <>
                                {current.before}

                                <span
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    {selected !== null
                                        ? current.correct
                                        : "_"}
                                </span>

                                {current.after}
                            </>
                        ) : (
                            current.question
                        )}
                    </Question>

                    <Answers>
                        {current.options.map((option) => (
                            <AnswerButton
                                key={option}
                                index={option}
                                correct={current.correct}
                                selected={selected}
                                setSelected={setSelected}
                                sounds={sounds}
                            >
                                {option}
                            </AnswerButton>
                        ))}
                    </Answers>
                </Content>
            </Wrapper>

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton onClick={nextQuestion}>
                        {step === questions.length - 1
                            ? "Finish"
                            : ">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Examinatio;