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

function Impressum() {
    return (
        <Wrapper>

            <Title>
                Legal Notice
            </Title>

            {/* ========================= */}
            <Section>
                <Heading>
                    Information according to § 5 DDG
                </Heading>

                <p>
                    Lorenz Frank
                    <br />
                    Rothenberg-Nord 5
                    <br />
                    82431 Kochel am See
                    <br />
                    Germany
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Contact
                </Heading>

                <p>
                    Email:
                    <br />
                    lorenz@lorenzfrank.com
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Accuracy of Information
                </Heading>

                <p>
                    IUNONI is intended for educational purposes. We strive to
                    provide accurate and reliable information, but errors or
                    omissions may occur. If you notice an error, please report
                    it to us.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Liability for Content
                </Heading>

                <p>
                    We are responsible for our own content on this website
                    under the applicable laws. We are not obliged to
                    continuously monitor transmitted or stored third-party
                    information or to investigate circumstances indicating
                    illegal activity.
                </p>

                <p>
                    Obligations to remove or block the use of information under
                    applicable law remain unaffected.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Liability for Links
                </Heading>

                <p>
                    Our website may contain links to external third-party
                    websites. We have no control over the content of these
                    websites and are not responsible for their content.
                </p>

                <p>
                    The respective provider or operator is responsible for the
                    content of linked pages.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Copyright
                </Heading>

                <p>
                    The content and works created by the site operator on these
                    pages are protected by copyright law. Duplication,
                    processing, distribution, or any form of commercialization
                    beyond the scope permitted by copyright law requires the
                    prior written consent of the respective author or creator.
                </p>
            </Section>

        </Wrapper>
    );
}

export default Impressum;