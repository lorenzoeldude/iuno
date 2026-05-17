import styled from "styled-components";
import Searchbar from "../../atoms/Searchbar";
import { Link, useNavigate } from "react-router-dom";

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

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const UserBox = styled(Link)`
    font-size: 14px;
    opacity: 0.8;
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
`;

const Button = styled.button`
    padding: 6px 10px;
    border: 1px solid rgba(0,0,0,0.2);
    background: white;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

function Header() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <Wrapper>

            <StyledLink to="/">
                <HeadLine>IUNO</HeadLine>
            </StyledLink>

            <Searchbar />

            <Right>

                {user ? (
                    <>
                        <UserBox to="/user">
                            {user.username}
                        </UserBox>

                        <Button onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                )}

            </Right>

        </Wrapper>
    );
}

export default Header;