import styled from "styled-components";
import { useState } from "react";
import Navigatio from "../../molecules/Navigatio";

const Outer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Table = styled.table`
    margin-top: 30px;
    border: 0.5px solid black;
    border-spacing: 30px 0;
`;

const ClickTable = styled.td`
    &:hover {
        background-color: #2e2e2e;
        color: white;
        cursor: pointer;
    }

    &:active {
        color: black;
    }
`;

const Text = styled.p`
    font-weight: 400;
    font-size: 30px;
    margin: 30px 0;
`;

const Blank = styled.span`
    display: inline-block;
    width: 100px;
    border-bottom: 2px solid black;
    margin: 0 4px;
    color: green;
`;

function Quiz() {
  const [answer, setAnswer] = useState("");

  const correctWord = "lunarum";
  
    return (
        <Outer>
        <Wrapper>
            <Table>
                <tr>    
                    <th></th>
                    <th>Singularis</th>
                    <th>Pluralis</th>
                </tr>

                <tr>
                    <td>Nom.</td>
                    <ClickTable>luna</ClickTable>
                    <ClickTable>lunae</ClickTable>
                </tr>

                <tr>
                    <td>Gen.</td>
                    <ClickTable onClick={() => setAnswer("luna")}
  style={{
    backgroundColor:
      answer && answer !== correctWord ? "red" : "white"
  }}
>luna
</ClickTable>
                    <ClickTable onClick={() => setAnswer("lunarum")}>lunarum</ClickTable>
                </tr>

                <tr>
                    <td>Dat.</td>
                    <ClickTable>lunae</ClickTable>
                    <ClickTable>lunis</ClickTable>
                </tr>

                <tr>
                    <td>Acc.</td>
                    <ClickTable>lunam</ClickTable>
                    <ClickTable>lunas</ClickTable>
                </tr>

                <tr>
                    <td>Voc.</td>
                    <ClickTable>lunae</ClickTable>
                    <ClickTable>lunae</ClickTable>
                </tr>

                <tr>
                    <td>Abl.</td>
                    <ClickTable>luna</ClickTable>
                    <ClickTable>lunis</ClickTable>
                </tr>
            </Table>

            <Text>Lux <Blank >{answer === correctWord ? answer : ""}</Blank> noctem argenteam facit.</Text>

        </Wrapper>
            <Navigatio />
        </Outer>
    );
}

export default Quiz;