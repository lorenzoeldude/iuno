import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    padding: 40px 0;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px;
    font-size: 18px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 10px;
    margin-bottom: 25px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Item = styled.div`
    padding: 14px;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 10px;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
        background: rgba(0,0,0,0.04);
    }
`;

const Lemma = styled.div`
    font-size: 22px;
    font-weight: 600;
`;

const Meaning = styled.div`
    font-size: 16px;
    opacity: 0.7;
    margin-top: 4px;
`;

const Empty = styled.div`
    opacity: 0.5;
    font-size: 18px;
    margin-top: 20px;
`;

function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(() => {
            setLoading(true);

            fetch(`http://localhost:8080/api/search?q=${query}`)
                .then((res) => res.json())
                .then((data) => {
                    setResults(data || []);
                    setLoading(false);
                })
                .catch(() => {
                    setResults([]);
                    setLoading(false);
                });
        }, 200);

        return () => clearTimeout(timeout);
    }, [query]);

    const openWord = (slug) => {
        navigate(`/dictionary/${slug}`);
    };

    return (
        <Wrapper>
            <Input
                placeholder="quaerere verba..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
            />

            {loading && <Empty>Searching...</Empty>}

            {!loading && query && results.length === 0 && (
                <Empty>No results found</Empty>
            )}

            <List>
                {results.map((item) => (
                    <Item
                        key={item.slug}
                        onClick={() => openWord(item.slug)}
                    >
                        <Lemma>{item.lemma}</Lemma>
                        <Meaning>{item.meaning}</Meaning>
                    </Item>
                ))}
            </List>
        </Wrapper>
    );
}

export default SearchPage;