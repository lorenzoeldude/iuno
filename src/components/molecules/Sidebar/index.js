import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaBook, FaBookOpen, FaUserCircle, FaFont } from "react-icons/fa";

const Wrapper = styled.div`
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;
        transform: none;

        background: ${({ theme }) => theme.colors.background};
        border-top: 1px solid ${({ theme }) => theme.colors.border};
        padding: 12px 0;
        z-index: 1000;
    }
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: block;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
`;

const ListItem = styled.li`
    margin: 20px 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: 0;
    }
`;

const Link = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: none;
    background: none;

    text-decoration: none;
    font-size: 23px;

    color: ${({ theme }) => theme.colors.text};

    cursor: pointer;

    transition: color ${({ theme }) => theme.transition.fast};

    svg {
        transition: transform ${({ theme }) => theme.transition.fast};
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
    }

    &:hover svg {
        transform: rotate(5deg) scale(1.05);
    }

    &:active {
        color: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 48px;
        height: 48px;
        font-size: 24px;
    }
`;

function Sidebar() {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <List>
                <ListItem>
                    <Link onClick={() => navigate("/lesson")}>
                        <FaBook />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link onClick={() => navigate("/trainer")}>
                        <FaFont />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link onClick={() => navigate("/read")}>
                        <FaBookOpen />
                    </Link>
                </ListItem>

                <ListItem>
                    <Link onClick={() => navigate("/user")}>
                        <FaUserCircle />
                    </Link>
                </ListItem>
            </List>
        </Wrapper>
    );
}

export default Sidebar;