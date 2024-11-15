// ui/layouts/MainLayout.js
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="main-layout flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
