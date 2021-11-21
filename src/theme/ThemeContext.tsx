import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createContext, Dispatch, FC, ReactNode, useState } from "react";
import { AuthContextProvider } from "src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

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
      <AuthContextProvider>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </AuthContextProvider>
    </ThemeContext.Provider>
  );
};
