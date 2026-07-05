import styled from "styled-components";
import Searchbar from "../../atoms/Searchbar";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 20px;
    gap: 20px;

    z-index: 1000;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    flex-shrink: 0;
`;

const HeadLine = styled.h1`
    font-size: 25px;
    letter-spacing: 5px;

    font-family: "Cormorant Garamond", serif;
    font-weight: 800;

    cursor: pointer;
    color: inherit;
    text-decoration: none;
    margin: 0;
    line-height: 1;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 22px;
        letter-spacing: 3px;
    }
`;

const SearchWrapper = styled.div`
    flex: 1;

    display: flex;
    justify-content: center;

    min-width: 0;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    flex-shrink: 0;
`;

const Button = styled.button`
    padding: 4px 8px;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    background: none;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 14px;
        padding: 4px 6px;
    }
`;

function Header() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    function login() {
        navigate("/login");
    }

    return (
        <Wrapper>
            <StyledLink to="/">
                <HeadLine>I</HeadLine>
            </StyledLink>

            <SearchWrapper>
                <Searchbar />
            </SearchWrapper>

            <Right>
                {user ? (
                    <Button onClick={logout}>
                        Logout
                    </Button>
                ) : (
                    <Button onClick={login}>
                        Login
                    </Button>
                )}
            </Right>
        </Wrapper>
    );
}

export default Header;