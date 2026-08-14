import styled from "styled-components";

import Button2 from "../../atoms/Button2";

/* =====================================================
   STYLES
   ===================================================== */

const PremiumBox = styled.div`
    padding: 28px;

    border: 1px solid ${({ theme }) =>
        theme.colors.accent};

    box-sizing: border-box;

    @media (max-width: 600px) {
        padding: 22px;
    }
`;

const PremiumHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    gap: 24px;

    @media (max-width: 650px) {
        flex-direction: column;
    }
`;

const PremiumInfo = styled.div`
    display: flex;
    flex-direction: column;

    gap: 6px;
`;

const PremiumTitleRow = styled.div`
    display: flex;
    align-items: center;

    gap: 10px;
`;

const PremiumTitle = styled.div`
    font-size: 22px;
    font-weight: 600;

    line-height: 1.2;
`;

const PremiumStatus = styled.div`
    display: flex;
    align-items: center;

    gap: 7px;

    margin-top: 2px;

    font-size: 13px;

    opacity: 0.55;
`;

const StatusDot = styled.span`
    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: currentColor;

    opacity: 0.7;
`;

const PremiumDescription = styled.div`
    max-width: 620px;

    margin-top: 8px;

    font-size: 14px;
    line-height: 1.5;

    opacity: 0.6;
`;

const SmallButton = styled(Button2)`
    width: auto;

    padding: 8px 14px;

    font-size: 13px;

    @media (max-width: 650px) {
        width: 100%;
    }
`;

const Benefits = styled.div`
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 12px;

    margin-top: 26px;
    padding-top: 22px;

    border-top: 1px solid ${({ theme }) =>
        theme.colors.border};

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const Benefit = styled.div`
    display: flex;
    align-items: flex-start;

    gap: 9px;

    font-size: 13px;
    line-height: 1.4;

    opacity: 0.65;
`;

const BenefitCheck = styled.span`
    flex-shrink: 0;

    font-size: 14px;

    opacity: 0.7;
`;

const BillingInfo = styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: 8px 24px;

    margin-top: 22px;
    padding-top: 18px;

    border-top: 1px solid ${({ theme }) =>
        theme.colors.border};

    font-size: 13px;

    opacity: 0.5;
`;

const BillingItem = styled.div`
    display: flex;
    gap: 5px;
`;

const BillingLabel = styled.span`
    opacity: 0.7;
`;

const BillingValue = styled.span`
    color: ${({ theme }) =>
        theme.colors.text};

    opacity: 0.9;
`;

const ErrorMessage = styled.div`
    margin-top: 18px;

    padding: 12px 14px;

    border: 1px solid ${({ theme }) =>
        theme.colors.border};

    font-size: 13px;

    line-height: 1.5;

    opacity: 0.7;
`;

/* =====================================================
   COMPONENT
   ===================================================== */

function PremiumSubscription({
    billing,
    loading,
    error,
    portalLoading,
    onManageSubscription,
    onUpgrade,
}) {
    function formatBillingDate(date) {
        return new Date(
            date
        ).toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );
    }

    /* =================================================
       LOADING
       ================================================= */

    if (loading) {
        return (
            <PremiumBox>

                <PremiumHeader>

                    <PremiumInfo>

                        <PremiumTitle>
                            IUNONI Premium
                        </PremiumTitle>

                        <PremiumStatus>
                            Checking subscription...
                        </PremiumStatus>

                    </PremiumInfo>

                </PremiumHeader>

            </PremiumBox>
        );
    }

    /* =================================================
       PREMIUM USER
       ================================================= */

    if (billing?.is_premium) {

        const isCancelling =
            billing.cancel_at_period_end;

        return (
            <PremiumBox>

                <PremiumHeader>

                    <PremiumInfo>

                        <PremiumTitleRow>

                            <PremiumTitle>
                                IUNONI Premium
                            </PremiumTitle>

                        </PremiumTitleRow>

                        <PremiumStatus>

                            <StatusDot />

                            {billing.status === "active"
                                ? isCancelling
                                    ? "Active · Cancels at end of billing period"
                                    : "Active"
                                : billing.status}

                        </PremiumStatus>

                        <PremiumDescription>

                            {isCancelling
                                ? "Your Premium access will remain available until the end of your current billing period."
                                : "You have full access to the Premium features of IUNONI."}

                        </PremiumDescription>

                    </PremiumInfo>

                    <SmallButton
                        onClick={
                            onManageSubscription
                        }
                        disabled={
                            portalLoading
                        }
                    >
                        {portalLoading
                            ? "Opening..."
                            : "Manage Subscription"}
                    </SmallButton>

                </PremiumHeader>

                <Benefits>

                    <Benefit>

                        <BenefitCheck>
                            ✓
                        </BenefitCheck>

                        <span>
                            Unlimited training
                        </span>

                    </Benefit>

                    <Benefit>

                        <BenefitCheck>
                            ✓
                        </BenefitCheck>

                        <span>
                            Full lesson access
                        </span>

                    </Benefit>

                    <Benefit>

                        <BenefitCheck>
                            ✓
                        </BenefitCheck>

                        <span>
                            Unlimited vocabulary
                        </span>

                    </Benefit>

                </Benefits>

                {billing.current_period_end && (

                    <BillingInfo>

                        <BillingItem>

                            <BillingLabel>
                                {isCancelling
                                    ? "Access until:"
                                    : "Next renewal:"}
                            </BillingLabel>

                            <BillingValue>
                                {formatBillingDate(
                                    billing.current_period_end
                                )}
                            </BillingValue>

                        </BillingItem>

                    </BillingInfo>

                )}

                {error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}

            </PremiumBox>
        );
    }

    /* =================================================
       FREE USER
       ================================================= */

    return (
        <PremiumBox>

            <PremiumHeader>

                <PremiumInfo>

                    <PremiumTitle>
                        IUNONI Premium
                    </PremiumTitle>

                    <PremiumStatus>
                        Not subscribed
                    </PremiumStatus>

                    <PremiumDescription>
                        Take your Latin learning
                        further with unlimited
                        training, full lesson access,
                        and an expanded vocabulary.
                    </PremiumDescription>

                </PremiumInfo>

                <SmallButton
                    onClick={onUpgrade}
                >
                    Upgrade to Premium
                </SmallButton>

            </PremiumHeader>

            <Benefits>

                <Benefit>

                    <BenefitCheck>
                        ✓
                    </BenefitCheck>

                    <span>
                        Unlimited training
                    </span>

                </Benefit>

                <Benefit>

                    <BenefitCheck>
                        ✓
                    </BenefitCheck>

                    <span>
                        Full lesson access
                    </span>

                </Benefit>

                <Benefit>

                    <BenefitCheck>
                        ✓
                    </BenefitCheck>

                    <span>
                        Unlimited vocabulary
                    </span>

                </Benefit>

            </Benefits>

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

        </PremiumBox>
    );
}

export default PremiumSubscription;