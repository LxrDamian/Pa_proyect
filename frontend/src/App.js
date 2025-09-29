import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import api from "./api";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  // Refrescar datos completos del usuario al cargar
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.correo) {
        try {
          const res = await api.get(`/usuarios/${user.correo}`);
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.log("No se pudo actualizar usuario:", err);
        }
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Productos</Link> |{" "}
        {user ? (
          <>
            <span>Bienvenido {user.nombre}</span> | <Link to="/cart">Carrito</Link>{" "}
            {user.rol === "ADMIN" && <>| <Link to="/admin">Admin</Link></>} |{" "}
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<ProductList user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/cart" element={user ? <Cart user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.rol === "ADMIN" ? <AdminPanel /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;