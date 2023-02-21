import React, { useEffect, useState } from 'react'
import ThemeContext from './ThemeContext';


const ThemeState = (props) => {
    const localTheme = localStorage.getItem("theme")
    const [theme, setTheme] = useState(localTheme);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    function handleThemeSwitch(themeValue) {
        setTheme(`${themeValue}`);
    }
    return (
        <ThemeContext.Provider value={{ handleThemeSwitch }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState;