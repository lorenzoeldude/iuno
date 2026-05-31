import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    position: relative;
    width: 220px;
`;

const Input = styled.input`
    height: 30px;
    width: 100%;
    padding: 5px;
`;

const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    z-index: 999;
`;

const Item = styled.div`
    padding: 8px;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }
`;

function Searchbar({ className }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    // =====================================================
    // SEARCH (debounced)
    // =====================================================
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }

        const timeout = setTimeout(() => {
            fetch(`http://localhost:8080/api/search?q=${query}`)
                .then((res) => res.json())
                .then((data) => {
                    setResults(data || []);
                    setOpen(true);
                })
                .catch(() => {
                    setResults([]);
                    setOpen(false);
                });
        }, 200);

        return () => clearTimeout(timeout);
    }, [query]);

    // =====================================================
    // NAVIGATION HELPERS
    // =====================================================
    const goToSearchPage = (q) => {
        if (!q.trim()) return;
        setOpen(false);
        navigate(`/search?q=${encodeURIComponent(q)}`);
    };

    const handleSelect = (lemmaNormalized) => {
        setQuery("");
        setResults([]);
        setOpen(false);
        navigate(`/dictionary/${lemmaNormalized}`);
    };

    return (
        <Wrapper>
            <Input
                className={className}
                type="text"
                placeholder="search word"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => {
                    if (results.length > 0) setOpen(true);
                }}
                onBlur={() => {
                    setTimeout(() => setOpen(false), 150);
                }}
                // onKeyDown={(e) => {
                //     if (e.key === "Enter") {
                //         goToSearchPage(query);
                //     }
                // }}
            />

            {open && results.length > 0 && (
                <Dropdown>
                    {results.map((item) => (
                        <Item
                            key={item.lemma}
                            onMouseDown={() => handleSelect(item.lemma_normalized)}
                        >
                            <strong>{item.form}</strong>
                            {": "}
                            {item.lemma}({item.meaning})<br />
                            {item.grammatical_case || item.tense}
                            {" – "}
                            {item.part_of_speech}
                        </Item>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}

export default Searchbar;