import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Wrapper = styled.div``;

const Word = styled.h1`
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 40px;
`;

const Translation = styled.p`
    font-size: 20px;
`;

const SectionTitle = styled.h2`
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 20px;
    margin: 0;
`;

const Text = styled.p`
    font-size: 30px;
    margin: 0;
`;

const Line = styled.hr`
    border: none;
    height: 0.5px;
    background-color: black;
    opacity: 0.3;
    margin: 30px 0;
`;

const Table = styled.table`
    margin-top: 30px;
    border: 0.5px solid black;
    border-spacing: 30px 12px;
    padding: 10px;
`;

function Verbum() {
    const { word } = useParams();

    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/word/${word}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Word not found");
                }
                return res.json();
            })
            .then((data) => {
                setWordData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [word]);

    if (loading) {
        return (
            <Wrapper>
                <Text>Loading...</Text>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <Text>Error: {error}</Text>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Word>{wordData.latin}</Word>
            <Translation>({wordData.translation})</Translation>

            <Line />

            <SectionTitle>Dēfīnītiō</SectionTitle>
            <Text>{wordData.definition}</Text>

            <Line />

            <SectionTitle>Exempla</SectionTitle>

            {wordData?.examples?.length > 0 ? (
                wordData.examples.map((example, index) => (
                    <Text key={index}>
                        {index + 1}. {example}
                    </Text>
                ))
            ) : (
                <Text>No examples available</Text>
            )}

            <Line />

            <SectionTitle>Dēclīnātiō</SectionTitle>

            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Singularis</th>
                        <th>Pluralis</th>
                    </tr>
                </thead>

                <tbody>
                    {wordData.declension.map((row) => (
                        <tr key={row.case}>
                            <td>{row.case}</td>
                            <td>{row.singular}</td>
                            <td>{row.plural}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Wrapper>
    );
}

export default Verbum;