import React, { useEffect, useState } from "react";
import api from "../api";

export default function ProductList({ user }) {
  const [productos, setProductos] = useState([]);
  const [msg, setMsg] = useState("");

  const loadProductos = async () => {
    try {
      const res = await api.get("/api/productos");
      setProductos(res.data);
    } catch (err) {
      setMsg("No se pudieron cargar productos");
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  // Comprar producto
  const comprar = async (p) => {
    if (!user) { setMsg("Debes iniciar sesión para comprar"); return; }
    const cantidad = parseInt(prompt("Cantidad", "1"));
    if (!cantidad || cantidad < 1) return;

    try {
      const payload = {
        correoUsuario: user.correo, // coincide con tu modelo Usuario
        productos: [{
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          cantidad
        }]
      };

      await api.post("/compras", payload);
      setMsg(`Compra realizada de ${cantidad} ${p.nombre}(s)`);
      loadProductos(); // actualizar stock
    } catch (err) {
      setMsg("Error: " + (err.response?.data || err.message));
    }
  };

  // Crear producto (admin)
  const adminCreate = async () => {
    if (!user || user.rol !== "ADMIN") { setMsg("Solo admin"); return; }

    const nombre = prompt("Nombre del producto");
    const precio = parseFloat(prompt("Precio", "0"));
    const stock = parseInt(prompt("Stock", "0"));
    const descripcion = prompt("Descripción", "");

    if (!nombre || isNaN(precio) || isNaN(stock)) return;

    try {
      await api.post("/api/productos", { nombre, precio, stock, descripcion });
      setMsg("Producto creado");
      loadProductos();
    } catch (err) {
      setMsg("Error creando producto: " + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      {user?.rol === "ADMIN" && <button onClick={adminCreate}>Crear producto (admin)</button>}
      {msg && <p>{msg}</p>}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        {productos.map(p => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, width: 220 }}>
            <h3>{p.nombre}</h3>
            <p>Precio: ${p.precio}</p>
            <p>Stock: {p.stock}</p>
            <p>{p.descripcion}</p>
            {user && <button onClick={() => comprar(p)}>Comprar</button>}
          </div>
        ))}
      </div>
    </div>
  );
}