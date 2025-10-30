/**
 * Contexto de Libros - Gestión global del estado de libros
 * 
 * Este contexto simula una conexión con API/base de datos y proporciona
 * un estado global para manejar la lista de libros publicados en la plataforma.
 * Permite compartir datos entre componentes sin prop drilling.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

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
 */
export const LibrosProvider = ({ children }) => {
  // Estado para almacenar la lista de libros
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ====== 🚀 CARRITO CON PERSISTENCIA EN LOCALSTORAGE ======
  // 📍 UBICACIÓN: LibrosContext - Carrito persistente
  // 💡 BENEFICIO: El carrito se mantiene entre sesiones del navegador
  // 🎯 USO: Los usuarios no pierden sus items al cerrar el navegador
  const [carrito, setCarrito, limpiarCarritoStorage] = useLocalStorage('librio-carrito', []);
  
  // ====== 🚀 PREFERENCIAS DE USUARIO CON PERSISTENCIA ======
  // 📍 UBICACIÓN: LibrosContext - Preferencias persistentes
  // 💡 BENEFICIO: Recordar configuraciones del usuario
  const [preferenciasUsuario, setPreferenciasUsuario] = useLocalStorage('librio-preferencias', {
    tema: 'oscuro',
    moneda: 'COP',
    idioma: 'es',
    notificaciones: true,
    ordenGaleria: 'recientes' // recientes, precio-asc, precio-desc, alfabetico
  });

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

  // ====== FUNCIONES DEL CARRITO ======

  /**
   * Agregar un libro al carrito
   * @param {Object} libro - El libro a agregar
   * @param {number} cantidad - Cantidad a agregar (por defecto 1)
   */
  const agregarAlCarrito = useCallback((libro, cantidad = 1) => {
    setCarrito(carritoActual => {
      // Verificar si el libro ya está en el carrito
      const itemExistente = carritoActual.find(item => item.libro.id === libro.id);
      
      if (itemExistente) {
        // Si existe, actualizar la cantidad
        return carritoActual.map(item =>
          item.libro.id === libro.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, agregarlo
        return [...carritoActual, { libro, cantidad }];
      }
    });
  }, []);

  /**
   * Eliminar un libro del carrito
   * @param {string} libroId - ID del libro a eliminar
   */
  const eliminarDelCarrito = useCallback((libroId) => {
    setCarrito(carritoActual => 
      carritoActual.filter(item => item.libro.id !== libroId)
    );
  }, []);

  /**
   * Actualizar la cantidad de un libro en el carrito
   * @param {string} libroId - ID del libro
   * @param {number} nuevaCantidad - Nueva cantidad
   */
  const actualizarCantidadCarrito = useCallback((libroId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(libroId);
      return;
    }
    
    setCarrito(carritoActual =>
      carritoActual.map(item =>
        item.libro.id === libroId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  }, [eliminarDelCarrito]);

  /**
   * Obtener el total del carrito
   * @returns {number} Total del carrito
   */
  const obtenerTotalCarrito = useCallback(() => {
    return carrito.reduce((total, item) => {
      return total + (item.libro.precio * item.cantidad);
    }, 0);
  }, [carrito]);

  /**
   * Obtener la cantidad total de items en el carrito
   * @returns {number} Cantidad total de items
   */
  const obtenerCantidadTotalCarrito = useCallback(() => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }, [carrito]);

  /**
   * Limpiar todo el carrito
   */
  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
  }, [setCarrito]);

  // ====== 🚀 FUNCIONES DE PREFERENCIAS DE USUARIO ======
  // 📍 UBICACIÓN: LibrosContext - Gestión de preferencias persistentes
  // 💡 BENEFICIO: Recordar configuraciones entre sesiones

  /**
   * Actualizar una preferencia específica del usuario
   * @param {string} clave - Clave de la preferencia (tema, moneda, etc.)
   * @param {*} valor - Nuevo valor para la preferencia
   */
  const actualizarPreferencia = useCallback((clave, valor) => {
    setPreferenciasUsuario(prevPreferencias => ({
      ...prevPreferencias,
      [clave]: valor
    }));
  }, [setPreferenciasUsuario]);

  /**
   * Resetear preferencias a valores por defecto
   */
  const resetearPreferencias = useCallback(() => {
    setPreferenciasUsuario({
      tema: 'oscuro',
      moneda: 'COP',
      idioma: 'es',
      notificaciones: true,
      ordenGaleria: 'recientes'
    });
  }, [setPreferenciasUsuario]);

  /**
   * 🚀 FUNCIÓN MEJORADA: Limpiar todo el almacenamiento local
   * 📝 COMENTARIO: Para logout completo o reset de la aplicación
   */
  const limpiarTodoElAlmacenamiento = useCallback(() => {
    limpiarCarritoStorage();
    resetearPreferencias();
    // También podrías limpiar otros datos como historial de búsqueda, etc.
  }, [limpiarCarritoStorage, resetearPreferencias]);

  // Valor del contexto con todos los datos y funciones
  const contextValue = {
    // ====== ESTADO ======
    libros,
    isLoading,
    error,
    carrito, // 🚀 Ahora persistente con localStorage
    preferenciasUsuario, // 🚀 NUEVO: Preferencias persistentes
    
    // ====== FUNCIONES CRUD DE LIBROS ======
    agregarLibro,
    obtenerLibros,
    actualizarLibro,
    eliminarLibro,
    obtenerLibroPorId,
    
    // ====== FUNCIONES DEL CARRITO PERSISTENTE ======
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidadCarrito,
    obtenerTotalCarrito,
    obtenerCantidadTotalCarrito,
    limpiarCarrito, // 🚀 Ahora también limpia localStorage
    
    // ====== 🚀 NUEVAS FUNCIONES DE PREFERENCIAS ======
    actualizarPreferencia,
    resetearPreferencias,
    limpiarTodoElAlmacenamiento,
    
    // ====== UTILIDADES ======
    limpiarError
  };

  return (
    <LibrosContext.Provider value={contextValue}>
      {children}
    </LibrosContext.Provider>
  );
};

export default LibrosContext;