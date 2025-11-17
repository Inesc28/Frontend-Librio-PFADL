import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem("cart");
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const getId = (item) => item.id || item.id_libros;

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const productId = getId(product);

      const existingItem = prevCart.find((item) => getId(item) === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          getId(item) === productId ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  }, []);

  const increaseQuantity = useCallback((idParaBuscar) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        getId(item) === idParaBuscar ? { ...item, count: item.count + 1 } : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((idParaBuscar) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          getId(item) === idParaBuscar
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  }, []);

  const calculateTotal = useCallback(() => {
    return cart.reduce((acc, item) => acc + (item.precio || 0) * item.count, 0);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const obtenerCantidadTotalCarrito = useCallback(() => {
    return cart.reduce((total, item) => total + item.count, 0);
  }, [cart]);

  const contextValue = {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    clearCart,
    obtenerCantidadTotalCarrito,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
