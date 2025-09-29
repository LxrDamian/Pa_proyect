import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Enviar JSON con los campos que espera el backend
      const payload = {
        nombre,
        correo,
        contraseña,
        rol: "USER" // rol por defecto
      };

      await api.post("/usuarios/registro", payload);

      setMsg("Usuario registrado. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      const mensaje = err.response?.data || "Error al registrar";
      setMsg(mensaje);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
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
        <button type="submit">Registrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}