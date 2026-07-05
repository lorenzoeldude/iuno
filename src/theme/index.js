// theme.js

const shared = {
    fonts: {
        body: "Cormorant Garamond, serif",
        heading: "Cormorant Garamond, serif",
        mono: "Montserrat sans-serif"
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
};

export const lightTheme = {
    ...shared,

    colors: {
        background: "#FFFFFF",
        surface: "#F8F9FA",
        card: "#FFFFFF",
        accent: "#B89B5E",

        text: "#000000",
        opposite: "#F9FAFB",
        textSecondary: "#3d3d3d98",

        primary: "#4F46E5",
        primaryHover: "#4338CA",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        highlight: "rgba(255, 255, 0, 0.7)",

        border: "#E5E7EB",
        divider: "#F3F4F6",

        overlay: "rgba(0,0,0,0.5)",
        shadow: "rgba(0,0,0,0.08)",
    },
};

export const darkTheme = {
    ...shared,

    colors: {
        background: "#121212",
        surface: "#1E1E1E",
        card: "#262626",
        accent: "#B89B5E",

        text: "#F9FAFB",
        opposite: "#1F2937",
        textSecondary: "#d8d8d88e",

        primary: "#6366F1",
        primaryHover: "#818CF8",

        // highlight: "rgba(255, 0, 0, 0.7)",
        highlight: "rgba(255, 255, 0, 0.2)",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        border: "#464646",
        divider: "#2A2A2A",

        overlay: "rgba(0,0,0,0.7)",
        shadow: "rgba(40, 40, 40, 0.4)",
    },
};