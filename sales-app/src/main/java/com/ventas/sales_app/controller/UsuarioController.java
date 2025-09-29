package com.ventas.sales_app.controller;

import com.ventas.sales_app.model.Usuario;
import com.ventas.sales_app.repository.UsuarioRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registro")
    public String registrar(@Valid @RequestBody @NotNull Usuario usuario) {
        if(usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            return "Error: correo ya registrado";
        }
        usuarioRepository.save(usuario);
        return "Usuario registrado exitosamente";
    }

    @PostMapping("/login")
    public String login(@org.jetbrains.annotations.NotNull @RequestBody Usuario usuario) {
        Optional<Usuario> u = usuarioRepository.findByCorreo(usuario.getCorreo());
        if(u.isEmpty()) return "Error: usuario no encontrado";
        if(!u.get().getContraseña().equals(usuario.getContraseña()))
            return "Error: contraseña incorrecta";
        return "Login exitoso";
    }
}