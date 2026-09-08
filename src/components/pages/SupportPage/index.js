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
  font-family: "Cormorant Garamond", serif;
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
  font-size: 19px;
  line-height: 1.7;
  opacity: 0.75;
`;

const Section = styled.section`
  padding: 32px 0;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#d8d5cd"};
`;

const Heading = styled.h2`
  margin: 0 0 14px;
  font-family: "Cormorant Garamond", serif;
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

const Link = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    opacity: 0.65;
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

const Footer = styled.footer`
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#d8d5cd"};
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.55;
`;

export default function SupportPage() {
  return (
    <Page>
      <Container>

        <Header>
          <Eyebrow>IUNONI</Eyebrow>

          <Title>Support</Title>

          <Intro>
            Need help with IUNONI? Find answers to common questions
            below or contact us if you need further assistance.
          </Intro>
        </Header>


        <Section>
          <Heading>Getting started</Heading>

          <Text>
            IUNONI is a Latin-learning app designed to help you learn
            Latin through structured lessons, vocabulary practice,
            grammar exercises, and reading.
          </Text>

          <Text>
            Create an account or sign in to keep your learning progress
            associated with your account.
          </Text>
        </Section>


        <Section>
          <Heading>Subscriptions</Heading>

          <Text>
            IUNONI Premium provides access to the complete curriculum,
            unlimited trainer practice, and unlimited vocabulary.
          </Text>

          <Text>
            Subscriptions are purchased through the Apple App Store.
            Your subscription is managed through your Apple Account.
          </Text>

          <Text>
            To manage or cancel your subscription, open your Apple
            Account subscription settings on your device.
          </Text>
        </Section>


        <Section>
          <Heading>Restore a purchase</Heading>

          <Text>
            If you have previously purchased IUNONI Premium and it is
            not appearing as active, open the Premium screen in the app
            and select <strong>Restore Purchases</strong>.
          </Text>

          <Text>
            Make sure you are signed in to the Apple Account that was
            used to purchase the subscription.
          </Text>
        </Section>


        <Section>
          <Heading>Account and login</Heading>

          <Text>
            If you are having trouble signing in, make sure you are
            using the email address and password associated with your
            IUNONI account.
          </Text>

          <Text>
            If you continue to have problems accessing your account,
            please contact support.
          </Text>
        </Section>


        <Section>
          <Heading>Something isn't working?</Heading>

          <Text>
            If you encounter a bug or another problem while using
            IUNONI, please contact us and include as much information
            as possible about the problem.
          </Text>

          <List>
            <ListItem>
              What you were trying to do
            </ListItem>

            <ListItem>
              What happened
            </ListItem>

            <ListItem>
              What you expected to happen
            </ListItem>

            <ListItem>
              Your device and iOS version
            </ListItem>
          </List>
        </Section>


        <Section>
          <Heading>Contact us</Heading>

          <Text>
            For support, questions, or bug reports, contact us at{" "}
            <Link href="mailto:lorenz@lorenzfrank.com">
              lorenz@lorenzfrank.com
            </Link>
            .
          </Text>

          <Text>
            We will do our best to respond as soon as possible.
          </Text>
        </Section>


        <Footer>
          <div>
            © {new Date().getFullYear()} IUNONI
          </div>

          <div>
            <Link href="/terms">
              Terms of Use
            </Link>
            {" · "}
            <Link href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </Footer>

      </Container>
    </Page>
  );
}