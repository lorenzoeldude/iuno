import styled from "styled-components";

const StyledCard = styled.div`
    min-height: ${({ size }) =>
        size === "small"
            ? "140px"
            : size === "big"
            ? "320px"
            : "220px"};

    padding: ${({ size }) =>
        size === "small"
            ? "40px"
            : size === "big"
            ? "100px"
            : "80px"};

    border: 1px solid ${({ theme }) => theme.colors.border};

    margin: 5px 0;

    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};

    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: all ${({ theme }) => theme.transition.normal};

    position: relative;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ size }) =>
            size === "small"
                ? "30px"
                : size === "big"
                ? "60px"
                : "50px"};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 30px 24px;
        min-height: auto;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 3px;

        background: ${({ theme }) => theme.colors.accent};

        transform: scaleX(0);
        transform-origin: left;

        transition: transform ${({ theme }) => theme.transition.normal};
    }

    &:hover {
        transform: translateY(-4px);

        border-color: #b89b5e;

        box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};

        cursor: pointer;
    }

    &:hover::before {
        transform: scaleX(1);
    }
`;

const CardTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 10px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 26px;
    }
`;

const CardText = styled.p`
    font-size: 20px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 18px;
    }
`;

function Card({ href, title, children, size = "medium", ...props }) {
    return (
        <StyledCard href={href} size={size} {...props}>
            <CardTitle>{title}</CardTitle>

            <CardText>{children}</CardText>
        </StyledCard>
    );
}

export default Card;