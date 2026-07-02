import styled from "styled-components";

const Wrapper = styled.div`
    width: 70%;
    padding: 60px 0;
    line-height: 1.7;
`;

const Title = styled.h1`
    margin-bottom: 30px;
`;

const Section = styled.section`
    margin-bottom: 35px;
`;

const Heading = styled.h2`
    margin-bottom: 10px;
`;

function PrivacyPolicy() {
    return (
        <Wrapper>

            <Title>
                Privacy Policy
            </Title>

            {/* ========================= */}
            <Section>
                <Heading>1. Data Controller</Heading>
                <p>
                    Lorenz Frank
                    <br />
                    Rothenberg-Nord 5,
                    <br />
                    82431 Kochel am See
                    <br />
                    Germany
                    <br />
                    Email: lorenz@lorenzfrank.com
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>2. Data We Collect</Heading>

                <p><strong>Account Data:</strong></p>
                <p>
                    Email address, username, and hashed password.
                </p>

                <p><strong>Authentication Data:</strong></p>
                <p>
                    JSON Web Tokens (JWT), login timestamps, and session metadata.
                </p>

                <p><strong>Email Verification Data:</strong></p>
                <p>
                    Verification token (hashed), verification status, and expiry timestamp.
                </p>

                <p><strong>Usage Data:</strong></p>
                <p>
                    Basic server logs such as login attempts and IP addresses for security purposes.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>3. How We Use Your Data</Heading>
                <p>
                    We use your data to provide and maintain the service, authenticate users,
                    verify email addresses, secure the platform, and prevent abuse.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>4. Legal Basis (GDPR)</Heading>
                <p>
                    We process your data under Art. 6 (1)(b) GDPR (contract performance),
                    Art. 6 (1)(c) GDPR (legal obligation), and Art. 6 (1)(f) GDPR (legitimate interests).
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>5. Data Storage</Heading>
                <p>
                    Your data is stored in a PostgreSQL database. We use bcrypt hashing for passwords,
                    hashed tokens for email verification, and JWT-based authentication for sessions.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>6. Email Verification</Heading>
                <p>
                    We send a verification email when you register. The token is stored in hashed form
                    and expires after a limited time or after successful verification.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>7. Authentication (JWT)</Heading>
                <p>
                    We use JSON Web Tokens (JWT) for authentication. Tokens are stored in your browser
                    and are required for accessing protected endpoints.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>8. Cookies & Local Storage</Heading>
                <p>
                    We use localStorage to store authentication tokens. We do not use tracking or advertising cookies.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>9. Third-Party Services</Heading>
                <p>
                    We may use third-party services such as email providers (e.g. Resend) and hosting providers
                    to operate the platform.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>10. Data Retention</Heading>
                <p>
                    We retain data only as long as necessary to provide the service or comply with legal obligations.
                    Verification tokens are deleted after use or expiry.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>11. Your Rights (GDPR)</Heading>
                <p>
                    You have the right to access, correct, delete, and restrict processing of your personal data.
                    You may also request data portability.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>12. Security</Heading>
                <p>
                    We use industry-standard security measures including password hashing (bcrypt),
                    token hashing, JWT authentication, and secure database access.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>13. Changes</Heading>
                <p>
                    We may update this Privacy Policy from time to time. The latest version will always be available on this page.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>14. Contact</Heading>
                <p>
                    Email: lorenz@lorenzfrank.com
                </p>
            </Section>

        </Wrapper>
    );
}

export default PrivacyPolicy;