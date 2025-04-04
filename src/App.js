// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsAndServices from "./Components/TermsAndServices";
import ReturnPolicy from "./Components/ReturnPolicy";
import ShoppingPolicy from "./Components/ShoppingPolicy";
import Afterlogin from "./Components/AfterLogin";
import Cart from "./Components/cart";
import Admin from "./Components/admin/Admin";
import AdminLogin from "./Components/AdminLogin";
import ViewContent from "./Components/ViewContent";
import logo from "./Assets/homeo.jpg";
import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Customer from "./Components/customer/pages/Customer";
import { AuthProvider } from "./context/AuthContext";
import Logout from "./Components/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route path="/customer/*" element={<Customer />} />{" "}
          {/* Customer Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsAndServices" element={<TermsAndServices />} />
          <Route path="/Returnpolicy" element={<ReturnPolicy />} />
          <Route path="/ViewContent" element={<ViewContent />} />
          <Route path="/ShoppingPolicy" element={<ShoppingPolicy />} />
          <Route
            path="/Afterlogin"
            element={
              <Afterlogin
                logo={logo}
                title="The essentials of materia medica"
                author="Shiva Kumar Reddy Methuku"
                price="539₹"
                view="view"
              />
            }
          />
          <Route
            path="/Cart"
            element={
              <Cart
                img={logo}
                title="Cart"
                title2="The essentials of materia medica"
                author="Shiva Kumar Reddy Methuku"
                price="539₹"
                isbn="9789334035162"
                quantity={<input type="number" name="quantity" value={1} />}
                remove="remove"
              />
            }
          />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
