import styled from "styled-components";
import { useState } from "react";
import { API_URL } from "../../../config";

const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 24px;
`;

const Description = styled.div`
    opacity: 0.7;
    line-height: 1.5;
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 12px 14px;

    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 6px;

    background: transparent;
    color: inherit;

    font-family: inherit;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: currentColor;
    }
`;

const Button = styled.button`
    height: 50px;
    padding: 0 25px;

    border: 1px solid currentColor;
    border-radius: 6px;

    background: transparent;
    color: inherit;

    font-family: inherit;
    font-size: 16px;
    font-weight: bold;

    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover:not(:disabled) {
        opacity: 0.7;
    }
`;

const Status = styled.div`
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
`;

function StripeTest() {

    const [priceId, setPriceId] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleCheckout = async () => {

        if (!priceId.trim()) {
            setStatus("Please enter a Stripe Price ID.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setStatus("You are not logged in.");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/stripe/create-checkout-session`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        price_id: priceId.trim(),
                    }),
                }
            );

            const data = await response.json();

            console.log("Stripe response:", data);

            if (!response.ok) {
                setStatus(
                    data.error ||
                    data.message ||
                    "Failed to create Checkout Session."
                );
                return;
            }

            if (!data.checkout_url) {
                setStatus("Stripe did not return a checkout URL.");
                return;
            }

            window.location.href = data.checkout_url;

        } catch (error) {

            console.error("Stripe checkout error:", error);

            setStatus(
                "Could not connect to the IUNO API."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <Section>

            <Title>
                Stripe Test
            </Title>

            <Description>
                Enter a Stripe test Price ID to create a Checkout Session.
            </Description>

            <Input
                type="text"
                placeholder="price_..."
                value={priceId}
                onChange={(event) =>
                    setPriceId(event.target.value)
                }
            />

            <Button
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading
                    ? "Creating Checkout..."
                    : "Test Stripe Checkout"
                }
            </Button>

            <Button
                onClick={async () => {
                    const token = localStorage.getItem("token");

                    const response = await fetch(
                        `${API_URL}/api/stripe/create-portal-session`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const data = await response.json();

                    console.log("Portal response:", data);

                    if (!response.ok) {
                        alert(
                            data.error ||
                            data.message ||
                            "Failed to create portal session."
                        );
                        return;
                    }

                    window.location.href = data.url;
                }}
            >
                Manage Subscription
            </Button>

            {status && (
                <Status>
                    {status}
                </Status>
            )}

        </Section>
    );
}

export default StripeTest;