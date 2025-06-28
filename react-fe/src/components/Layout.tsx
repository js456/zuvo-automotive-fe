// src/components/Layout.tsx

import React from "react";
import Navbar from "./common/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
};

export default Layout;
