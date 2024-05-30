import React from "react";
import Header from "../header/Header";
import styled from "styled-components";
import Footer from "../common/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutStyle>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyle>
  );
};

const LayoutStyle = styled.main`
width: 100%;
margin: 0 auto;
max-width : ${({ theme }) => theme.layout.width.large};
padding: 20px 0;
`
export default Layout;
