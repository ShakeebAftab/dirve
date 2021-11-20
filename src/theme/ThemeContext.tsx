import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createContext, Dispatch, FC, ReactNode, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: Dispatch<boolean>;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

interface Props {
  children: ReactNode;
}

export const ThemeContextProvider: FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = createTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            display: "none",
          },
        },
      },
    },
  });

  const darkTheme = createTheme();

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
