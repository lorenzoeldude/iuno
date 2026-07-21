import styled from "styled-components";

const Word = styled.span`
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.highlight};
    }
`;

function ClickableText({ text, onWordClick }) {
    return text.split(/(\s+)/).map((token, index) => {
        if (/^\s+$/.test(token)) {
            return token;
        }

        const cleanWord = token.replace(/[.,;:!?'"()[\]—-]/g, "");

        if (!cleanWord) {
            return token;
        }

        return (
            <Word
                key={index}
                onClick={(e) => {
                    e.stopPropagation();
                    onWordClick(cleanWord, e);
                }}
            >
                {token}
            </Word>
        );
    });
}

export default ClickableText;