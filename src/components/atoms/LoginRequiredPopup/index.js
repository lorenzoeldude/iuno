// components/LoginRequiredPopup/index.js

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Popup = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 32px;
    max-width: 420px;
    width: 90%;
    text-align: center;
`;

const PopupTitle = styled.h2`
    margin-top: 0;
`;

const PopupButton = styled.button`
    margin-top: 24px;
    padding: 10px 24px;
    border: none;
    cursor: pointer;

    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.opposite};
`;

export default function LoginRequiredPopup({ open,
    onClose,
    title = "Log in required",
    message = "Log in to use this feature." }) {

    const navigate = useNavigate();

    if (!open) return null;

    return (
        <Overlay onClick={onClose}>
            <Popup onClick={(e) => e.stopPropagation()}>
                <PopupTitle>{title}</PopupTitle>

                <p>{message}</p>

                <PopupButton
                    onClick={() => {
                        onClose();
                        navigate("/login");
                    }}
                >
                    Log In
                </PopupButton>
            </Popup>
        </Overlay>
    );
}