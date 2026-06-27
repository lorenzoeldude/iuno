import styled from "styled-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../atoms/ProgressBar";
import ArrowButton from "../../atoms/ArrowButton";
import LessonLayout from "../../layout/LessonLayout";
import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

const UnderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 400px);
    position: relative;
    box-sizing: border-box;
`;

const ProgressWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ArrowDiv = styled.div`
    position: fixed;
    bottom: 45px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 35px;
    z-index: 10;
`;

const TextDiv = styled.div`
    // width: 90%;
    max-width: 1000px;
    text-align: center;

    // border: 1px solid red;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const FirstText = styled.p`
    font-size: clamp(28px, 3.5vw, 50px);
    text-align: center;
    line-height: 1.4;
    margin: 0;

    &::first-letter {
        color: red;
        font-size: 1.8em;
        font-weight: bold;
    }
`;

const Text = styled.div`
    font-size: clamp(24px, 3vw, 45px);
    text-align: center;
    line-height: 1.4;

    // border: 1px solid black;

    p {
        margin: 5px 0;
    }
`;

const Image = styled.img`
    width: 60%;
    max-height: 50vh;
    object-fit: contain;
`;

function Textus () {

    const sentences2 = [
        "Rōma in Italiā est. Italia in Eurōpā est.",
        "Graecia in Eurōpā est. Italia et Graecia in Eurōpā sunt. Hispānia quoque in Eurōpā est. Hispānia et Italia et Graecia in Eurōpā sunt.",
        "Aegyptus in Eurōpā nōn est, Aegyptus in Āfricā est. Gallia nōn in Āfricā est, Gallia est in Eurōpā.",
        "Syria nōn est in Eurōpā, sed in Asiā. Arabia quoque in Asiā est. Syria et Arabia in Asiā sunt.",
        "Germānia nōn in Asiā, sed in Eurōpā est. Britannia quoque in Eurōpā est.",
        "Estne Gallia in Eurōpā? Gallia in Eurōpā est. Estne Rōma in Galliā? Rōma in Galliā nōn est.",
        "Ubi est Rōma? Rōma est in Italiā. Ubi est Italia? Italia in Eurōpā est.",
        "Ubi sunt Gallia et Hispānia? Gallia et Hispānia in Eurōpā sunt.",
        "Estne Nīlus in Eurōpā? Nīlus in Eurōpā nōn est. Ubi est Nīlus? Nīlus in Āfricā est.",
        "Rhēnus ubi est? Rhēnus est in Germāniā.",
        "Nīlus fluvius est. Rhēnus fluvius est. Nīlus et Rhēnus fluviī sunt.",
        "Rhēnus et Dānuvius sunt fluviī in Germāniā. Tiberis fluvius in Italiā est.",
        "Tiberis nōn est fluvius magnus, Tiberis fluvius parvus est.",
        "Nīlus et Rhēnus nōn fluviī parvī, sed fluviī magnī sunt.",
        "Corsica īnsula est. Corsica et Sardinia et Sicilia īnsulae sunt.",
        "Sicilia īnsula magna est. Melita est īnsula parva.",
        "Sicilia et Sardinia nōn īnsulae parvae, sed īnsulae magnae sunt.",
        "Brundisium oppidum est. Brundisium et Tūsculum oppida sunt.",
        "Brundisium est oppidum magnum. Tūsculum oppidum parvum est.",
        "Delphī quoque oppidum parvum est.",
        "Ubi est Sparta? Sparta est in Graeciā.",
        "Sparta et Delphī oppida Graeca sunt.",
        "Tūsculum et Brundisium sunt oppida Rōmāna.",
        "Crēta, Rhodus, Naxus, Samos, Chios, Lesbos sunt īnsulae Graecae.",
        "In Italiā et in Graeciā sunt multa oppida."
    ];

    const sentences = [
        "Rōma in Italiā est. Italia pulchra est.",
        "Rōma magna urbs est. Multī virī et multae fēminae in Rōmā habitant. Rōma caput est.",
        "In Italiā multī fluviī sunt. Padus fluvius longus est. Tiberis quoque fluvius longus est.",
        "Italia in Eurōpā est. Germania quoque in Eurōpā est. Syria non in Eurōpā est.",
        "In Italiā multae urbes sunt. Rōma urbs antiqua est. Italia terra magna est.",
        "Populus Rōmānus magnus est. Rōmānī Italiam amant. Rōma pulchra et clara est."
    ];

    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    const nextSentence = () => {
        if (index < sentences.length - 1) {
            setIndex(index + 1);
        } else {
            navigate("/lesson/1/vocabula");
        }
    };

    const previousSentence = () => {
        if (index !== 0) {
            setIndex(index - 1);
        }
    };

    const wrapperRef = useRef(null);

    const {
        popup,
        entry,
        lookupWord,
        closePopup,
    } = useDictionaryLookup();

    const progress = (index / (sentences.length - 1)) * 100;


    return (
        <LessonLayout active={"textus"}>

            <UnderWrapper ref={wrapperRef}>

                <ProgressWrapper>
                    <ProgressBar progress={progress}/>
                </ProgressWrapper>

                <ContentWrapper>

                    {/* <Head>
                        {progress === 0 && (
                            <Image src={"/test3.png"} alt="luna"/>
                        )}
                    </Head> */}

                    <TextDiv>

                        {progress === 0 ? (
                            <FirstText>
                                <ClickableText
                                    text={sentences[index]}
                                    onWordClick={(word,e)=>
                                        lookupWord(word,e,wrapperRef)
                                    }
                                />
                            </FirstText>
                        ) : (
                            <Text>
                                {sentences[index]
                                    .split(".  ")
                                    .map((sentence,index)=>
                                        sentence.trim() &&
                                        <p key={index}>
                                            <ClickableText
                                                text={sentence}
                                                onWordClick={(word,e)=>
                                                    lookupWord(word,e,wrapperRef)
                                                }
                                            />
                                        </p>
                                    )}
                            </Text>
                        )}

                        <DictionaryPopup
                            popup={popup}
                            entry={entry}
                            onClose={closePopup}
                        />

                    </TextDiv>

                </ContentWrapper>

            </UnderWrapper>


            <ArrowDiv>
                <ArrowButton onClick={previousSentence}>
                    {"<"}
                </ArrowButton>

                <ArrowButton onClick={nextSentence}>
                    {">"}
                </ArrowButton>
            </ArrowDiv>

        </LessonLayout>
    );
}

export default Textus;