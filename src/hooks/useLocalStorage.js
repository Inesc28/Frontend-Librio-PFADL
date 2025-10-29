/**
 * 🎯 CUSTOM HOOK: useLocalStorage  
 * 📍 UBICACIÓN: src/hooks/useLocalStorage.js
 * 
 * 🎉 BENEFICIOS QUE APORTA:
 * - Persiste datos entre sesiones del navegador
 * - Sincroniza automáticamente estado con localStorage
 * - Manejo de errores para navegadores que no soportan localStorage
 * - API simple similar a useState pero persistente
 * 
 * 💡 DÓNDE SE USARÁ:
 * - ✅ Carrito de compras (persistir items entre sesiones)
 * - ✅ Preferencias de usuario (tema, idioma, etc.)
 * - ✅ Estado de autenticación
 * - ✅ Filtros de búsqueda guardados
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejar localStorage de forma reactiva
 * @param {string} key - Clave para almacenar en localStorage
 * @param {*} initialValue - Valor inicial si no existe en localStorage
 * @returns {Array} - [value, setValue, removeValue]
 */
const useLocalStorage = (key, initialValue) => {
  
  /**
   * 🔧 FUNCIÓN: Lee valor desde localStorage
   * 📝 COMENTARIO: Maneja errores y parsing automático
   */
  const readFromStorage = useCallback(() => {
    try {
      // ✅ VERIFICACIÓN: Comprobar si localStorage está disponible
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      
      // ✅ PARSING: Si no existe, retornar valor inicial
      if (item === null) {
        return initialValue;
      }

      // ✅ PARSING: Intentar parsear JSON, si falla retornar string
      try {
        return JSON.parse(item);
      } catch {
        // Si no es JSON válido, retornar como string
        return item;
      }
    } catch (error) {
      // ✅ MANEJO DE ERRORES: localStorage no disponible o bloqueado
      console.warn(`Error leyendo localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // ====== ESTADO PRINCIPAL ======
  const [storedValue, setStoredValue] = useState(readFromStorage);

  /**
   * 🔧 FUNCIÓN: Actualiza valor en localStorage y estado
   * 📝 COMENTARIO: Optimizada con useCallback para evitar re-renders
   */
  const setValue = useCallback((value) => {
    try {
      // ✅ FLEXIBILIDAD: Permitir function updater como useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // ✅ ACTUALIZACIÓN: Actualizar estado local
      setStoredValue(valueToStore);

      // ✅ PERSISTENCIA: Guardar en localStorage
      if (typeof window !== 'undefined') {
        if (valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      // ✅ MANEJO DE ERRORES: localStorage lleno o bloqueado
      console.warn(`Error escribiendo localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  /**
   * 🔧 FUNCIÓN: Elimina valor de localStorage
   * 📝 COMENTARIO: Útil para logout o reset de preferencias
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removiendo localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  /**
   * 🔧 EFECTO: Sincronizar con cambios en localStorage desde otras tabs
   * 📝 COMENTARIO: Permite sincronización entre múltiples pestañas
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch {
          setStoredValue(e.newValue);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    // ✅ LISTENER: Escuchar cambios en localStorage
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key, initialValue]);

  /**
   * 🔧 EFECTO: Re-leer desde localStorage si la key cambia
   * 📝 COMENTARIO: Permite usar keys dinámicas
   */
  useEffect(() => {
    const currentValue = readFromStorage();
    if (JSON.stringify(currentValue) !== JSON.stringify(storedValue)) {
      setStoredValue(currentValue);
    }
  }, [key]); // Intencionalmente no incluimos readFromStorage y storedValue

  // 🎯 RETORNO: API similar a useState pero persistente
  return [
    storedValue,
    setValue,
    removeValue,
    
    // 🚀 FUNCIONES ADICIONALES ÚTILES
    {
      // ✅ UTILITY: Verificar si el valor existe en localStorage
      exists: () => {
        try {
          return typeof window !== 'undefined' && 
                 window.localStorage.getItem(key) !== null;
        } catch {
          return false;
        }
      },
      
      // ✅ UTILITY: Obtener el tamaño del valor en localStorage
      getSize: () => {
        try {
          if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            return item ? new Blob([item]).size : 0;
          }
          return 0;
        } catch {
          return 0;
        }
      },
      
      // ✅ UTILITY: Refrescar valor desde localStorage
      refresh: () => {
        const freshValue = readFromStorage();
        setStoredValue(freshValue);
        return freshValue;
      }
    }
  ];
};

export default useLocalStorage;