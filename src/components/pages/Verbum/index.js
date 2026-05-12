import styled from "styled-components";

const Wrapper = styled.div`
`;

const Word = styled.h1`
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    font-size: 40px;
`;

const Translation = styled.p`
    font-size: 20px;
`;

const Definition = styled.p`
    font-size: 30px;
    margin: 0px;
`;

const Table = styled.table`
    margin-top: 30px;
    border: 0.5px solid black;
    border-spacing: 30px 0;
`;

const Title = styled.h2`
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    font-size: 20px;
    margin: 0px;
`;

const Line = styled.hr`
    border: none;
    height: 0.5px;
    background-color: black;
    opacity: 30%;
    margin: 30px 0;
`;

function Verbum() {
    return (
        <Wrapper>
            <Word>Lūna</Word>
            <Translation>(Moon)</Translation>
            <Line/>
            <Title>Dēfīnītiō</Title>
            <Definition>Corpus caeleste quod nocte in caelo apparet et noctem lūmine suo illuminat.</Definition>

            <Line/>
            <Title>Exempla</Title>

            <Definition>1. Lūna clara super silvam lucet nocte tranquilla.</Definition>
            <Definition>2. Puer et puella lūnam albam in caelō spectant.</Definition>
            <Definition>3. Nautae sub lūnā magnā per mare lentē navigant.</Definition>
            <Line/>

            <Title>Dēclīnātiō</Title>
            <Table>
                <tr>    
                    <th></th>
                    <th>Singularis</th>
                    <th>Pluralis</th>
                </tr>

                <tr>
                    <td>Nom.</td>
                    <td>luna</td>
                    <td>lunae</td>
                </tr>

                <tr>
                    <td>Gen.</td>
                    <td>lunae</td>
                    <td>lunarum</td>
                </tr>

                <tr>
                    <td>Dat.</td>
                    <td>lunae</td>
                    <td>lunis</td>
                </tr>

                <tr>
                    <td>Acc.</td>
                    <td>lunam</td>
                    <td>lunas</td>
                </tr>

                <tr>
                    <td>Voc.</td>
                    <td>lunae</td>
                    <td>lunae</td>
                </tr>

                <tr>
                    <td>Abl.</td>
                    <td>luna</td>
                    <td>lunis</td>
                </tr>
            </Table>
        </Wrapper>
    );
}

export default Verbum;