import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaBook, FaBookOpen, FaUserCircle, FaFont } from "react-icons/fa";

const Wrapper = styled.div`
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
`;

const List = styled.ul`
    padding-left: 0;
    margin: 0;
    list-style: none;
`;

const ListItem = styled.li`
    margin: 20px 0;
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
        color: ${({ theme }) => theme.colors.primaryHover};
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