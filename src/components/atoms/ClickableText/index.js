import styled from "styled-components";

const Word = styled.span`
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s;

    &:hover {
        background: rgba(255, 255, 0, 0.3);
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
                onClick={(e) => onWordClick(cleanWord, e)}
            >
                {token}
            </Word>
        );
    });
}

export default ClickableText;