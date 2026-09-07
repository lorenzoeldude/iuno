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
                    Rothenberg Nord 5,
                    <br />
                    82431 Kochel am See
                    <br />
                    Germany
                    <br />
                    Email: lorenz@lorenzfrank.com
                </p>
                <p>
                    This Privacy Policy applies to the IUNONI website and the IUNONI
                    mobile application.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>2. Data We Collect</Heading>

                <p><strong>Account Data:</strong></p>
                <p>
                    When you create an IUNONI account, we collect your email address,
                    username, and a securely hashed password.
                </p>

                <p><strong>Authentication Data:</strong></p>
                <p>
                    We process authentication information such as JSON Web Tokens (JWT),
                    login timestamps, and session-related information to authenticate
                    users and maintain secure access to their accounts.
                </p>

                <p><strong>Email Verification Data:</strong></p>
                <p>
                    We collect information necessary to verify email addresses, including
                    a hashed verification token, verification status, and token expiry
                    information.
                </p>

                <p><strong>Learning and Product Interaction Data:</strong></p>
                <p>
                    We collect and store information about your use of IUNONI, including
                    lesson progress, completed lessons, vocabulary activity, training
                    attempts, scores, and related learning statistics. This information
                    is associated with your account so that we can save your progress
                    and provide the learning features of the service.
                </p>

                <p><strong>Purchase and Subscription Data:</strong></p>
                <p>
                    If you purchase an IUNONI Premium subscription, we process information
                    about your purchase and subscription status in order to provide Premium
                    features and determine whether your account has access to paid content.
                </p>

                <p>
                    Payments made through the IUNONI iOS application are processed by
                    Apple through the App Store and StoreKit. IUNONI does not receive or
                    store your payment card number or other payment card details.
                </p>

                <p><strong>Server and Security Data:</strong></p>
                <p>
                    We may process basic server and security information, such as IP
                    addresses, login attempts, timestamps, and technical request
                    information, for purposes including security, fraud prevention,
                    abuse prevention, and maintaining the reliability of the service.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>3. How We Use Your Data</Heading>
                <p>
                    We use your data to:
                </p>

                <ul>
                    <li>create and maintain your IUNONI account;</li>
                    <li>authenticate users and provide secure access;</li>
                    <li>verify email addresses;</li>
                    <li>save and display lesson progress and learning activity;</li>
                    <li>provide vocabulary, training, reading, and other learning features;</li>
                    <li>provide and manage Premium features and subscriptions;</li>
                    <li>secure the service and prevent fraud or abuse;</li>
                    <li>maintain and improve the reliability and performance of the service;</li>
                    <li>comply with applicable legal obligations.</li>
                </ul>

                <p>
                    We do not use your personal data for third-party advertising or
                    cross-app or cross-website tracking.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>4. Legal Basis (GDPR)</Heading>
                <p>
                    Where the GDPR applies, we process personal data on the following
                    legal bases under Article 6 GDPR:
                </p>

                <ul>
                    <li>
                        <strong>Art. 6(1)(b) GDPR:</strong> processing necessary to provide
                        the IUNONI service and perform our contractual obligations.
                    </li>
                    <li>
                        <strong>Art. 6(1)(c) GDPR:</strong> processing necessary to comply
                        with legal obligations.
                    </li>
                    <li>
                        <strong>Art. 6(1)(f) GDPR:</strong> processing necessary for our
                        legitimate interests, including maintaining security, preventing
                        abuse and fraud, and operating and improving the service.
                    </li>
                </ul>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>5. Data Storage</Heading>
                <p>
                    Account and learning data is stored in a PostgreSQL database operated
                    for the IUNONI service.
                </p>

                <p>
                    Passwords are stored using bcrypt hashing. Email verification tokens
                    are stored in hashed form. Authentication uses JSON Web Tokens (JWT).
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>6. Email Verification</Heading>
                <p>
                    We send a verification email when you register an IUNONI account.
                    The verification token is stored in hashed form and expires after a
                    limited period or after successful verification.
                </p>

                <p>
                    Email verification is used to confirm ownership of the email address
                    associated with your account and to help maintain account security.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>7. Authentication</Heading>
                <p>
                    IUNONI uses JSON Web Tokens (JWT) for authentication. These tokens
                    allow the application or website to authenticate requests to
                    protected parts of the service.
                </p>

                <p>
                    On the website, authentication information may be stored using
                    browser local storage. The iOS application uses its own secure
                    application storage for authentication information.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>8. Cookies and Local Storage</Heading>
                <p>
                    The IUNONI website may use local storage and necessary cookies or
                    similar technologies to maintain authentication and provide
                    essential functionality.
                </p>

                <p>
                    We do not use advertising cookies or tracking cookies for
                    cross-site or cross-app tracking.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>9. Search and Learning Activity</Heading>
                <p>
                    IUNONI provides dictionary and search functionality. Search requests
                    may be processed by our servers to provide search results and related
                    functionality.
                </p>

                <p>
                    We do not use dictionary or search activity to track users across
                    other apps, websites, or services.
                </p>

                <p>
                    Learning activity such as lesson progress, vocabulary activity,
                    training attempts, scores, and learning statistics may be stored
                    and associated with your account so that IUNONI can provide
                    personalized progress and learning functionality.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>10. Third-Party Services</Heading>
                <p>
                    We use third-party service providers where necessary to operate
                    IUNONI. These providers may process personal data on our behalf
                    and only for purposes necessary to provide their services.
                </p>

                <p>
                    These services may include:
                </p>

                <ul>
                    <li>
                        <strong>Email delivery:</strong> We may use Resend to send
                        account and email verification messages.
                    </li>
                    <li>
                        <strong>Hosting and infrastructure:</strong> We use third-party
                        hosting and infrastructure providers to operate the IUNONI
                        website, API, and database.
                    </li>
                    <li>
                        <strong>Apple App Store:</strong> Purchases and subscriptions
                        made through the iOS application are processed through Apple's
                        App Store and StoreKit.
                    </li>
                </ul>

                <p>
                    These providers may process information according to their own
                    privacy policies and applicable data protection requirements.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>11. Advertising and Tracking</Heading>
                <p>
                    IUNONI does not currently display third-party advertising and does
                    not use personal data for targeted advertising.
                </p>

                <p>
                    We do not use email addresses, user IDs, purchase history, or
                    learning activity for cross-app or cross-website tracking.
                </p>

                <p>
                    We do not sell personal data or share personal data with data
                    brokers for tracking or advertising purposes.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>12. Data Retention</Heading>
                <p>
                    We retain personal data for as long as reasonably necessary to
                    provide the IUNONI service, maintain user accounts, fulfill
                    contractual or legal obligations, resolve disputes, and protect
                    the security of the service.
                </p>

                <p>
                    Verification tokens are deleted after successful verification
                    or when they expire.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>13. Your Rights (GDPR)</Heading>
                <p>
                    Where applicable under the GDPR, you have the right to:
                </p>

                <ul>
                    <li>request access to your personal data;</li>
                    <li>request correction of inaccurate personal data;</li>
                    <li>request deletion of your personal data;</li>
                    <li>request restriction of processing;</li>
                    <li>object to certain processing;</li>
                    <li>request data portability where applicable.</li>
                </ul>

                <p>
                    You may exercise these rights by contacting us using the email
                    address provided below.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>14. Account and Data Deletion</Heading>
                <p>
                    If you would like to delete your IUNONI account and associated
                    personal data, you may contact us at the email address below.
                </p>

                <p>
                    We will process deletion requests in accordance with applicable
                    legal requirements. Some information may need to be retained where
                    required by law or where necessary to establish, exercise, or
                    defend legal claims.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>15. Security</Heading>
                <p>
                    We use reasonable technical and organizational measures designed
                    to protect personal data against unauthorized access, alteration,
                    disclosure, or destruction.
                </p>

                <p>
                    Security measures include password hashing using bcrypt, hashing
                    of email verification tokens, authenticated access using JWT,
                    secure database access, and encrypted connections where supported.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>16. International Data Transfers</Heading>
                <p>
                    Some of our service providers may process data in countries outside
                    your country of residence or outside the European Economic Area.
                    Where required by applicable law, we rely on appropriate safeguards
                    for international data transfers.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>17. Children's Privacy</Heading>
                <p>
                    IUNONI is not designed to knowingly collect personal information
                    from children without appropriate authorization. If you believe
                    that a child has provided personal data to us inappropriately,
                    please contact us so that we can review and take appropriate action.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>18. Changes to This Privacy Policy</Heading>
                <p>
                    We may update this Privacy Policy from time to time to reflect
                    changes to IUNONI, our data practices, or applicable legal
                    requirements.
                </p>

                <p>
                    The latest version of this Privacy Policy will always be available
                    on this page.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>19. Contact</Heading>
                <p>
                    If you have questions about this Privacy Policy or wish to exercise
                    your data protection rights, please contact:
                </p>

                <p>
                    Lorenz Frank
                    <br />
                    Email: lorenz@lorenzfrank.com
                </p>
            </Section>

        </Wrapper>
    );
}

export default PrivacyPolicy;