import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const ACTIVE_COLOR = "#454545";

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
`;


const Wrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
`;


const NavigationDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;


const Navigation = styled.p`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    font-size: 20px;

    margin: 0;
    padding: 10px 20px;

    background-color: ${({ active }) =>
        active ? ACTIVE_COLOR : "transparent"};

    color: ${({ active, theme }) =>
        active ? "white" : theme.colors.text};

    transition:
        background-color ${({ theme }) => theme.transition.fast},
        color ${({ theme }) => theme.transition.fast};

    &:hover {
        background-color: #2e2e2e;
        color: white;
        cursor: pointer;
    }
`;



function Navigatio({ active }) {

    const navigate = useNavigate();


    const links = [
        {
            id: "textus",
            label: "Text",
            path: "/lesson/1/textus",
        },
        {
            id: "vocabula",
            label: "Vocabulary",
            path: "/lesson/1/vocabula",
        },
        {
            id: "grammatica",
            label: "Grammar",
            path: "/lesson/1/grammatica",
        },
        {
            id: "examinatio",
            label: "Quiz",
            path: "/lesson/1/examinatio",
        },
    ];


    return (
        <OuterWrapper>

            <Wrapper>

                <NavigationDiv>

                    {links.map((link) => (

                        <Navigation
                            key={link.id}
                            active={active === link.id}
                            onClick={() => navigate(link.path)}
                        >
                            {link.label}
                        </Navigation>

                    ))}

                </NavigationDiv>

            </Wrapper>

        </OuterWrapper>
    );
}


export default Navigatio;