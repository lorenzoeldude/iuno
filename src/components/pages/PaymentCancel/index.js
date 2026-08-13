import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    min-height: 70vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 40px 24px;

    box-sizing: border-box;

    animation: ${fadeIn} 0.6s ease-out;
`;

const Container = styled.div`
    width: 100%;
    max-width: 600px;

    text-align: center;
`;

const Title = styled.h1`
    margin: 0 0 16px;

    font-size: 48px;
    font-weight: 500;
    letter-spacing: 1px;

    @media (max-width: 600px) {
        font-size: 38px;
    }
`;

const Message = styled.p`
    margin: 0 auto 30px;

    max-width: 480px;

    font-size: 17px;
    line-height: 1.6;

    opacity: 0.65;
`;

const Button = styled.button`
    padding: 12px 24px;

    border: 1px solid ${({ theme }) =>
        theme.colors.border};

    background: ${({ theme }) =>
        theme.colors.card};

    color: ${({ theme }) =>
        theme.colors.text};

    font: inherit;
    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    transition:
        opacity ${({ theme }) => theme.transition.fast},
        transform ${({ theme }) => theme.transition.fast};

    &:hover {
        opacity: 0.8;
        transform: translateY(-1px);
    }
`;

function PaymentCancel() {

    const navigate = useNavigate();

    return (
        <Wrapper>

            <Container>

                <Title>
                    Payment cancelled
                </Title>

                <Message>
                    Your payment was cancelled.
                    No subscription was created and
                    you have not been charged.
                </Message>

                <Button
                    onClick={() =>
                        navigate("/premium")
                    }
                >
                    Return to Premium
                </Button>

            </Container>

        </Wrapper>
    );
}

export default PaymentCancel;