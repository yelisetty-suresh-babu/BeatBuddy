import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  useEffect(() => {
    // Check for token in local storage or wherever you store it
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if no token
      // navigate("/login");
    }
  }, []); // No dependencies

  return (
    <div className="min-h-screen theme-dark bg-skin-fill">
      <Header />
      <main className=" ">
        <Outlet />
      </main>
    </div>
  );
}
