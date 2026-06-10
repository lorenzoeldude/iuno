import styled from "styled-components";
import { FaBook, FaBookOpen, FaUserCircle, FaList } from "react-icons/fa";

// const Wrapper = styled.div`
//     margin: 0 40px;
// `;

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
    text-decoration: none;
    font-size: 23px;

    // color: #279CF5;
    color: black;

    &:hover {
        color: #279CF5;
        text-decoration: underline;
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
                <ListItem><Link href="/lectiones"><FaBook /></Link></ListItem>
                <ListItem><Link href="/vocabulary"><FaBookOpen /></Link></ListItem>
                <ListItem><Link href="/litterae"><FaList /></Link></ListItem>
                <ListItem><Link href="/user"><FaUserCircle /></Link></ListItem>
            </List>
        </Wrapper>
    );
}

export default Sidebar;