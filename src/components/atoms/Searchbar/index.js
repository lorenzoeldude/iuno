import styled from "styled-components";

const Input = styled.input`
    height: 25px;
    width: 200px;
    // text-align: center;
`;

function Searchbar () {
    return (
        <Input type="text" placeholder="quaerere verba" />
    );
}

export default Searchbar;