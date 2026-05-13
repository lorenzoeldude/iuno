import styled from "styled-components";
import Searchbar from "../../atoms/Searchbar";
import { Link } from "react-router-dom";

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
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    margin: 0;
    line-height: 1;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
`;

function Header() {
    return (
        <Wrapper>
            <StyledLink to="/">
                <HeadLine>IUNO</HeadLine>
            </StyledLink>
            <Searchbar />
            <div>Help</div>
        </Wrapper>
    );
}

export default Header;