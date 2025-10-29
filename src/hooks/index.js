/**
 * 🎯 ARCHIVO DE EXPORTACIONES: hooks/index.js
 * 📍 UBICACIÓN: src/hooks/index.js
 * 
 * 💡 PROPÓSITO: Centralizar exportaciones de todos los custom hooks
 * 🎉 BENEFICIO: Importaciones más limpias y organizadas
 * 
 * 📖 USO:
 * import { useForm, useLocalStorage } from '../hooks';
 * 
 * En lugar de:
 * import useForm from '../hooks/useForm';
 * import useLocalStorage from '../hooks/useLocalStorage';
 */

export { default as useForm } from './useForm';
export { default as useLocalStorage } from './useLocalStorage';

// 🚀 FUTUROS HOOKS QUE SE PUEDEN AGREGAR:
// export { default as useDebounce } from './useDebounce';
// export { default as useApi } from './useApi';
// export { default as useAuth } from './useAuth';
// export { default as useTheme } from './useTheme';