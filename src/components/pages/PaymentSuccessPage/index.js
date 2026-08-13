import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_URL } from "../../../config";

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
    min-height: calc(100vh - 80px);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 40px 24px;

    box-sizing: border-box;
`;

const Container = styled.div`
    width: 100%;
    max-width: 560px;

    text-align: center;

    animation: ${fadeIn} 0.7s ease-out;
`;

const Icon = styled.div`
    margin-bottom: 24px;

    font-size: 54px;
`;

const Title = styled.h1`
    margin: 0;

    font-size: 44px;
    font-weight: 500;

    letter-spacing: 0.5px;

    @media (max-width: 600px) {
        font-size: 36px;
    }
`;

const Description = styled.p`
    margin: 18px auto 32px;

    max-width: 470px;

    font-size: 17px;
    line-height: 1.6;

    opacity: 0.65;
`;

const Button = styled.button`
    padding: 13px 24px;

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
        opacity ${({ theme }) =>
            theme.transition.fast},
        transform ${({ theme }) =>
            theme.transition.fast};

    &:hover {
        opacity: 0.8;
        transform: translateY(-1px);
    }
`;

const Status = styled.div`
    margin-top: 20px;

    font-size: 14px;

    opacity: 0.55;
`;

function PaymentSuccessPage() {

    const navigate = useNavigate();

    const [checking, setChecking] =
        useState(true);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        /*
         * Stripe redirects here immediately after
         * Checkout. The webhook may need a moment
         * to update the database.
         *
         * We therefore check the billing status
         * a few times before showing the final state.
         */

        let attempts = 0;

        async function checkPremium() {

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/billing/status`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        "Failed to check billing status."
                    );
                }

                const data =
                    await response.json();

                if (data.is_premium) {

                    setChecking(false);

                    return;
                }

                attempts++;

                if (attempts < 10) {

                    setTimeout(
                        checkPremium,
                        1000
                    );

                } else {

                    setChecking(false);
                }

            } catch (error) {

                console.error(
                    "PAYMENT SUCCESS ERROR:",
                    error
                );

                setChecking(false);
            }
        }

        checkPremium();

    }, [navigate]);

    return (
        <Wrapper>

            <Container>

                <Icon>
                    ✓
                </Icon>

                <Title>
                    Welcome to IUNONI Premium
                </Title>

                {checking ? (

                    <>
                        <Description>
                            Your payment was
                            successful. We're
                            activating your Premium
                            access now...
                        </Description>

                        <Status>
                            Confirming your
                            subscription...
                        </Status>
                    </>

                ) : (

                    <>
                        <Description>
                            Your Premium subscription
                            is now active. You have
                            full access to IUNONI's
                            Premium features.
                        </Description>

                        <Button
                            onClick={() =>
                                navigate("/user")
                            }
                        >
                            Continue to IUNONI
                        </Button>
                    </>

                )}

            </Container>

        </Wrapper>
    );
}

export default PaymentSuccessPage;