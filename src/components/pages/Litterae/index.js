import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../atoms/Card";


const Wrapper = styled.div`
    width: 80%;
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 340px));
    justify-content: center;
    gap: 28px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin: 0 auto;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    padding: 20px;
    border-radius: 18px;

    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
`;

const ColumnTitle = styled.h2`
    font-family: "Cormorant Garamond", serif;
    font-size: 25px;
    font-weight: 200;
    text-align: center;
    margin: 0;
`;

const TextCard = styled(Card)`
    padding: 14px;
    min-height: auto;

    text-align: center;

    background: ${({ difficulty }) =>
        difficulty?.toLowerCase() === "beginner"
            ? "rgba(76, 175, 80, 0.15)"
            : difficulty?.toLowerCase() === "intermediate"
            ? "rgba(255, 152, 0, 0.15)"
            : difficulty?.toLowerCase() === "advanced"
            ? "rgba(244, 67, 54, 0.15)"
            : "rgba(255, 255, 255, 0.03)"};

    border: 1px solid rgba(255,255,255,0.12);

    &:hover {
        background: ${({ difficulty }) =>
            difficulty?.toLowerCase() === "beginner"
                ? "rgba(76, 175, 80, 0.2)"
                : difficulty?.toLowerCase() === "intermediate"
                ? "rgba(255, 152, 0, 0.2)"
                : difficulty?.toLowerCase() === "advanced"
                ? "rgba(244, 67, 54, 0.2)"
                : "rgba(255,255,255,0.03)"};
    }
`;

const Title = styled.h3`
    font-family: "Cormorant Garamond", serif;
    font-size: 26px;
    font-weight: 500;
    margin: 0;
`;

const Author = styled.div`
    opacity: 0.65;
    font-size: 15px;
    margin-top: 4px;
`;


function Litterae() {

    const [texts, setTexts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/texts")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch texts");
                }

                return res.json();
            })
            .then(data => {
                setTexts(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    const beginnerTexts = texts.filter(
        text => text.difficulty?.toLowerCase() === "beginner"
    );

    const intermediateTexts = texts.filter(
        text => text.difficulty?.toLowerCase() === "intermediate"
    );

    const advancedTexts = texts.filter(
        text => text.difficulty?.toLowerCase() === "advanced"
    );


    const renderTexts = items =>
        items.map(text => (
            <TextCard
                key={text.id}
                difficulty={text.difficulty}
                size="small"
                href={`/read/${encodeURIComponent(text.author)}/${encodeURIComponent(text.title)}`}
            >
                <Title>
                    {text.title}
                </Title>

                <Author>
                    {text.author}
                </Author>

            </TextCard>
        ));


    return (
        <Wrapper>

            <Columns>

                <Column>
                    <ColumnTitle>
                        Beginner
                    </ColumnTitle>

                    {renderTexts(beginnerTexts)}
                </Column>


                <Column>
                    <ColumnTitle>
                        Intermediate
                    </ColumnTitle>

                    {renderTexts(intermediateTexts)}
                </Column>


                <Column>
                    <ColumnTitle>
                        Advanced
                    </ColumnTitle>

                    {renderTexts(advancedTexts)}
                </Column>

            </Columns>

        </Wrapper>
    );
}

export default Litterae;