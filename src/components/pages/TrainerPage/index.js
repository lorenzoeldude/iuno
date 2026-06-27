import styled from "styled-components";
import { useState } from "react";

import Trainer from "../Trainer";


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const SwitchWrapper = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 40px;
`;


const Button = styled.button`
    padding: 10px 20px;
    cursor: pointer;

    border: none;
    border-radius: 8px;

    background: ${(props) =>
        props.active ? "black" : "#ddd"};

    color: ${(props) =>
        props.active ? "white" : "black"};

    transition: 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;



function TrainerPage() {


    const [mode, setMode] = useState("all");



    return (

        <Wrapper>


            <SwitchWrapper>


                <Button

                    active={mode === "all"}

                    onClick={() => setMode("all")}

                >

                    Random

                </Button>




                <Button

                    active={mode === "list"}

                    onClick={() => setMode("list")}

                >

                    My List

                </Button>


            </SwitchWrapper>




            <Trainer

                mode={mode}

            />


        </Wrapper>

    );

}


export default TrainerPage;