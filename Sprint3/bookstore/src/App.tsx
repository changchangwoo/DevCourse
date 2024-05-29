import "./App.css";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Detail from "./pages/Detail";
import Layout from "./components/common/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { ThemeName, dark, getTheme, light } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeProvicer, ThemeContext } from "./context/themeContext";

function App() {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <BookStoreThemeProvicer>
        <ThemeSwitcher/>
        <Layout>
          <Home />
        </Layout>
      </BookStoreThemeProvicer>
    </>
  );
}

export default App;
