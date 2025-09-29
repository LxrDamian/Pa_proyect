import React, { useState } from "react";
import api from "../api";

export default function Cart({ user }) {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  const comprar = async () => {
    if (!user) {
      setMsg("Inicia sesión primero");
      return;
    }

    if (items.length === 0) {
      setMsg("No hay productos en el carrito");
      return;
    }

    try {
      // Construir payload según lo que espera el backend
      const payload = {
        correoUsuario: user.correo, // coincide con tu modelo Usuario
        productos: items.map((i) => ({
          id: i.id,         // id del producto
          nombre: i.nombre, // nombre del producto
          precio: i.precio, // precio del producto
          cantidad: i.cantidad
        }))
      };

      const res = await api.post("/compras", payload);

      setMsg("Compra realizada correctamente");
      setItems([]); // vaciar carrito
    } catch (err) {
      const errorMsg = err.response?.data || err.message;
      setMsg("Error en la compra: " + errorMsg);
    }
  };

  return (
    <div>
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        items.map((it, i) => (
          <div key={i}>
            {it.nombre} x {it.cantidad} - ${it.precio * it.cantidad}
          </div>
        ))
      )}
      <button onClick={comprar} disabled={items.length === 0}>
        Comprar
      </button>
      {msg && <p>{msg}</p>}
    </div>
  );
}