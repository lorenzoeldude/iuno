import styled from "styled-components";

const Button = styled.button`
    margin-top: 2.5rem;

    display: inline-flex;
    align-items: center;
    gap: 0.75rem;

    padding: 1rem 2rem;

    border: none;

    background: ${({ theme }) => theme.colors.primary};
    color: white;

    font-size: 1rem;
    font-weight: 600;

    cursor: pointer;
    transition: 0.2s;

    &:hover {
        transform: translateY(-2px);
    }

    svg {
        font-size: 0.9rem;
    }
`;

function NavigationButton({ children, ...props }) {
    return <Button {...props}>{children}</Button>;
}

export default NavigationButton;