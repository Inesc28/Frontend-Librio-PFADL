
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(decodedToken);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      } catch (error) {
        console.error("Token inválido o expirado al cargar:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken.userId;

      if (!userId) {
        console.error("El token no contiene 'id' o 'userId'.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setIsAuthenticated(true);
      setUser(decodedToken);
      navigate("/mi-perfil");
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
