import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "../../theme";
import GlobalStyles from "../../theme/Globalstyles";

const ThemeContext = createContext();


export function AppThemeProvider({ children }) {

    const getInitialTheme = () => {
        return localStorage.getItem("theme") || "system";
    };


    const [theme, setTheme] = useState(getInitialTheme);


    const [systemTheme, setSystemTheme] = useState(() => {
        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";
    });


    // Listen for browser/system theme changes
    useEffect(() => {

        const mediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


        const handleChange = (event) => {
            setSystemTheme(
                event.matches ? "dark" : "light"
            );
        };


        mediaQuery.addEventListener(
            "change",
            handleChange
        );


        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleChange
            );
        };

    }, []);



    useEffect(() => {
        localStorage.setItem(
            "theme",
            theme
        );
    }, [theme]);



    const resolvedTheme =
        theme === "system"
            ? systemTheme
            : theme;



    return (
        <ThemeContext.Provider
            value={{
                theme,
                resolvedTheme,
                isDarkMode: resolvedTheme === "dark",
                setTheme,
            }}
        >

            <StyledThemeProvider
                theme={
                    resolvedTheme === "dark"
                        ? darkTheme
                        : lightTheme
                }
            >

                <GlobalStyles />

                {children}

            </StyledThemeProvider>

        </ThemeContext.Provider>
    );
}



export function useTheme() {

    const context = useContext(ThemeContext);


    if (!context) {
        throw new Error(
            "useTheme must be used within an AppThemeProvider"
        );
    }


    return context;
}