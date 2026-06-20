import styled from "styled-components";

const NavigationDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const Link = styled.a`
    text-decoration: none;

    color: #279CF5;

    &:hover {
        color: #279CF5;
        text-decoration: none;
    }
`;

const Navigation = styled.p`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 5px;
    padding: 15px 20px;

    background-color: ${(props) =>
        props.active ? "#454545" : "transparent"};

    // border: 0.1px solid #454545;

    color: ${(props) =>
        props.active ? "white" : "black"};

    &:hover {
        background-color: #2e2e2e;
        color: white;
        cursor: pointer;
    }
`;


function Navigatio ({ active }) {
    return (
        <NavigationDiv>

            <Link href="/lectiones/1/textus">
                <Navigation active={active === "textus"}>
                    Text
                </Navigation>
            </Link>

            <Link href="/lectiones/1/vocabula">
                <Navigation active={active === "vocabula"}>
                    Words
                </Navigation>
            </Link>

            <Link href="/lectiones/1/grammatica">
                <Navigation active={active === "grammatica"}>
                    Grammar
                </Navigation>
            </Link>

            <Link href="/lectiones/1/examinatio">
                <Navigation active={active === "examinatio"}>
                    Quiz
                </Navigation>
            </Link>

        </NavigationDiv>
    );
}

export default Navigatio;