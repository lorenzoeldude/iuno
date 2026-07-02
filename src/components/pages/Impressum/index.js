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
                    Information according to § 5 TMG
                </Heading>

                <p>
                    Lorenz Frank
                    <br />
                    Rothenberg-Nord 5,
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
                    Responsible for content according to § 55 (2) RStV
                </Heading>

                <p>
                    Lorenz Frank
                    <br />
                    Rothenberg-Nord 5,
                    <br />
                    82431 Kochel am See
                    <br />
                    Germany
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Liability for Content
                </Heading>

                <p>
                    As a service provider, we are responsible for our own content on these pages in accordance with general laws
                    pursuant to § 7 (1) TMG. However, according to §§ 8 to 10 TMG, we are not obliged to monitor transmitted or
                    stored third-party information or to investigate circumstances that indicate illegal activity.
                </p>

                <p>
                    Obligations to remove or block the use of information under general laws remain unaffected. However, liability
                    in this regard is only possible from the time of knowledge of a specific infringement.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Liability for Links
                </Heading>

                <p>
                    Our website contains links to external third-party websites, over whose content we have no control.
                    Therefore, we cannot assume any liability for such external content.
                </p>

                <p>
                    The respective provider or operator of the linked pages is always responsible for their content.
                </p>
            </Section>

            {/* ========================= */}
            <Section>
                <Heading>
                    Copyright
                </Heading>

                <p>
                    The content and works created by the site operator on these pages are subject to copyright law.
                    Duplication, processing, distribution, or any form of commercialization beyond the scope of copyright law
                    requires prior written consent of the respective author or creator.
                </p>
            </Section>

        </Wrapper>
    );
}

export default Impressum;