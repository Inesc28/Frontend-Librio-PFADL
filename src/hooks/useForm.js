/**
 * 🎯 CUSTOM HOOK: useForm
 * 📍 UBICACIÓN: src/hooks/useForm.js
 * 
 * 🎉 BENEFICIOS QUE APORTA:
 * - Simplifica la gestión de formularios complejos
 * - Manejo centralizado de validaciones
 * - Reutilizable en múltiples componentes (Publicar, RegistroUsuario, IniciarSesion)
 * - Reduce código duplicado significativamente
 * - Separación de lógica de presentación
 * 
 * 💡 DÓNDE SE USARÁ:
 * - ✅ Componente Publicar (formulario de libro)
 * - ✅ Componente RegistroUsuario (formulario de registro)
 * - ✅ Componente IniciarSesion (formulario de login)
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * Hook personalizado para manejar formularios con validación
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Object} validationRules - Reglas de validación por campo
 * @param {Function} onSubmit - Función que se ejecuta al enviar el formulario
 * @returns {Object} - Objeto con estados y funciones del formulario
 */
const useForm = (initialValues = {}, validationRules = {}, onSubmit) => {
  
  // ====== ESTADOS DEL FORMULARIO ======
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 🔧 FUNCIÓN: Maneja cambios en los inputs
   * 📝 COMENTARIO: Optimizada con useCallback para evitar re-renders
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // ✅ MEJORA: Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  /**
   * 🔧 FUNCIÓN: Maneja cuando el usuario sale de un campo (blur)
   * 📝 COMENTARIO: Marca el campo como "touched" para mostrar errores
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // ✅ MEJORA: Validar campo individual al salir del input
    validateField(name, values[name]);
  }, [values]);

  /**
   * 🔧 FUNCIÓN: Valida un campo específico
   * 📝 COMENTARIO: Validación en tiempo real por campo
   */
  const validateField = useCallback((fieldName, fieldValue) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    let error = '';

    // ✅ VALIDACIÓN: Campo requerido
    if (rules.required && (!fieldValue || fieldValue.toString().trim() === '')) {
      error = rules.required;
    }
    // ✅ VALIDACIÓN: Longitud mínima
    else if (rules.minLength && fieldValue.toString().length < rules.minLength) {
      error = rules.minLengthMessage || `Mínimo ${rules.minLength} caracteres`;
    }
    // ✅ VALIDACIÓN: Email válido
    else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
      error = rules.emailMessage || 'Email no válido';
    }
    // ✅ VALIDACIÓN: Número positivo
    else if (rules.positive && (isNaN(fieldValue) || parseFloat(fieldValue) <= 0)) {
      error = rules.positiveMessage || 'Debe ser un número positivo';
    }
    // ✅ VALIDACIÓN: Función personalizada
    else if (rules.custom && typeof rules.custom === 'function') {
      error = rules.custom(fieldValue) || '';
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error;
  }, [validationRules]);

  /**
   * 🔧 FUNCIÓN: Valida todo el formulario
   * 📝 COMENTARIO: useMemo para optimizar cálculos de validación
   */
  const validateForm = useMemo(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    return { isValid, errors: newErrors };
  }, [values, validationRules, validateField]);

  /**
   * 🔧 FUNCIÓN: Maneja el envío del formulario
   * 📝 COMENTARIO: Previene múltiples envíos y valida antes de enviar
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Marcar todos los campos como touched para mostrar errores
    const allTouched = {};
    Object.keys(values).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const { isValid, errors: formErrors } = validateForm;
    setErrors(formErrors);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ MEJORA: Ejecutar función de envío personalizada
      if (onSubmit) {
        await onSubmit(values);
      }
    } catch (error) {
      console.error('Error en envío del formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  /**
   * 🔧 FUNCIÓN: Resetea el formulario a valores iniciales
   * 📝 COMENTARIO: Útil después de envíos exitosos
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * 🔧 FUNCIÓN: Actualiza valores programáticamente
   * 📝 COMENTARIO: Para casos donde necesites setear valores desde el componente
   */
  const setFieldValue = useCallback((fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  // ✅ COMPUTED: Verifica si el formulario tiene errores
  const hasErrors = useMemo(() => {
    return Object.values(errors).some(error => error !== '');
  }, [errors]);

  // ✅ COMPUTED: Verifica si el formulario está limpio (sin cambios)
  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  // 🎯 RETORNO: Todas las funciones y estados necesarios para el formulario
  return {
    // 📊 ESTADOS
    values,
    errors,
    touched,
    isSubmitting,
    hasErrors,
    isDirty,

    // 🔧 FUNCIONES
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    validateField,

    // 📈 HELPERS
    isValid: validateForm.isValid,
    
    // 🎯 UTILITY FUNCTIONS: Para casos específicos
    getFieldProps: (fieldName) => ({
      name: fieldName,
      value: values[fieldName] || '',
      onChange: handleChange,
      onBlur: handleBlur
    })
  };
};

export default useForm;