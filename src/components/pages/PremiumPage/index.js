import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_URL } from "../../../config";
import Button2 from "../../atoms/Button2";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh - 80px);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 60px 24px;

    box-sizing: border-box;

    animation: ${fadeIn} 0.7s ease-out;
`;

const Container = styled.div`
    width: 100%;
    max-width: 620px;

    display: flex;
    flex-direction: column;

    align-items: center;

    text-align: center;
`;

const Eyebrow = styled.div`
    margin-bottom: 14px;

    font-size: 12px;
    font-weight: 600;

    letter-spacing: 2px;
    text-transform: uppercase;

    opacity: 0.5;
`;

const Title = styled.h1`
    margin: 0;

    font-size: 52px;
    font-weight: 500;

    letter-spacing: 1px;
    line-height: 1.1;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const Subtitle = styled.p`
    max-width: 500px;

    margin: 18px 0 40px;

    font-size: 17px;
    line-height: 1.6;

    opacity: 0.65;
`;

const Card = styled.div`
    width: 100%;

    box-sizing: border-box;

    padding: 34px;

    border: 1px solid ${({ theme }) =>
        theme.colors.accent};

    text-align: left;

    @media (max-width: 600px) {
        padding: 26px 22px;
    }
`;

const PriceArea = styled.div`
    display: flex;

    align-items: baseline;

    gap: 7px;

    margin-bottom: 28px;
`;

const Price = styled.div`
    font-size: 42px;
    font-weight: 600;

    line-height: 1;
`;

const PricePeriod = styled.div`
    font-size: 15px;

    opacity: 0.55;
`;

const FeatureList = styled.div`
    display: flex;

    flex-direction: column;

    gap: 17px;

    margin-bottom: 32px;
`;

const Feature = styled.div`
    display: flex;

    align-items: flex-start;

    gap: 12px;

    font-size: 16px;

    line-height: 1.5;
`;

const Check = styled.span`
    flex-shrink: 0;

    font-size: 17px;

    opacity: 0.7;
`;

const CheckoutButton = styled(Button2)`
    width: 100%;
`;

const BillingSwitch = styled.div`
    display: flex;

    margin-top: 18px;

    padding: 3px;

    border: 1px solid ${({ theme }) =>
        theme.colors.border};

    background: ${({ theme }) =>
        theme.colors.card};

    box-sizing: border-box;
`;

const BillingOption = styled.button`
    flex: 1;

    padding: 9px 18px;

    border: none;

    background: ${({ active, theme }) =>
        active
            ? theme.colors.accent
            : "transparent"};

    color: ${({ active, theme }) =>
        active
            ? theme.colors.background
            : theme.colors.text};

    font: inherit;

    font-size: 13px;
    font-weight: ${({ active }) =>
        active ? 600 : 400};

    cursor: pointer;

    transition:
        background ${({ theme }) =>
            theme.transition.fast},
        color ${({ theme }) =>
            theme.transition.fast};

    &:hover {
        opacity: 0.9;
    }
`;

const YearlyNote = styled.div`
    margin-top: 8px;

    font-size: 12px;

    color: ${({ theme }) =>
        theme.colors.text};

    opacity: 0.5;
`;

const BackButton = styled.button`
    margin-top: 22px;

    padding: 0;

    border: none;

    background: none;

    color: ${({ theme }) =>
        theme.colors.text};

    font: inherit;

    font-size: 14px;

    opacity: 0.5;

    cursor: pointer;

    transition:
        opacity ${({ theme }) =>
            theme.transition.fast};

    &:hover {
        opacity: 0.9;
    }
`;

const ErrorMessage = styled.div`
    width: 100%;

    box-sizing: border-box;

    margin-top: 18px;

    padding: 13px 16px;

    border: 1px solid ${({ theme }) =>
        theme.colors.border};

    font-size: 14px;

    line-height: 1.5;

    text-align: left;

    opacity: 0.8;
`;

const LoadingText = styled.div`
    font-size: 16px;

    color: ${({ theme }) =>
        theme.colors.text};

    opacity: 0.6;
`;

