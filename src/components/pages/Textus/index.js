import styled from "styled-components";
import Navigatio from "../../molecules/Navigatio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../atoms/ProgressBar";
import ArrowButton from "../../atoms/ArrowButton";
import LessonLayout from "../../layout/LessonLayout";

const Wrapper = styled.div`
    display: flex;
    // background-color: grey;
    width: 90%;
    justify-content: space-between;
`;

const UnderWrapper = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    align-items: center;
    min-height: 400px;
`;

const ContentDiv = styled.div`
    margin: 0 100px;
    width: 100%;
`;

const ArrowDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const TextDiv = styled.div`
    width: 100%;
`;

const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border: 0.3px solid black;
`;

const Title = styled.h1`
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    font-size: 30px;
    text-decoration: underline;
`;

const Title2 = styled.h2`
    font-family: "Cormorant Garamond", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 20px;
    text-decoration: underline;
`;

const FirstText = styled.p`
    font-size: 35px;

    &::first-letter {
    color: red;
    font-size: 2em;
    font-weight: bold;
  }
`;

const Text = styled.p`
    font-size: 35px;
`;

const Image = styled.img`
    width: 400px;
    height: auto;
    margin-bottom: 20px 0;
`;



function Textus () {
    const sentences = [
    "Rōma in Italiā est. Italia in Eurōpā est.",
    "Graecia in Eurōpā est. Italia et Graecia in Eurōpā sunt.  Hispānia quoque in Eurōpā est. Hispānia et Italia et Graecia in Eurōpā sunt.",
    "Aegyptus in Eurōpā nōn est, Aegyptus in Āfricā est.  Gallia nōn in Āfricā est, Gallia est in Eurōpā.",
    "Syria nōn est in Eurōpā, sed in Asiā..  Arabia quoque in Asiā est. Syria et Arabia in Asiā sunt.",
    "Germānia nōn in Asiā, sed in Eurōpā est..  Britannia quoque in Eurōpā est. Germānia et Britannia sunt in Eurōpā.", 
    "Estne Gallia in Eurōpā? Gallia in Eurōpā est..  Estne Rōma in Galliā? Rōma in Galliā nōn est.", 
    "Ubi est Rōma? Rōma est in Italiā..  Ubi est Italia? Italia in Eurōpā est.",
    "Ubi sunt Gallia et Hispānia?.  Gallia et Hispānia in Eurōpā sunt.", 
    "Estne Nīlus in Eurōpā? Nīlus in Eurōpā nōn est..  Ubi est Nīlus? Nīlus in Āfricā est.",
    "Rhēnus ubi est?.  Rhēnus est in Germāniā..  ",
    "Nīlus fluvius est. Rhēnus fluvius est..  Nīlus et Rhēnus fluviī sunt..  Dānuvius quoque fluvius est.",
    "Rhēnus et Dānuvius sunt fluviī in Germāniā..  Tiberis fluvius in Italiā est..  Nīlus fluvius magnus est.",
    "Tiberis nōn est fluvius magnus, Tiberis fluvius parvus est..  Rhēnus nōn est fluvius parvus, sed fluvius magnus.",
    "Nīlus et Rhēnus nōn fluviī parvī, sed fluviī magnī sunt..  Dānuvius quoque fluvius magnus est.",
    "Corsica īnsula est. Corsica et Sardinia et Sicilia īnsulae sunt..  Britannia quoque īnsula est. Italia īnsula nōn est. ",
    "Sicilia īnsula magna est. Melita est īnsula parva..  Britannia nōn īnsula parva, sed īnsula magna est.",
    "Sicilia et Sardinia nōn īnsulae parvae, sed īnsulae magnae sunt.",
    "Brundisium oppidum est. Brundisium et Tūsculum oppida sunt..  Sparta quoque oppidum est.",
    "Brundisium est oppidum magnum..  Tūsculum oppidum parvum est.",
    "Delphī quoque oppidum parvum est..  Tūsculum et Delphī nōn oppida magna, sed oppida parva sunt.",
    "Ubi est Sparta? Sparta est in Graeciā..  Sparta est oppidum Graecum.",
    "Sparta et Delphī oppida Graeca sunt..  Tūsculum nōn oppidum Graecum, sed oppidum Rōmānum est.",
    "Tūsculum et Brundisium sunt oppida Rōmāna..  Sardinia īnsula Rōmāna est.",
    "Crēta, Rhodus, Naxus, Samos, Chios, Lesbos, Lēmnos, Euboea sunt īnsulae Graecae..  In Graeciā multae īnsulae sunt.",
    "In Italiā et in Graeciā sunt multa oppida."
    ];

    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    const nextSentence = () => {

    if (index < sentences.length - 1) {
        setIndex(index + 1);
    } else {
        navigate("/lectiones/1/vocabula");
    }
}

    const previousSentence = () => {
        if (index != 0) {
            setIndex(index - 1);
        };
    }

    const progress = (index / (sentences.length - 1)) * 100;

    return (
        <LessonLayout active={"textus"}>
            <UnderWrapper>
                <Title>CAPITVLVM VNVM</Title>

                <ProgressBar progress={progress} />

                <Head>
                    {(progress == 0) && (
                        <Image src={"/test3.png"} alt="luna" />
                    )}
                </Head>

                <TextDiv>
                    {
                    (progress == 0) ? (
                        <FirstText>{sentences[index]}</FirstText>
                    ) : (
                        <>
                            <Text>
                                {sentences[index].split(".  ").map((sentence, index) => (
                                    sentence.trim() && (
                                        <>
                                        <p key={index}>
                                        {sentence}
                                        </p>
                                        <br/>
                                        </>
                                    )
                                    ))}
                            </Text><br/>
                        </>
                    )
                }
                </TextDiv>
            </UnderWrapper>

            <ArrowDiv>
                <ArrowButton onClick={previousSentence}>{"<"}</ArrowButton>
                <ArrowButton onClick={nextSentence}>{">"}</ArrowButton>
            </ArrowDiv>

        </LessonLayout>
    );
}

export default Textus;