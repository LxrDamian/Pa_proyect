import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [msg, setMsg] = useState("");

  // Cargar productos
  const loadProductos = async () => {
    try {
      const res = await api.get("/api/productos"); // endpoint según tu backend
      setProductos(res.data);
    } catch (err) {
      setMsg("Error cargando productos: " + (err.response?.data || err.message));
    }
  };

  useEffect(() => { loadProductos(); }, []);

  // Actualizar stock
  const updateStock = async (id) => {
    const nuevoStock = parseInt(prompt("Nuevo stock", "0"));
    if (isNaN(nuevoStock) || nuevoStock < 0) return;

    try {
      // Encontrar producto
      const prod = productos.find(p => p.id === id);
      if (!prod) return;

      // Enviar todo el producto actualizado
      const payload = {
        ...prod,
        stock: nuevoStock
      };

      await api.put(`/api/productos/${id}`, payload, { headers: { "X-User-Role": "ADMIN" } });

      setMsg(`Stock actualizado para ${prod.nombre}`);
      loadProductos(); // recargar lista
    } catch (err) {
      setMsg("Error actualizando stock: " + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <h2>Panel Admin</h2>
      {msg && <p>{msg}</p>}
      {productos.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        productos.map(p => (
          <div key={p.id}>
            {p.nombre} - Stock: {p.stock}{" "}
            <button onClick={() => updateStock(p.id)}>Actualizar stock</button>
          </div>
        ))
      )}
    </div>
  );
}