function PremiumPage() {

    const navigate = useNavigate();

    const [billingPeriod, setBillingPeriod] =
        useState("monthly");

    const [loading, setLoading] =
        useState(false);

    const [checkingSubscription, setCheckingSubscription] =
        useState(true);

    const [error, setError] =
        useState("");

    const isYearly =
        billingPeriod === "yearly";

    const price =
        isYearly ? "€99.99" : "€9.99";

    const pricePeriod =
        isYearly ? "/ year" : "/ month";

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        async function checkSubscription() {

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
                        "Failed to check subscription."
                    );
                }

                const data =
                    await response.json();

                if (data.is_premium) {

                    navigate("/user", {
                        replace: true,
                    });

                    return;
                }

            } catch (err) {

                console.error(
                    "PREMIUM STATUS ERROR:",
                    err
                );

                setError(
                    "Unable to check your subscription status."
                );

            } finally {

                setCheckingSubscription(false);

            }
        }

        checkSubscription();

    }, [navigate]);

    async function handleCheckout() {

        setLoading(true);
        setError("");

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const priceId = isYearly
                ? process.env.REACT_APP_STRIPE_PREMIUM_YEARLY_PRICE_ID
                : process.env.REACT_APP_STRIPE_PREMIUM_PRICE_ID;

            if (!priceId) {

                throw new Error(
                    isYearly
                        ? "Stripe Premium yearly Price ID is not configured."
                        : "Stripe Premium monthly Price ID is not configured."
                );
            }

            const response =
                await fetch(
                    `${API_URL}/api/stripe/create-checkout-session`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`,
                        },

                        body: JSON.stringify({
                            price_id: priceId,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.error ||
                    data.message ||
                    "Failed to create checkout session."
                );
            }

            if (!data.checkout_url) {

                throw new Error(
                    "Stripe did not return a checkout URL."
                );
            }

            window.location.href =
                data.checkout_url;

        } catch (err) {

            console.error(
                "STRIPE CHECKOUT ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to start checkout."
            );

            setLoading(false);
        }
    }

    if (checkingSubscription) {

        return (
            <Wrapper>
                <Container>
                    <LoadingText>
                        Checking subscription...
                    </LoadingText>
                </Container>
            </Wrapper>
        );
    }

    return (
        <Wrapper>

            <Container>

                <Eyebrow>
                    IUNONI Premium
                </Eyebrow>

                <Title>
                    Go further with Latin.
                </Title>

                <Subtitle>
                    Unlock the complete IUNONI
                    learning experience and make
                    Latin a part of your daily study.
                </Subtitle>

                <Card>

                    <PriceArea>

                        <Price>
                            {price}
                        </Price>

                        <PricePeriod>
                            {pricePeriod}
                        </PricePeriod>

                    </PriceArea>

                    <FeatureList>

                        <Feature>
                            <Check>
                                ✓
                            </Check>

                            <span>
                                Unlimited vocabulary
                                training
                            </span>
                        </Feature>

                        <Feature>
                            <Check>
                                ✓
                            </Check>

                            <span>
                                Full access to
                                all lessons
                            </span>
                        </Feature>

                        <Feature>
                            <Check>
                                ✓
                            </Check>

                            <span>
                                Add unlimited words
                                to your vocabulary list
                            </span>
                        </Feature>

                        <Feature>
                            <Check>
                                ✓
                            </Check>

                            <span>
                                Cancel anytime
                            </span>
                        </Feature>

                    </FeatureList>

                    <CheckoutButton
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading
                            ? "Opening Checkout..."
                            : "Subscribe to Premium"}
                    </CheckoutButton>

                    {error && (
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    )}

                </Card>

                <BillingSwitch>

                    <BillingOption
                        type="button"
                        active={!isYearly}
                        onClick={() =>
                            setBillingPeriod("monthly")
                        }
                    >
                        Monthly
                    </BillingOption>

                    <BillingOption
                        type="button"
                        active={isYearly}
                        onClick={() =>
                            setBillingPeriod("yearly")
                        }
                    >
                        Yearly
                    </BillingOption>

                </BillingSwitch>

                {isYearly && (
                    <YearlyNote>
                        Save €19.89 compared with monthly billing
                    </YearlyNote>
                )}

                <BackButton
                    onClick={() =>
                        navigate("/user")
                    }
                >
                    ← Back to account
                </BackButton>

            </Container>

        </Wrapper>
    );
}

export default PremiumPage;