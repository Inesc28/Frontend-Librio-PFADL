/**
 * Contexto de Libros - Gestión global del estado de libros
 * 
 * Este contexto simula una conexión con API/base de datos y proporciona
 * un estado global para manejar la lista de libros publicados en la plataforma.
 * Permite compartir datos entre componentes sin prop drilling.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Contexto de libros
 */
const LibrosContext = createContext();

/**
 * Hook personalizado para usar el contexto de libros
 * @returns {Object} Objeto con libros y funciones para manejarlos
 */
export const useLibros = () => {
  const context = useContext(LibrosContext);
  if (!context) {
    throw new Error('useLibros debe ser usado dentro de un LibrosProvider');
  }
  return context;
};

/**
 * Proveedor del contexto de libros
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Proveedor del contexto
 */
export const LibrosProvider = ({ children }) => {
  // Estado para almacenar la lista de libros
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Simula una llamada a la API para agregar un nuevo libro
   * @param {Object} nuevoLibro - Datos del libro a agregar
   * @returns {Promise<Object>} Resultado de la operación
   */
  const agregarLibro = useCallback(async (nuevoLibro) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // ====== SIMULACIÓN DE LLAMADA A LA API ======
      // Simular delay de red (300ms)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Crear libro con ID único y metadata adicional
      const libroConMetadata = {
        ...nuevoLibro,
        id: Date.now().toString(), // ID único basado en timestamp
        fechaPublicacion: new Date().toISOString(),
        estado: 'disponible',
        vendedor: 'Usuario Actual', // En una app real vendría del contexto de auth
        vistas: 0,
        favoritos: 0
      };
      
      // ====== SIMULACIÓN DE RESPUESTA EXITOSA DE LA API ======
      // En una app real esto sería: const response = await fetch('/api/libros', {...})
      
      // Agregar al estado local (simula la base de datos)
      setLibros(prevLibros => [libroConMetadata, ...prevLibros]);
      
      return { 
        success: true, 
        libro: libroConMetadata,
        message: 'Libro publicado exitosamente'
      };
      
    } catch (error) {
      console.error('Error al agregar libro:', error);
      setError('Error al conectar con la base de datos');
      
      return { 
        success: false, 
        error: error.message,
        message: 'Error al publicar el libro'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Simula una llamada a la API para obtener todos los libros
   * @returns {Promise<Object>} Lista de libros
   */
  const obtenerLibros = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // ====== SIMULACIÓN DE LLAMADA A LA API ======
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // En una app real: const response = await fetch('/api/libros')
      // const librosFromAPI = await response.json()
      
      return { 
        success: true, 
        libros: libros,
        message: 'Libros cargados exitosamente'
      };
      
    } catch (error) {
      console.error('Error al obtener libros:', error);
      setError('Error al cargar los libros');
      
      return { 
        success: false, 
        error: error.message,
        libros: []
      };
    } finally {
      setIsLoading(false);
    }
  }, [libros]);

  /**
   * Simula actualización de un libro en la API
   * @param {string} id - ID del libro a actualizar
   * @param {Object} datosActualizados - Nuevos datos del libro
   */
  const actualizarLibro = useCallback(async (id, datosActualizados) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setLibros(prevLibros =>
        prevLibros.map(libro =>
          libro.id === id
            ? { 
                ...libro, 
                ...datosActualizados, 
                fechaActualizacion: new Date().toISOString() 
              }
            : libro
        )
      );
      
      return { 
        success: true,
        message: 'Libro actualizado exitosamente'
      };
      
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      setError('Error al actualizar el libro');
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Simula eliminación de un libro en la API
   * @param {string} id - ID del libro a eliminar
   */
  const eliminarLibro = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setLibros(prevLibros => prevLibros.filter(libro => libro.id !== id));
      
      return { 
        success: true,
        message: 'Libro eliminado exitosamente'
      };
      
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      setError('Error al eliminar el libro');
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtener un libro específico por ID
   * @param {string} id - ID del libro
   * @returns {Object|null} Libro encontrado o null
   */
  const obtenerLibroPorId = useCallback((id) => {
    return libros.find(libro => libro.id === id) || null;
  }, [libros]);

  /**
   * Limpiar el estado de error
   */
  const limpiarError = useCallback(() => {
    setError(null);
  }, []);

  // Valor del contexto con todos los datos y funciones
  const contextValue = {
    // Estado
    libros,
    isLoading,
    error,
    
    // Funciones CRUD
    agregarLibro,
    obtenerLibros,
    actualizarLibro,
    eliminarLibro,
    obtenerLibroPorId,
    
    // Utilidades
    limpiarError
  };

  return (
    <LibrosContext.Provider value={contextValue}>
      {children}
    </LibrosContext.Provider>
  );
};

export default LibrosContext;