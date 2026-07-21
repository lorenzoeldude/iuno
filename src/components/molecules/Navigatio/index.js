import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const ACTIVE_COLOR = "#454545";

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const NavigationDiv = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`;

const Navigation = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px 18px;

    border: none;
    border-radius: 5px;

    background: ${({ active }) =>
        active ? ACTIVE_COLOR : "transparent"};

    color: ${({ active, theme }) =>
        active ? "white" : theme.colors.text};

    font-family: "Cormorant Garamond", serif;
    font-size: 20px;
    font-weight: 600;

    cursor: pointer;

    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.18s ease,
        box-shadow 0.18s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);

        background: ${({ active }) =>
            active ? ACTIVE_COLOR : "#ececec"};
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        padding: 8px 12px;
        font-size: 16px;
        gap: 6px;
    }
`;

const Check = styled(FaCheck)`
    font-size: 12px;
`;

function Navigatio({ active, completed }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const links = [
        {
            id: "textus",
            label: "Text",
            path: `/lessons/${id}/textus`,
        },
        {
            id: "vocabula",
            label: "Vocabulary",
            path: `/lessons/${id}/vocabula`,
        },
        {
            id: "grammatica",
            label: "Grammar",
            path: `/lessons/${id}/grammatica`,
        },
        {
            id: "examinatio",
            label: "Quiz",
            path: `/lessons/${id}/examinatio`,
        },
    ];

    return (
        <OuterWrapper>
            <NavigationDiv>
                {links.map((link) => (
                    <Navigation
                        key={link.id}
                        active={active === link.id}
                        onClick={() => navigate(link.path)}
                    >
                        {completed.includes(link.id) && <Check />}
                        {link.label}
                    </Navigation>
                ))}
            </NavigationDiv>
        </OuterWrapper>
    );
}

export default Navigatio;