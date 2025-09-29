package com.ventas.sales_app.service;

import com.ventas.sales_app.model.Usuario;
import com.ventas.sales_app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public String registrarUsuario(Usuario usuario) {
        if(usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            return "Error: correo ya registrado";
        }
        usuarioRepository.save(usuario);
        return "Usuario registrado exitosamente";
    }

    public String loginUsuario(String correo, String contraseña) {
        Optional<Usuario> u = usuarioRepository.findByCorreo(correo);
        if(u.isEmpty()) return "Error: usuario no encontrado";
        if(!u.get().getContraseña().equals(contraseña))
            return "Error: contraseña incorrecta";
        return "Login exitoso";
    }

    public Optional<Usuario> buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }
}