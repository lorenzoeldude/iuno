import styled from "styled-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowButton from "../../atoms/ArrowButton";
import LessonLayout from "../../layout/LessonLayout";
import ClickableText from "../../atoms/ClickableText";
import DictionaryPopup from "../../atoms/DictionaryPopup";
import useDictionaryLookup from "../../../hooks/useDictionaryLookups";

const UnderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem 0 7rem;
`;

const TextDiv = styled.div`
    width: min(760px, 100%);
`;

const FirstText = styled.p`
    font-size: clamp(30px, 3vw, 50px);
    line-height: 1.7;
    text-align: left;
    margin: 0;
    white-space: pre-line;

    &::first-letter {
        color: red;
        font-size: 1.8em;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        font-size: clamp(24px, 6vw, 34px);
        line-height: 1.6;
    }
`;

const Text = styled.div`
    font-size: clamp(28px, 2.8vw, 44px);
    line-height: 1.7;
    text-align: left;
    white-space: pre-line;

    @media (max-width: 768px) {
        font-size: clamp(22px, 5.5vw, 32px);
        line-height: 1.6;
    }
`;

const ArrowDiv = styled.div`
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);

    display: flex;
    gap: 28px;

    z-index: 20;
`;

function Textus() {
    const sentences = [
`Ubi est Rōma?

Rōma in Italiā est. Italia in Eurōpā est.

Rōma urbs est. Rōma magna et pulchra est.`,

`Rōma urbs antiqua est.

Multī hominēs in Rōmā habitant. Multī virī et multae fēminae in urbe habitant.

Multī puerī et multae puellae quoque in Rōmā habitant.`,

`Marcus puer Rōmānus est. Marcus in Rōmā habitat.

Marcus in viā ambulat.

"Rōma pulchra est," Marcus dīcit.`,

`In Italiā multī fluviī sunt.

Padus fluvius longus est. Tiberis quoque fluvius longus est.

Tiberis per Rōmam fluit.`,

`In Italiā paucae īnsulae sunt.

Sicilia īnsula magna est. Capreae īnsula parva est.`,

`Rōma caput imperiī Rōmānī est.

Imperium Rōmānum magnum est.

Multī hominēs in imperiō Rōmānō habitant.`,

`In Rōmā sunt multa aedificia.

In aedificiīs multī virī et multae fēminae habitant.

Multī puerī et multae puellae quoque in aedificiīs habitant.`,

`Aedificia magna sunt.

Marcus multa aedificia videt.

"Rōma magna est," Marcus dīcit.`
    ];

    const [index, setIndex] = useState(0);

    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const {
        popup,
        entry,
        lookupWord,
        closePopup,
    } = useDictionaryLookup();

    const nextSentence = () => {
        if (index < sentences.length - 1) {
            setIndex(index + 1);
        } else {
            navigate("/lesson/1/vocabula");
        }
    };

    const previousSentence = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const progress = (index / (sentences.length - 1)) * 100;

    return (
        <LessonLayout
                active="textus"
                completed={[]}
                progress={progress}
            >
            <UnderWrapper ref={wrapperRef}>
                <ContentWrapper>
                    <TextDiv>
                        {index === 0 ? (
                            <FirstText>
                                <ClickableText
                                    text={sentences[index]}
                                    onWordClick={(word, e) =>
                                        lookupWord(word, e, wrapperRef)
                                    }
                                />
                            </FirstText>
                        ) : (
                            <Text>
                                <ClickableText
                                    text={sentences[index]}
                                    onWordClick={(word, e) =>
                                        lookupWord(word, e, wrapperRef)
                                    }
                                />
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