import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 40%;
    margin: 0 auto;
    padding: 20px 0;
`;

const Title = styled.h1`
    font-size: 35px;
    margin-bottom: 30px;
    text-align: center;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Item = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.15s ease;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background: rgba(0,0,0,0.03);
    }

    &:hover .delete-button {
        opacity: 1;
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
`;

const Lemma = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const Meaning = styled.div`
    font-size: 16px;
    opacity: 0.7;
    margin-top: 4px;
`;

const DeleteButton = styled.button`
    border: none;
    background: transparent;
    font-size: 28px;
    cursor: pointer;
    opacity: 0;
    transition: 0.15s ease;
    color: #c0392b;

    &:hover {
        transform: scale(1.1);
    }
`;

const Empty = styled.p`
    font-size: 20px;
    opacity: 0.6;
`;

function WordList() {

    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // =====================================================
    // FETCH WORDS
    // =====================================================
    useEffect(() => {

        fetch("http://localhost:8080/api/word-lists/lemmas", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch list");
                }

                return res.json();
            })
            .then(data => {
                setWords(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

    }, []);

    // =====================================================
    // DELETE WORD
    // =====================================================
    async function deleteWord(e, lemmaId) {

        e.stopPropagation();

        try {

            const res = await fetch(
                `http://localhost:8080/api/word-lists/lemma/${lemmaId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete word");
            }

            setWords(prev =>
                prev.filter(word => word.id !== lemmaId)
            );

        } catch (err) {
            console.error(err);
        }
    }

    // =====================================================
    // LOADING
    // =====================================================
    if (loading) {
        return (
            <Wrapper>
                <Title>Your Word List</Title>
                <p>Loading...</p>
            </Wrapper>
        );
    }

    return (
        <Wrapper>

            <Title>Saved Words</Title>

            {words.length === 0 ? (
                <Empty>No saved words yet.</Empty>
            ) : (
                <List>

                    {words.map(word => (

                        <Item
                            key={word.id}
                            onClick={() =>
                                navigate(`/dictionary/${word.lemma_normalized}`)
                            }
                        >

                            <Left>
                                <Lemma>{word.lemma}</Lemma>
                                <Meaning>{word.meaning}</Meaning>
                            </Left>

                            <DeleteButton
                                className="delete-button"
                                onClick={(e) =>
                                    deleteWord(e, word.id)
                                }
                            >
                                −
                            </DeleteButton>

                        </Item>

                    ))}

                </List>
            )}

        </Wrapper>
    );
}

export default WordList;