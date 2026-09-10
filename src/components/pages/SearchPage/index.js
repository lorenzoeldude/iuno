import { useEffect, useState } from "react";
import styled from "styled-components";

import Searchbar from "../../atoms/Searchbar";
import { useLocation, useNavigate } from "react-router-dom";


const Wrapper = styled.main`
    width: 50vw;
    min-height: 100vh;

    box-sizing: border-box;

    padding: 70px 40px 80px;

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

    margin-top: 40px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-top: 42px;
        margin-bottom: 52px;
    }
`;

/* =====================================================
   WORD SECTIONS
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

/* =====================================================
   WORD OF THE DAY
===================================================== */

const WordCard = styled.button`
    display: block;

    width: 100%;

    box-sizing: border-box;

    padding: 20px 20px;

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
            theme.colors.accent + "1F"};
`;

/* =====================================================
   MOST SEARCHED THIS WEEK
===================================================== */

const TopWordsSection = styled.section`
    width: 100%;
    max-width: 680px;

    margin: 40px auto 0;
`;

const TopWordsContainer = styled.div`
    width: 100%;

    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.colors.border};

    background: transparent;
`;

const TopWords = styled.div`
    display: flex;
    flex-direction: column;
`;

const TopWord = styled.button`
    display: grid;

    grid-template-columns: 32px auto 1fr;

    align-items: center;

    column-gap: 14px;

    width: 100%;

    padding: 16px 20px;

    box-sizing: border-box;

    text-align: left;

    border: none;

    background: transparent;

    cursor: pointer;

    &:hover {
        .top-word {
            text-decoration: underline;
        }
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.accent};
        outline-offset: -3px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 28px auto 1fr;

        column-gap: 10px;

        padding: 14px 14px;
    }
`;

const Rank = styled.span`
    font-family: "Cormorant Garamond", serif;

    font-size: 18px;
    font-weight: 600;

    line-height: 1;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const TopWordLemma = styled.span`
    font-family: "Cormorant Garamond", serif;

    font-size: 28px;
    font-weight: 600;

    line-height: 1.1;

    color: ${({ theme }) => theme.colors.text};

    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 24px;
    }
`;

const TopWordMeaning = styled.span`
    justify-self: start;

    padding: 5px 9px;

    font-size: 13px;
    line-height: 1.2;

    color: ${({ theme }) => theme.colors.text};

    background: ${({ theme }) =>
        theme.colors.accent + "1F"};

    border: 1px solid
        ${({ theme }) =>
            theme.colors.accent + "1F"};

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

    max-width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 12px;
        padding: 5px 8px;
    }
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

    const location = useLocation();
    const navigate = useNavigate();

    const autoFocus =
        location.state?.autoFocus === true;

    const [wordOfTheDay, setWordOfTheDay] =
        useState(null);

    const [loadingWord, setLoadingWord] =
        useState(true);

    const [topWords, setTopWords] =
        useState([]);

    const [loadingTopWords, setLoadingTopWords] =
        useState(true);

    // =====================================================
    // LOAD WORD OF THE DAY
    // =====================================================

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

            const data =
                await response.json();

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

    // =====================================================
    // LOAD MOST SEARCHED WORDS
    // =====================================================

    useEffect(() => {
        loadTopWords();
    }, []);

    async function loadTopWords() {

        try {

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/word-lookups/top`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load top word lookups"
                );
            }

            const data =
                await response.json();

            setTopWords(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Top word lookups error:",
                error
            );

        } finally {

            setLoadingTopWords(false);
        }
    }

    // =====================================================
    // OPEN WORD
    // =====================================================

    function openWord(word) {

        navigate(
            `/dictionary/${word.lemma_normalized}`
        );
    }

    function openTopWord(word) {

        navigate(
            `/dictionary/${word.lemma_normalized}`
        );
    }

    // =====================================================
    // ROMAN RANK
    // =====================================================

    function romanRank(rank) {

        switch (rank) {

            case 1:
                return "I";

            case 2:
                return "II";

            case 3:
                return "III";

            case 4:
                return "IV";

            case 5:
                return "V";

            default:
                return rank;
        }
    }

    return (
        <Wrapper>

            {/* =====================================================
                SEARCH
            ===================================================== */}

            <SearchWrapper>

                <Searchbar
                    variant="large"
                    autoFocus={autoFocus}
                />

            </SearchWrapper>

            {/* =====================================================
                INTRO
            ===================================================== */}

            <Content>

                <Intro>
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
                                openWord(
                                    wordOfTheDay
                                )
                            }
                        >

                            <WordHeader>

                                <Word>
                                    {
                                        wordOfTheDay
                                            .lemma
                                    }
                                </Word>

                                <Arrow>
                                    ↗
                                </Arrow>

                            </WordHeader>

                            {
                                wordOfTheDay
                                    .meanings
                                    ?.length > 0 && (

                                    <Meanings>

                                        {
                                            wordOfTheDay
                                                .meanings
                                                .map(
                                                    meaning => (

                                                        <Meaning
                                                            key={
                                                                meaning
                                                            }
                                                        >
                                                            {
                                                                meaning
                                                            }
                                                        </Meaning>

                                                    )
                                                )
                                        }

                                    </Meanings>

                                )}

                        </WordCard>

                    ) : null}

                </WordSection>

                {/* =====================================================
                    MOST SEARCHED THIS WEEK
                ===================================================== */}

                {!loadingTopWords &&
                    topWords.length > 0 && (

                        <TopWordsSection>

                            <SectionTitle>
                                Most searched this week
                            </SectionTitle>

                            <TopWordsContainer>

                                <TopWords>

                                    {
                                        topWords.map(
                                            (word, index) => (

                                                <TopWord
                                                    key={
                                                        word.id
                                                    }
                                                    onClick={() =>
                                                        openTopWord(
                                                            word
                                                        )
                                                    }
                                                >

                                                    <Rank>
                                                        {
                                                            romanRank(
                                                                index + 1
                                                            )
                                                        }
                                                    </Rank>

                                                    <TopWordLemma
                                                        className="top-word"
                                                    >
                                                        {
                                                            word.lemma
                                                        }
                                                    </TopWordLemma>

                                                    {
                                                        word.meaning && (

                                                            <TopWordMeaning>
                                                                {
                                                                    word.meaning
                                                                }
                                                            </TopWordMeaning>

                                                        )
                                                    }

                                                </TopWord>

                                            )
                                        )
                                    }

                                </TopWords>

                            </TopWordsContainer>

                        </TopWordsSection>

                    )}

                {loadingTopWords && (

                    <TopWordsSection>

                        <SectionTitle>
                            Most searched this week
                        </SectionTitle>

                        <Loading>
                            Loading...
                        </Loading>

                    </TopWordsSection>

                )}

            </Content>

        </Wrapper>
    );
}

export default SearchPage;