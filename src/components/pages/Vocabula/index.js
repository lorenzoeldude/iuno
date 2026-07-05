import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../../atoms/ArrowButton";
import AnswerButton from "../../atoms/Answerbutton";
import LessonLayout from "../../layout/LessonLayout";

const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
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

const Verbum = styled.p`
    font-size: clamp(40px, 6vw, 60px);
    text-decoration: underline;
    margin-bottom: 40px;
    text-align: center;

    color: ${(props) => {
        if (props.state === 1) return "green";
        if (props.state === 2) return "red";
        return props.theme.colors.text;
    }};
`;

const Answers = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
`;

function Vocabula() {
    const vocabulas = [
    "Rōma",
    "Italia",
    "Eurōpa",
    "urbs",
    "antīqua",
    "magnus",
    "pulcher",
    "habitāre",
    "vir",
    "fēmina",
    "puer",
    "puella",
    "ambulāre",
    "caput",
    "imperium",
    "urbs",
    "īnsula",
    "Sicilia",
    "Sardinia",
    "fluvius",
    "Padus",
    "Tiberis",
    "Nīlus",
    "Aegyptus",
    "Āfrica",
    "aedificium",
    "vidēre",
    "dīcere"
];

const answers = [
    ["river", "Rome", "island"],           // Rōma
    ["Italy", "Africa", "Greece"],         // Italia
    ["city", "empire", "Europe"],          // Eurōpa
    ["river", "city", "building"],         // urbs
    ["ancient", "beautiful", "large"],     // antīqua
    ["small", "ancient", "large"],         // magnus
    ["Roman", "beautiful", "old"],         // pulcher
    ["to live", "to walk", "to see"],      // habitāre
    ["boy", "woman", "man"],               // vir
    ["city", "woman", "girl"],             // fēmina
    ["boy", "man", "girl"],                // puer
    ["woman", "island", "girl"],           // puella
    ["to live", "to walk", "to say"],      // ambulāre
    ["head", "building", "capital"],       // caput
    ["city", "country", "empire"],         // imperium
    ["island", "city", "river"],           // urbs
    ["island", "building", "road"],        // īnsula
    ["Spain", "Gaul", "Sicily"],           // Sicilia
    ["Italy", "Sardinia", "Greece"],       // Sardinia
    ["river", "building", "road"],         // fluvius
    ["Nile", "Tiber", "Po River"],         // Padus
    ["Po River", "Tiber", "Nile"],         // Tiberis
    ["Nile", "Tiber", "Po River"],         // Nīlus
    ["Africa", "Italy", "Egypt"],          // Aegyptus
    ["Europe", "Asia", "Africa"],          // Āfrica
    ["building", "city", "island"],        // aedificium
    ["to walk", "to say", "to see"],       // vidēre
    ["to live", "to say", "to see"]        // dīcere
];

const correctAnswer = [
    1, // Rōma
    0, // Italia
    2, // Eurōpa
    1, // Urbs
    0, // Antīqua
    2, // Magnus
    1, // Pulcher
    0, // Habitō
    2, // Vir
    1, // Fēmina
    0, // Puer
    2, // Puella
    1, // Ambulō
    2, // Caput
    2, // Imperium
    1, // Urbs
    0, // Īnsula
    2, // Sicilia
    1, // Sardinia
    0, // Fluvius
    2, // Padus
    1, // Tiberis
    0, // Nīlus
    2, // Aegyptus
    2, // Āfrica
    0, // Aedificium
    2, // Videō
    1  // Dīcō
];

    const [selected, setSelected] = useState(null);
    const [step, setStep] = useState(0);

    const navigate = useNavigate();

    function Next() {
        if (step < vocabulas.length - 1) {
            setStep(step + 1);
            setSelected(null);
        } else {
            navigate("/lesson/1/grammatica");
        }
    }

    const progress = (step / (vocabulas.length - 1)) * 100;

    return (
        <LessonLayout
            active="vocabula"
            completed={["textus"]}
            progress={progress}
        >
            <Wrapper>
                <Content>
                    <Verbum
                        state={
                            selected !== null
                                ? selected === correctAnswer[step]
                                    ? 1
                                    : 2
                                : 0
                        }
                    >
                        {vocabulas[step]}
                    </Verbum>

                    <Answers>
                        {answers[step].map((answer, index) => (
                            <AnswerButton
                                key={index}
                                index={index}
                                correct={correctAnswer[step]}
                                selected={selected}
                                setSelected={setSelected}
                            >
                                {answer}
                            </AnswerButton>
                        ))}
                    </Answers>
                </Content>
            </Wrapper>

            {selected !== null && (
                <ArrowDiv>
                    <ArrowButton
                        onClick={Next}
                        state={
                            selected === correctAnswer[step]
                                ? 1
                                : 2
                        }
                    >
                        {">"}
                    </ArrowButton>
                </ArrowDiv>
            )}
        </LessonLayout>
    );
}

export default Vocabula;