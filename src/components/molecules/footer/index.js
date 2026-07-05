import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.footer`
    width: 100%;
    padding: 20px 0;

    display: flex;
    justify-content: center;

    font-size: 10px;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Inner = styled.div`
    width: 100%;
    max-width: 1200px;

    display: flex;
    justify-content: center;
    gap: 10px;
`;

const FooterLink = styled(Link)`
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

function Footer() {
    return (
        <Wrapper>
            <Inner>
                <span>© 2026 IUNONI</span>
                <span>|</span>

                <FooterLink to="/legalnotice">
                    Legal Notice
                </FooterLink>

                <span>|</span>

                <FooterLink to="/privacy">
                    Privacy Policy
                </FooterLink>
            </Inner>
        </Wrapper>
    );
}

export default Footer;