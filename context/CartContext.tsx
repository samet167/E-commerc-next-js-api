"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// កំណត់ទម្រង់ទិន្នន័យ Item និង CartItem ឱ្យត្រូវតាម Backend
interface Item {
  id: number;
  name: string;  
  price: number;
  image: string; 
}

interface CartItem {
  id: number;
  item_id: number;
  quantity: number;
  item: Item;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  fetchCart: () => Promise<void>;
  addToCart: (itemId: number, quantity?: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // គណនាចំនួនមុខទំនិញសរុបក្នុងកន្ត្រក
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // មុខងារទាញយកទិន្នន័យកន្ត្រកទំនិញពី Backend
  const fetchCart = async () => {
    const token = localStorage.getItem("token"); // ទាញយក JWT Token ពី Login មកប្រើ
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // មុខងារហៅទៅ API ដើម្បីថែមទំនិញចូលកន្ត្រក
  const addToCart = async (itemId: number, quantity: number = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("សូមមេត្តាចូលគណនី (Login) ជាមុនសិន!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item_id: itemId, quantity }),
      });

      if (res.ok) {
        alert("បានបន្ថែមទៅក្នុងកន្ត្រកជោគជ័យ! 🛒");
        fetchCart(); // ទាញយកទិន្នន័យថ្មីឡើងវិញដើម្បីឱ្យ Navbar ប្តូរលេខតាម
      } else {
        const errorData = await res.json();
        alert(`មិនអាចថែមបានទេ: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};