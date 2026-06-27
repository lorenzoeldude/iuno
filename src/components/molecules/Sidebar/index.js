import styled from "styled-components";
import { FaBook, FaBookOpen, FaUserCircle, FaList } from "react-icons/fa";


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
    text-decoration: none;
`;

const ListItem = styled.li`
    margin: 20px 0px;
    text-decoration: none;
    color: black;
`;

const Line =styled.hr`
    border: none;
    height: 0.8px;
    background-color: black;
    opacity: 50%;
`;

const Link = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    font-size: 23px;
    color: black;

    transition: color 0.2s ease;

    svg {
        transition: transform 0.2s ease;
    }

    &:hover {
        color: #279CF5;
        text-decoration: underline;
    }

    &:hover svg {
        transform: rotate(+5deg) scale(1.05);
    }

    &:active {
        color: #279CF5;
    }
`;

function Sidebar () {
    return (
        <Wrapper>
            {/* <Line /> */}
            <List>
                <ListItem><Link href="/lesson"><FaBook /></Link></ListItem>
                <ListItem><Link href="/trainer"><FaList /></Link></ListItem>
                <ListItem><Link href="/read"><FaBookOpen /></Link></ListItem>
                <ListItem><Link href="/user"><FaUserCircle /></Link></ListItem>
            </List>
        </Wrapper>
    );
}

export default Sidebar;