import styled from "styled-components";

const ACTIVE_COLOR = "#454545";

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
`;

const ActiveLabel = styled.div`
    // background-color: ${ACTIVE_COLOR};
    color: black;

    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    font-size: 20px;
    text-align: center;

    padding: 0px 0;
`;

const NavigationDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Link = styled.a`
    text-decoration: none;

    color: #279cf5;

    &:hover {
        color: #279cf5;
        text-decoration: none;
    }
`;

const Navigation = styled.p`
    font-family: "Cormorant Garamond", serif;
    font-weight: 500;
    font-size: 20px;

    margin: 0;
    padding: 10px 20px;

    background-color: ${(props) =>
        props.active ? ACTIVE_COLOR : "transparent"};

    color: ${(props) =>
        props.active ? "white" : "black"};

    &:hover {
        background-color: #2e2e2e;
        color: white;
        cursor: pointer;
    }
`;

function Navigatio({ active }) {
    const labels = {
        textus: "Text",
        vocabula: "Vocabulary",
        grammatica: "Grammar",
        examinatio: "Quiz",
    };

    return (
        <OuterWrapper>
            <Wrapper>
                {/* <ActiveLabel>
                    {labels[active]}
                </ActiveLabel> */}

                <NavigationDiv>
                    <Link href="/lectiones/1/textus">
                        <Navigation active={active === "textus"}>
                            T
                        </Navigation>
                    </Link>

                    <Link href="/lectiones/1/vocabula">
                        <Navigation active={active === "vocabula"}>
                            V
                        </Navigation>
                    </Link>

                    <Link href="/lectiones/1/grammatica">
                        <Navigation active={active === "grammatica"}>
                            G
                        </Navigation>
                    </Link>

                    <Link href="/lectiones/1/examinatio">
                        <Navigation active={active === "examinatio"}>
                            Q
                        </Navigation>
                    </Link>
                </NavigationDiv>
            </Wrapper>
        </OuterWrapper>
    );
}

export default Navigatio;