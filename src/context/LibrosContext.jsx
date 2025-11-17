import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const LibrosContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const useLibros = () => {
  const context = useContext(LibrosContext);
  if (!context) {
    throw new Error("useLibros debe ser usado dentro de un LibrosProvider");
  }
  return context;
};

export const LibrosProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchLibros = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLibros([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/libros`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLibros(response.data);
      } catch (err) {
        console.error("Error al cargar libros:", err);
        setError("No se pudieron cargar los libros.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibros();
  }, [user]);

  const agregarLibro = useCallback(async (nuevoLibroData) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return { success: false, error: "No estás autenticado." };
      }

      const response = await axios.post(`${API_URL}/libros`, nuevoLibroData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const libroTemporal = { ...nuevoLibroData, id_libros: Date.now() };
      setLibros((prevLibros) => [...prevLibros, libroTemporal]);

      return { success: true };
    } catch (err) {
      console.error("❌ Error al publicar libro (Axios):", err);

      let mensajeError = "Error desconocido al publicar.";

      if (err.response && err.response.data) {

        mensajeError =
          err.response.data.error ||
          err.response.data.message ||
          JSON.stringify(err.response.data);
      } else {
        mensajeError = err.message;
      }

      return { success: false, error: mensajeError };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    libros,
    isLoading,
    error,
    agregarLibro,
  };

  return (
    <LibrosContext.Provider value={value}>{children}</LibrosContext.Provider>
  );
};
