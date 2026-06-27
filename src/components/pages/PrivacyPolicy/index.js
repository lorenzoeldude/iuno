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



            <Section>

                <p>
                    We take the protection of your personal data seriously.
                    This privacy policy explains what personal data we
                    collect, how we use it, and what rights you have regarding
                    your data.
                </p>

            </Section>




            <Section>

                <Heading>
                    1. Controller
                </Heading>

                <p>
                    The controller responsible for data processing is:
                </p>

                <p>
                    [Your Full Name / Company Name]
                    <br />
                    [Address]
                    <br />
                    [Email Address]
                </p>

            </Section>




            <Section>

                <Heading>
                    2. Data We Collect
                </Heading>

                <p>
                    When you create an account and use our platform, we may
                    collect the following information:
                </p>

                <ul>
                    <li>Email address</li>
                    <li>Username or display name</li>
                    <li>Password data (stored securely as a hash)</li>
                    <li>Saved vocabulary and word lists</li>
                    <li>Learning progress and training activity</li>
                </ul>

                <p>
                    We may also collect technical information such as IP
                    address, browser type, and access times when necessary
                    for security and operation of the service.
                </p>

            </Section>




            <Section>

                <Heading>
                    3. Purpose of Data Processing
                </Heading>

                <p>
                    We process your data for the following purposes:
                </p>

                <ul>
                    <li>
                        Providing and maintaining your user account
                    </li>

                    <li>
                        Saving your vocabulary lists and learning progress
                    </li>

                    <li>
                        Providing vocabulary training features
                    </li>

                    <li>
                        Improving the functionality and security of the
                        platform
                    </li>
                </ul>

            </Section>




            <Section>

                <Heading>
                    4. Account Authentication
                </Heading>

                <p>
                    To authenticate users, we use secure authentication
                    methods. Passwords are not stored in plain text but are
                    protected using secure hashing techniques.
                </p>

                <p>
                    Authentication tokens may be stored on your device to
                    keep you logged in.
                </p>

            </Section>




            <Section>

                <Heading>
                    5. Storage of Data
                </Heading>

                <p>
                    Your personal data is stored on secure servers provided
                    by our hosting provider:
                </p>

                <p>
                    [Hosting Provider Name]
                    <br />
                    [Location if applicable]
                </p>

                <p>
                    We take reasonable technical and organizational measures
                    to protect your information against unauthorized access,
                    loss, or misuse.
                </p>

            </Section>




            <Section>

                <Heading>
                    6. Sharing of Data
                </Heading>

                <p>
                    We do not sell your personal data.
                </p>

                <p>
                    Your data may only be shared with service providers
                    necessary to operate the platform, such as hosting or
                    infrastructure providers.
                </p>

            </Section>




            <Section>

                <Heading>
                    7. Cookies and Local Storage
                </Heading>

                <p>
                    Our platform may use browser storage technologies,
                    such as local storage, to maintain authentication and
                    provide essential functionality.
                </p>

                <p>
                    We do not use tracking cookies or advertising cookies
                    unless explicitly stated.
                </p>

            </Section>




            <Section>

                <Heading>
                    8. Your Rights
                </Heading>

                <p>
                    Depending on applicable data protection laws, you may
                    have the right to:
                </p>

                <ul>
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your account and data</li>
                    <li>Object to certain types of processing</li>
                    <li>Request restriction of processing</li>
                </ul>

                <p>
                    To exercise these rights, contact:
                    <br />
                    [Your Email Address]
                </p>

            </Section>




            <Section>

                <Heading>
                    9. Account Deletion
                </Heading>

                <p>
                    You may request deletion of your account and associated
                    personal data by contacting us at:
                </p>

                <p>
                    [Your Email Address]
                </p>

                <p>
                    After deletion, your personal data will be removed unless
                    we are legally required to retain certain information.
                </p>

            </Section>




            <Section>

                <Heading>
                    10. Changes to This Privacy Policy
                </Heading>

                <p>
                    We may update this privacy policy from time to time.
                    The latest version will always be available on this page.
                </p>

            </Section>




            <Section>

                <Heading>
                    11. Contact
                </Heading>

                <p>
                    If you have questions about this privacy policy, contact:
                </p>

                <p>
                    [Your Name]
                    <br />
                    [Your Email Address]
                </p>

            </Section>



        </Wrapper>

    );

}


export default PrivacyPolicy;