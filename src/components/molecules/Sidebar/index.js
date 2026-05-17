import styled from "styled-components";

const Wrapper = styled.div`
    margin: 0px 40px;
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
`;

const Line =styled.hr`
    border: none;
    height: 0.8px;
    background-color: black;
    opacity: 50%;
`;

const Link = styled.a`
    text-decoration: none;

    color: #279CF5;

    &:visited {
        color: #279CF5;
    }

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
            <Line />
            <List>
                <ListItem><Link href="/lectiones">LECTIONES</Link></ListItem>
                <ListItem><Link href="/trainer">EXERCITIUM</Link></ListItem>
                <ListItem><Link href="/listtrainer">VOCAB</Link></ListItem>
                <ListItem><Link href="/user/list">LIST</Link></ListItem>
            </List>
        </Wrapper>
    );
}

export default Sidebar;