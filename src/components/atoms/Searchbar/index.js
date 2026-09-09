import styled, { useTheme } from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

import SearchIconLight from "../../../assets/icons/search.svg";
import SearchIconDark from "../../../assets/icons/search_dark.svg";

const Wrapper = styled.div`
    position: relative;

    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

const InputWrapper = styled.div`
    position: relative;

    width: 100%;
`;

const Input = styled.input`
    appearance: none;
    -webkit-appearance: none;
    border-radius: 0;

    display: block;

    width: 100%;
    height: ${({ variant }) =>
        variant === "large" ? "45px" : "30px"};

    box-sizing: border-box;

    padding: 5px;

    border: 1px solid ${({ theme }) => theme.colors.border};

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    text-align: center;

    transition:
        border ${({ theme }) => theme.transition.normal},
        background ${({ theme }) => theme.transition.normal};

    &::placeholder {
        color: transparent;
    }

    &:focus {
        outline: none;
        border: 1px solid ${({ theme }) => theme.colors.accent};
    }
`;

const SearchPlaceholder = styled.div`
    position: absolute;

    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 6px;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-family: "Cormorant Garamond", serif;
    font-size: 16px;

    pointer-events: none;
`;

const SearchIconImage = styled.img`
    width: 22px;
    height: 22px;

    flex-shrink: 0;
    display: block;
`;

const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;

    background: ${({ theme }) => theme.colors.opposite};
    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};

    text-align: left;

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

const Meanings = styled.div`
    margin-top: 2px;

    display: flex;
    flex-wrap: wrap;

    gap: 4px;

    justify-content: flex-start;
`;

const MeaningTag = styled.span`
    background: ${({ theme }) => theme.colors.accent + "40"};
    color: black;

    font-size: 13px;

    padding: 2px 6px;
`;

function Searchbar({ className, variant }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    const latestQuery = useRef("");

    const navigate = useNavigate();
    const theme = useTheme();

    const isDark = theme.mode === "dark";

    // =====================================================
    // SEARCH (debounced)
    // =====================================================

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }

        latestQuery.current = query;

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            fetch(
                `${API_URL}/api/search?q=${encodeURIComponent(query)}`,
                {
                    signal: controller.signal,
                }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Search request failed");
                    }

                    return res.json();
                })
                .then((data) => {
                    // Ignore outdated responses
                    if (latestQuery.current !== query) {
                        return;
                    }

                    setResults(data || []);
                    setOpen(true);
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        return;
                    }

                    setResults([]);
                    setOpen(false);
                });
        }, 200);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
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
        <Wrapper className={className}>
            <InputWrapper>
                <Input
                    variant={variant}
                    type="text"
                    placeholder=""
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => {
                        if (results.length > 0) {
                            setOpen(true);
                        }
                    }}
                    onBlur={() => {
                        setTimeout(() => setOpen(false), 150);
                    }}
                />

                {!query && (
                    <SearchPlaceholder>
                        <SearchIconImage
                            src={
                                isDark
                                    ? SearchIconDark
                                    : SearchIconLight
                            }
                            alt=""
                        />

                        <span>search the dictionary</span>
                    </SearchPlaceholder>
                )}
            </InputWrapper>

            {open && results.length > 0 && (
                <Dropdown>
                    {results.map((item) => (
                        <Item
                            key={`${item.lemma_normalized}-${item.form}`}
                            onMouseDown={() =>
                                handleSelect(
                                    item.lemma_normalized,
                                    item.form
                                )
                            }
                        >
                            <strong>{item.form}</strong>: {item.lemma}

                            <br />

                            <Meanings>
                                {item.meanings?.map((meaning, index) => (
                                    <MeaningTag key={index}>
                                        {meaning}
                                    </MeaningTag>
                                ))}
                            </Meanings>

                            {item.grammatical_case || item.tense ? (
                                <div>
                                    {item.grammatical_case || item.tense}
                                </div>
                            ) : null}
                        </Item>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}

export default Searchbar;