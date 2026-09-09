import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Searchbar from "../../atoms/Searchbar";

const Wrapper = styled.main`
    width: 50vw;
    min-height: 100vh;

    box-sizing: border-box;

    padding: 32px 40px 80px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
        padding: 20px 20px 90px;
    }
`;

const SearchWrapper = styled.div`
    width: 100%;
    max-width: 1000px;

    margin: 0 auto;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        max-width: none;
    }
`;

const Content = styled.div`
    width: 100%;
    max-width: 820px;

    margin: 0 auto;
`;

/* =====================================================
   INTRO
===================================================== */

const Intro = styled.div`
    text-align: center;

    margin-top: 48px;
    margin-bottom: 70px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-top: 42px;
        margin-bottom: 52px;
    }
`;

const IntroTitle = styled.h1`
    margin: 0 0 12px;

    font-family: "Cormorant Garamond", serif;
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;

    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 34px;
    }
`;

const IntroText = styled.p`
    margin: 0 auto;

    max-width: 520px;

    font-size: 15px;
    line-height: 1.6;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

/* =====================================================
   WORD OF THE DAY
===================================================== */

const WordSection = styled.section`
    width: 100%;
    max-width: 680px;

    margin: 0 auto;
`;

const SectionTitle = styled.div`
    margin-bottom: 18px;

    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.8px;
    text-transform: uppercase;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const WordCard = styled.button`
    display: block;

    width: 100%;

    box-sizing: border-box;

    padding: 28px 4px;

    text-align: left;

    border: 1px solid ${({ theme }) => theme.colors.border};

    background: transparent;

    cursor: pointer;

    transition:
        border-color ${({ theme }) => theme.transition.fast};

    &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.accent};
        outline-offset: 4px;
    }
`;

const WordHeader = styled.div`
    display: flex;
    align-items: baseline;

    gap: 12px;
`;

const Word = styled.span`
    font-family: "Cormorant Garamond", serif;
    font-size: 46px;
    font-weight: 600;
    line-height: 1;

    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 40px;
    }
`;

const Arrow = styled.span`
    margin-left: auto;

    font-size: 17px;
    line-height: 1;

    color: ${({ theme }) => theme.colors.accent};

    transition:
        transform ${({ theme }) => theme.transition.fast};

    ${WordCard}:hover & {
        transform: translate(2px, -2px);
    }
`;

const Meanings = styled.div`
    display: flex;
    gap: 7px;

    margin-top: 18px;

    overflow-x: auto;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Meaning = styled.span`
    flex-shrink: 0;

    padding: 6px 10px;

    font-size: 13px;
    line-height: 1.2;

    color: ${({ theme }) => theme.colors.text};

    background: ${({ theme }) =>
        theme.colors.accent + "1F"};

    border: 1px solid
        ${({ theme }) =>
            theme.colors.accent + "40"};
`;

/* =====================================================
   LOADING
===================================================== */

const Loading = styled.div`
    width: 100%;

    box-sizing: border-box;

    padding: 28px 4px;

    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    text-align: left;

    background: transparent;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: 14px;
`;

/* =====================================================
   PAGE
===================================================== */

function SearchPage() {
    const navigate = useNavigate();

    const [wordOfTheDay, setWordOfTheDay] = useState(null);
    const [loadingWord, setLoadingWord] = useState(true);

    useEffect(() => {
        loadWordOfTheDay();
    }, []);

    async function loadWordOfTheDay() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/word-of-the-day`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load word of the day"
                );
            }

            const data = await response.json();

            setWordOfTheDay(data);
        } catch (error) {
            console.error(
                "Word of the day error:",
                error
            );
        } finally {
            setLoadingWord(false);
        }
    }

    function openWord(word) {
        navigate(
            `/dictionary/${word.lemma_normalized}`
        );
    }

    return (
        <Wrapper>

            {/* =====================================================
                SEARCH
            ===================================================== */}

            <SearchWrapper>
                <Searchbar variant="large" />
            </SearchWrapper>

            {/* =====================================================
                INTRO
            ===================================================== */}

            <Content>

                <Intro>

                    <IntroTitle>
                        Search the dictionary
                    </IntroTitle>

                    <IntroText>
                        Look up Latin words, forms, meanings
                        and grammar.
                    </IntroText>

                </Intro>

                {/* =====================================================
                    WORD OF THE DAY
                ===================================================== */}

                <WordSection>

                    <SectionTitle>
                        Word of the day
                    </SectionTitle>

                    {loadingWord ? (

                        <Loading>
                            Loading...
                        </Loading>

                    ) : wordOfTheDay ? (

                        <WordCard
                            onClick={() =>
                                openWord(wordOfTheDay)
                            }
                        >

                            <WordHeader>

                                <Word>
                                    {wordOfTheDay.lemma}
                                </Word>

                                <Arrow>
                                    ↗
                                </Arrow>

                            </WordHeader>

                            {wordOfTheDay.meanings?.length > 0 && (

                                <Meanings>

                                    {wordOfTheDay.meanings.map(
                                        (meaning) => (
                                            <Meaning
                                                key={meaning}
                                            >
                                                {meaning}
                                            </Meaning>
                                        )
                                    )}

                                </Meanings>

                            )}

                        </WordCard>

                    ) : null}

                </WordSection>

            </Content>

        </Wrapper>
    );
}

export default SearchPage;