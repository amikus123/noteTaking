import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="m-4">{children}</main>
    </div>
  );
};

export default Layout;
