import React, { useContext } from "react";
import "../css/Navbar.css";
import logo from "../Assets/medicalbook logo.jpg";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserShield,
  FaUser,
  FaTicketAlt,
} from "react-icons/fa"; // React icons import
import { motion } from "framer-motion"; // Import Framer Motion

const Navbar = () => {
  const { user } = useContext(AuthContext);
  // Get user context

  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg sticky-top py-0 navbar-custom shadow-sm">
      <div className="container-fluid px-5">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <span className="text-white fw-semibold font-monospace fs-3">
            HELAN HOMEOPATHY
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                  to="/"
                >
                  <FaHome className="me-2" style={{ color: "#00bcd4" }} />
                  Home
                </Link>
              </motion.div>
            </li>
            {!user ? (
              <>
                <li className="nav-item mx-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                      to="/register"
                    >
                      <FaUserPlus
                        className="me-2"
                        style={{ color: "#4caf50" }}
                      />
                      Register
                    </Link>
                  </motion.div>
                </li>
                <li className="nav-item mx-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                      to="/login"
                    >
                      <FaSignInAlt
                        className="me-2"
                        style={{ color: "#2196f3" }}
                      />
                      Login
                    </Link>
                  </motion.div>
                </li>
                <li className="nav-item mx-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                      to="/adminlogin"
                    >
                      <FaUserShield
                        className="me-2"
                        style={{ color: "#ff9800" }}
                      />
                      Admin Login
                    </Link>
                  </motion.div>
                </li>
              </>
            ) : (
              <>
                {user.role === "ROLE_ADMIN" ? (
                  <>
                    <li className="nav-item mx-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link
                          className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                          to="/logout"
                        >
                          <FaSignOutAlt
                            className="me-2"
                            style={{ color: "#f44336" }}
                          />
                          Logout
                        </Link>
                      </motion.div>
                    </li>
                  </>
                ) : user.role === "ROLE_CUSTOMER" ? (
                  <>
                    <li className="nav-item mx-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link
                          className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                          to="/customer/profile"
                        >
                          <FaUser
                            className="me-2"
                            style={{ color: "#4caf50" }}
                          />
                          profile
                        </Link>
                      </motion.div>
                    </li>

                    <li className="nav-item mx-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link
                          className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                          to="/customer/tickets"
                        >
                          <FaTicketAlt
                            className="me-2"
                            style={{ color: "blue" }}
                          />
                          Tickets
                        </Link>
                      </motion.div>
                    </li>

                    <li className="nav-item mx-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link
                          className="nav-link text-white fw-semibold fs-5 d-flex align-items-center"
                          to="/logout"
                        >
                          <FaSignOutAlt
                            className="me-2"
                            style={{ color: "#f44336" }}
                          />
                          Logout
                        </Link>
                      </motion.div>
                    </li>
                  </>
                ) : null}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
