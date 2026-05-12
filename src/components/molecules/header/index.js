import styled from "styled-components";
import Searchbar from "../../atoms/Searchbar";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
    margin-bottom: 30px;
`;

const HeadLine = styled.h1`
    font-size: 25px;
    letter-spacing: 5px;
    font-family: "Luxurious Roman", serif;
    font-weight: 400;
    font-style: normal;
`;

function Header() {
    return (
        <>
            <Wrapper>
                <HeadLine>IUNO</HeadLine>
                <Searchbar />
                <div>Help</div>
            </Wrapper>
        </>
    );
}

export default Header;