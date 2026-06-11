import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeroCard } from "../Vocabulary";

const Wrapper = styled.div`
    width: 72%;
    margin: 0 auto;
    padding: 20px 0;
`;

const Title = styled.h1`
    font-size: 52px;
    margin-bottom: 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
`;

const Card = styled.div`
    padding: 28px;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 18px;
    cursor: pointer;
    transition: 0.15s ease;

    &:hover {
        background: rgba(0,0,0,0.03);
        transform: translateY(-2px);
    }
`;

const CardTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 10px;
`;

const CardText = styled.p`
    font-size: 18px;
    opacity: 0.7;
    line-height: 1.5;
`;

function UserPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("User");

    // =====================================================
    // READ USERNAME FROM LOCAL STORAGE
    // =====================================================
    useEffect(() => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (user?.username) {
                setUsername(user.username);
            }

        } catch (err) {
            console.error(err);
        }

    }, []);

    return (
        <Wrapper>

            <Title>{username}</Title>

            <Grid>

                <HeroCard onClick={() => navigate("/user/settings")}>
                    <CardTitle>Account Settings</CardTitle>

                    <CardText>
                        Manage your account, authentication and preferences.
                    </CardText>
                </HeroCard>

                <HeroCard onClick={() => navigate("/user/list")}>
                    <CardTitle>Word List</CardTitle>

                    <CardText>
                        View and manage your saved Latin vocabulary.
                    </CardText>
                </HeroCard>

            </Grid>

        </Wrapper>
    );
}

export default UserPage;