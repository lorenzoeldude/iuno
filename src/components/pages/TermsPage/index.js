import React from "react";
import styled from "styled-components";

const Page = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.background || "#f8f7f3"};
  color: ${({ theme }) => theme.colors?.text || "#1f1f1f"};
`;

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 80px 24px 100px;

  @media (max-width: 700px) {
    padding: 56px 20px 80px;
  }
`;

const Header = styled.header`
  margin-bottom: 64px;
`;

const Eyebrow = styled.div`
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.6;
`;

const Title = styled.h1`
  margin: 0 0 18px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 64px;
  font-weight: 500;
  line-height: 1;

  @media (max-width: 700px) {
    font-size: 48px;
  }
`;

const Intro = styled.p`
  max-width: 650px;
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  opacity: 0.75;
`;

const Section = styled.section`
  padding: 32px 0;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#d8d5cd"};
`;

const Heading = styled.h2`
  margin: 0 0 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 32px;
  font-weight: 600;
`;

const Text = styled.p`
  margin: 0 0 14px;
  font-size: 16px;
  line-height: 1.7;
  opacity: 0.8;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  margin: 16px 0 0;
  padding-left: 22px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.7;
  opacity: 0.8;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    opacity: 0.65;
  }
`;

const Footer = styled.footer`
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#d8d5cd"};
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.55;
`;

export default function TermsPage() {
  return (
    <Page>
      <Container>

        <Header>
          <Eyebrow>IUNONI</Eyebrow>

          <Title>Terms of Use</Title>

          <Intro>
            These Terms of Use govern your use of the IUNONI website
            and application.
          </Intro>
        </Header>


        <Section>
          <Heading>1. Acceptance of these terms</Heading>

          <Text>
            By creating an account, accessing, or using IUNONI, you
            agree to these Terms of Use. If you do not agree with these
            terms, please do not use IUNONI.
          </Text>

          <Text>
            You must comply with all applicable laws and regulations
            when using the service.
          </Text>
        </Section>


        <Section>
          <Heading>2. The IUNONI service</Heading>

          <Text>
            IUNONI is a Latin-learning service that provides educational
            content including lessons, vocabulary, grammar exercises,
            reading materials, and training activities.
          </Text>

          <Text>
            We may add, modify, or remove features and content from the
            service from time to time.
          </Text>
        </Section>


        <Section>
          <Heading>3. Accounts</Heading>

          <Text>
            Some features require you to create an IUNONI account.
            You are responsible for providing accurate information and
            keeping your account credentials secure.
          </Text>

          <Text>
            You are responsible for activity performed through your
            account. Please contact us promptly if you believe your
            account has been accessed without authorization.
          </Text>
        </Section>


        <Section>
          <Heading>4. Educational content</Heading>

          <Text>
            The content provided by IUNONI is intended for educational
            and informational purposes.
          </Text>

          <Text>
            While we aim to provide accurate and useful Latin-learning
            materials, we do not guarantee that all content will always
            be complete, error-free, or suitable for every learner.
          </Text>
        </Section>


        <Section>
          <Heading>5. Premium subscriptions</Heading>

          <Text>
            IUNONI offers optional Premium subscriptions that provide
            access to additional features and content.
          </Text>

          <Text>
            Subscriptions are billed through the Apple App Store when
            purchased through the IUNONI iOS application.
          </Text>

          <Text>
            Subscriptions automatically renew unless canceled at least
            24 hours before the end of the current subscription period,
            where applicable under Apple's subscription terms.
          </Text>

          <Text>
            You can manage or cancel your subscription through your
            Apple Account subscription settings.
          </Text>
        </Section>


        <Section>
          <Heading>6. Payments and refunds</Heading>

          <Text>
            Payments for subscriptions purchased through the iOS
            application are processed by Apple. IUNONI does not
            directly process those payments.
          </Text>

          <Text>
            Refund requests for App Store purchases are handled by
            Apple in accordance with Apple's applicable policies.
          </Text>
        </Section>


        <Section>
          <Heading>7. Acceptable use</Heading>

          <Text>
            You agree not to misuse IUNONI or attempt to interfere with
            the operation of the service.
          </Text>

          <List>
            <ListItem>
              Do not attempt to gain unauthorized access to accounts,
              systems, or data.
            </ListItem>

            <ListItem>
              Do not interfere with or disrupt the service.
            </ListItem>

            <ListItem>
              Do not use automated methods to abuse or overload the
              service.
            </ListItem>

            <ListItem>
              Do not copy, redistribute, or commercially exploit IUNONI
              content without permission.
            </ListItem>
          </List>
        </Section>


        <Section>
          <Heading>8. Intellectual property</Heading>

          <Text>
            Unless otherwise stated, the IUNONI application, website,
            branding, design, text, educational materials, and other
            original content are owned by or licensed to IUNONI and are
            protected by applicable intellectual property laws.
          </Text>

          <Text>
            Your use of IUNONI does not transfer ownership of any
            intellectual property to you.
          </Text>
        </Section>


        <Section>
          <Heading>9. Availability of the service</Heading>

          <Text>
            We aim to keep IUNONI available and reliable, but we do not
            guarantee that the service will always be available,
            uninterrupted, or free from errors.
          </Text>

          <Text>
            We may temporarily suspend access when necessary for
            maintenance, security, updates, or other operational
            reasons.
          </Text>
        </Section>


        <Section>
          <Heading>10. Termination</Heading>

          <Text>
            You may stop using IUNONI at any time.
          </Text>

          <Text>
            We may suspend or terminate an account if we reasonably
            believe that the account has violated these Terms of Use,
            applicable law, or has been used to abuse or compromise the
            service.
          </Text>

          <Text>
            Termination of an IUNONI account does not automatically
            cancel an Apple App Store subscription. Subscriptions must
            be canceled through the Apple Account used for the
            purchase.
          </Text>
        </Section>


        <Section>
          <Heading>11. Disclaimer</Heading>

          <Text>
            To the extent permitted by applicable law, IUNONI is
            provided on an "as is" and "as available" basis without
            warranties that the service will be uninterrupted,
            error-free, or completely accurate.
          </Text>
        </Section>


        <Section>
          <Heading>12. Limitation of liability</Heading>

          <Text>
            To the extent permitted by applicable law, IUNONI and its
            operators will not be liable for indirect, incidental,
            special, consequential, or punitive damages arising from
            your use of, or inability to use, the service.
          </Text>
        </Section>


        <Section>
          <Heading>13. Changes to these terms</Heading>

          <Text>
            We may update these Terms of Use from time to time. When
            changes are made, we will update the date shown below.
          </Text>

          <Text>
            Your continued use of IUNONI after updated terms become
            effective constitutes acceptance of the revised terms,
            to the extent permitted by applicable law.
          </Text>
        </Section>


        <Section>
          <Heading>14. Contact</Heading>

          <Text>
            If you have questions about these Terms of Use, contact us
            at{" "}
            <Link href="mailto:lorenz@lorenzfrank.com">
              lorenz@lorenzfrank.com
            </Link>
            .
          </Text>
        </Section>


        <Footer>
          <div>
            Last updated: September 8, 2026
          </div>

        </Footer>

      </Container>
    </Page>
  );
}