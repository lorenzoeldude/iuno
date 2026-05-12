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
    top: 35px;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    z-index: 10;
`;

const Item = styled.div`
    padding: 8px;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }
`;

function Searchbar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    // --------------------
    // debounce search
    // --------------------
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(() => {
            fetch(`http://localhost:8080/api/search?q=${query}`)
                .then((res) => res.json())
                .then((data) => {
                    setResults(data);
                    setOpen(true);
                })
                .catch(() => setResults([]));
        }, 200); // debounce

        return () => clearTimeout(timeout);
    }, [query]);

    // --------------------
    // click result
    // --------------------
    const handleSelect = (slug) => {
        setQuery("");
        setResults([]);
        setOpen(false);
        navigate(`/dictionary/${slug}`);
    };

    return (
        <Wrapper>
            <Input
                type="text"
                placeholder="quaerere verba"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => results.length && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
            />

            {open && results.length > 0 && (
                <Dropdown>
                    {results.map((item) => (
                        <Item
                            key={item.slug}
                            onMouseDown={() => handleSelect(item.slug)}
                        >
                            <strong>{item.latin}</strong> — {item.translation}
                        </Item>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}

export default Searchbar;