// theme.js

import { createGlobalStyle } from "styled-components";

const shared = {
    fonts: {
        body: "Cormorant Garamond, serif",
        // body: "EB Garamond, serif",
        // body: "Source Serif 4, serif",
        heading: "Cormorant Garamond, serif",
        read: "Cormorant Garamond, serif",
        // mono: "Montserrat, sans-serif"
        mono: "DM Sans, sans-serif"
        // mono: "Geist, sans-serif"
        // mono: "Proza Libre, sans-serif"
        // mono: "Lato, sans-serif"
        // mono: "Inter, sans-serif"
        // mono: "Cormorant Garamond, serif"
    },

    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        xxl: "24px",
        xxxl: "32px",
    },

    fontWeights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
    },

    borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        pill: "9999px",
    },

    breakpoints: {
        mobile: "768px",
        tablet: "1024px",
        desktop: "1280px",
        wide: "1536px",
    },

    transition: {
        fast: "0.15s ease",
        normal: "0.25s ease",
        slow: "0.4s ease",
    },

    colors: {
        // deep library green (#247851); terracotta (#c05536); deep purple (#613072)

        brand: "#613072",
        accent: "#613072",

        success: "#4F8A5B",
        warning: "#B8792E",
        danger: "#B33A3A",
    },
};

export const lightTheme = {
    ...shared,

    mode: "light",

    colors: {
        ...shared.colors,

        background: "#FFFFFF",
        surface: "#F8F9FA",
        card: "#EEEEEE",

        text: "#000000",
        opposite: "#F9FAFB",
        textSecondary: "#3D3D3D98",

        border: "#E5E7EB",
        divider: "#F3F4F6",

        overlay: "rgba(0, 0, 0, 0.5)",
        shadow: "rgba(0, 0, 0, 0.08)",
    },
};

export const darkTheme = {
    ...shared,

    mode: "dark",

    colors: {
        ...shared.colors,

        background: "#0E0E0E",
        surface: "#1E1E1E",
        card: "#262626",

        text: "#F9FAFB",
        opposite: "#1F2937",
        textSecondary: "#D8D8D88E",

        border: "#464646",
        divider: "#2A2A2A",

        overlay: "rgba(0, 0, 0, 0.7)",
        shadow: "rgba(40, 40, 40, 0.4)",
    },
};

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