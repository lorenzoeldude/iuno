import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        width: 100%;
        min-height: 100%;
    }

    body {
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        transition:
            background ${({ theme }) => theme.transition.normal},
            color ${({ theme }) => theme.transition.normal};
    }
`;

export default GlobalStyles;