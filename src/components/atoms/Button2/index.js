import styled from "styled-components";

const Button2 = styled.button`
    width: 100%;
    padding: 14px;

    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    border: none;

    cursor: pointer;

    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.opposite};

    transition: background ${({ theme }) => theme.transition.fast};

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export default Button2;