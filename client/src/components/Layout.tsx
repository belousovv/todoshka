import React from "react";
import AppRoutes from "./AppRoutes";
import Board from "./Board";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <div className="container">
        <div className="wrapper">
          <Header />
          <Board>
            <AppRoutes />
          </Board>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
