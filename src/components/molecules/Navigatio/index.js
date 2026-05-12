import styled from "styled-components";

const Link = styled.a`
    text-decoration: none;

    color: #279CF5;

    &:hover {
        color: #279CF5;
        text-decoration: underline;
    }
`;

const NavigationDiv = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    // border: 1px solid black;
    height: 400px;
    width: 300px;
`;

const Navigation = styled.p`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    font-size: 20px;
    margin-top: 10px;
    padding: 10px;

    background-color: ${(props) =>
        props.active ? "#454545" : "transparent"};

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
                    Textus
                </Navigation>
            </Link>

            <Link href="/lectiones/1/vocabula">
                <Navigation active={active === "vocabula"}>
                    Vocābula
                </Navigation>
            </Link>

            <Link href="/lectiones/1/grammatica">
                <Navigation active={active === "grammatica"}>
                    Grammatica
                </Navigation>
            </Link>

            <Link href="/lectiones/1/examinatio">
                <Navigation active={active === "examinatio"}>
                    Examinatio
                </Navigation>
            </Link>

        </NavigationDiv>
    );
}

export default Navigatio;