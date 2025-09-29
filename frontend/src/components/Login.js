import React, { useState } from "react";
import api from "../api"; // tu instancia axios
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [correo, setCorreo] = useState("");        // cambia email -> correo
  const [contraseña, setContraseña] = useState(""); // cambia contrasena -> contraseña
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos como JSON en el body
      const res = await api.post("/usuarios/login", {
        correo,
        contraseña,
      });

      // Respuesta del backend (puede ser string)
      const user = { correo }; // puedes guardar más info si el backend devuelve
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setMsg("Login exitoso");
      navigate("/"); // redirige al home
    } catch (err) {
      const mensaje = err.response?.data || "Error en login";
      setMsg(mensaje);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}