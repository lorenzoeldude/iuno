import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../atoms/Card";


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px 0;
`;

const Container = styled.div`
    width: 900px;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const Title = styled.h1`
    font-size: 32px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const StatNumber = styled.div`
    font-size: 40px;
    font-weight: bold;
`;

const StatLabel = styled.div`
    margin-top: 10px;
    opacity: 0.7;
`;

const AdminButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;

    text-decoration: none;
    color: inherit;

    font-size: 18px;
    font-weight: bold;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;


function AdminPage() {

    const [users, setUsers] = useState(0);
    const [lemmas, setLemmas] = useState(0);


    useEffect(() => {

        async function fetchStats() {

            try {

                const userResponse = await fetch(
                    "http://localhost:8080/admin/users/count"
                );

                const lemmaResponse = await fetch(
                    "http://localhost:8080/admin/lemmas/count"
                );


                const userData = await userResponse.json();
                const lemmaData = await lemmaResponse.json();


                setUsers(userData.count);
                setLemmas(lemmaData.count);


            } catch (error) {
                console.error(error);
            }
        }


        fetchStats();

    }, []);


    return (
        <Wrapper>

            <Container>

                <Title>
                    Admin Dashboard
                </Title>


                <Grid>

                    <Card>

                        <StatNumber>
                            {users}
                        </StatNumber>

                        <StatLabel>
                            Users
                        </StatLabel>

                    </Card>


                    <Card>

                        <StatNumber>
                            {lemmas}
                        </StatNumber>

                        <StatLabel>
                            Lemmas
                        </StatLabel>

                    </Card>


                </Grid>


                <Card>

                    <AdminButton to="/admin/editor">
                        Open Lemma Editor
                    </AdminButton>

                </Card>


            </Container>

        </Wrapper>
    );
}


export default AdminPage;