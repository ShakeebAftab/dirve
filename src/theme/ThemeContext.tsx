import { createTheme, PaletteType } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createContext, Dispatch, FC, ReactNode, useState } from "react";
import { AuthContextProvider } from "src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "src/context/AppContext";
import { red } from "@material-ui/core/colors";

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
  const [isDark, setIsDark] = useState(true);

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

  const darkTheme = createTheme({
    palette: {
      type: "dark" as PaletteType,
      primary: {
        main: red[600],
      },
    },
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

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <BrowserRouter>
        <AuthContextProvider>
          <AppContextProvider>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
              {children}
            </ThemeProvider>
          </AppContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};
