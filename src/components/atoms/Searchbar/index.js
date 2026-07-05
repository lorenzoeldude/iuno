import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 350px;
    flex: 1;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        max-width: 180px;
    }
`;
const Input = styled.input`
    height: 30px;
    width: 100%;

    padding: 5px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0px;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    text-align: center;

    transition: border ${({ theme }) => theme.transition.normal},
                background ${({ theme }) => theme.transition.normal};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
        outline: none;
        border: 1px solid ${({ theme }) => theme.colors.accent};
    }
`;

const Dropdown = styled.div`
    position: absolute;

    top: calc(100% + 6px);
    left: 0;
    right: 0;

    background: ${({ theme }) => theme.colors.card};

    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};

    z-index: 999;

    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
`;

const Item = styled.div`
    padding: 8px;

    color: ${({ theme }) => theme.colors.text};

    cursor: pointer;

    transition: background ${({ theme }) => theme.transition.fast};

    &:hover {
        background: ${({ theme }) => theme.colors.surface};
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
            fetch(`${API_URL}/api/search?q=${query}`)
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

    const handleSelect = (lemmaNormalized, form) => {
        setQuery("");
        setResults([]);
        setOpen(false);

        navigate(
            `/dictionary/${lemmaNormalized}?form=${encodeURIComponent(form)}`
        );
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
            />

            {open && results.length > 0 && (
                <Dropdown>
                    {results.map((item) => (
                        <Item
                            key={item.lemma}
                            onMouseDown={() =>
                                handleSelect(
                                    item.lemma_normalized,
                                    item.form
                                )
                            }
                        >
                            <strong>{item.form}</strong>
                            {": "}
                            {item.lemma}
                            <br />
                            {item.grammatical_case || item.tense} -{" "}
                            {item.meaning}
                        </Item>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}

export default Searchbar;