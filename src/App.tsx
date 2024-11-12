import { Routes, Route } from "react-router-dom";
import Header from "./ui/components/Header";
import Footer from "./ui/components/Footer";
import HomePage from "./ui/pages/HomePage";
import ProductListPage from "./ui/pages/ProductListPage";
import ProductDetailPage from "./ui/pages/ProductDetailPage";
import CartPage from "./ui/pages/CartPage";
import CheckoutPage from "./ui/pages/CheckoutPage";

import { Toaster } from "react-hot-toast";
import LoginPage from "./ui/pages/LoginPage";
import RegisterPage from "./ui/pages/RegisterPage";
import PrivateRoute from "./ui/components/PrivateRoute";
import UserProfilePage from "./ui/pages/UserProfilePage";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "toast-custom",
            duration: 3000,
            style: {
              borderRadius: "8px",
              padding: "16px",
              fontSize: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
