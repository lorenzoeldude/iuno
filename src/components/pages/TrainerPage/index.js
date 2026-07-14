import styled from "styled-components";
import { useState } from "react";

import Trainer from "../Trainer";
import LoginRequiredPopup from "../../atoms/LoginRequiredPopup";

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

    const [showLoginPopup, setShowLoginPopup] = useState(false);

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

                    onClick={() => {
                        const token = localStorage.getItem("token");

                        if (!token) {
                            setShowLoginPopup(true);
                            return;
                        }

                        setMode("list");
                    }}

                >

                    My List

                </Button>


            </SwitchWrapper>




            <Trainer

                mode={mode}

            />

        {/* <LoginRequiredPopup
            open={showLoginPopup}
            onClose={() => setShowLoginPopup(false)}
        /> */}

        <LoginRequiredPopup
            open={showLoginPopup}
            onClose={() => setShowLoginPopup(false)}
            title="Login Required"
            message="Log in to train words from your word list."
        />
        </Wrapper>

    );

}


export default TrainerPage;