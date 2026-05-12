import styled from "styled-components";

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

const wordData = {
    latin: "Lūna",
    translation: "Moon",
    definition:
        "Corpus caeleste quod nocte in caelo apparet et noctem lūmine suo illuminat.",

    examples: [
        "Lūna clara super silvam lucet nocte tranquilla.",
        "Puer et puella lūnam albam in caelō spectant.",
        "Nautae sub lūnā magnā per mare lentē navigant.",
    ],

    declension: [
        { case: "Nom.", singular: "luna", plural: "lunae" },
        { case: "Gen.", singular: "lunae", plural: "lunarum" },
        { case: "Dat.", singular: "lunae", plural: "lunis" },
        { case: "Acc.", singular: "lunam", plural: "lunas" },
        { case: "Voc.", singular: "luna", plural: "lunae" },
        { case: "Abl.", singular: "luna", plural: "lunis" },
    ],
};

function Verbum() {
    return (
        <Wrapper>
            <Word>{wordData.latin}</Word>
            <Translation>({wordData.translation})</Translation>

            <Line />

            <SectionTitle>Dēfīnītiō</SectionTitle>
            <Text>{wordData.definition}</Text>

            <Line />

            <SectionTitle>Exempla</SectionTitle>

            {wordData.examples.map((example, index) => (
                <Text key={index}>
                    {index + 1}. {example}
                </Text>
            ))}

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