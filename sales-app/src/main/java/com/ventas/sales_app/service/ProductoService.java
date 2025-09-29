package com.ventas.sales_app.service;

import com.ventas.sales_app.model.Producto;
import com.ventas.sales_app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> listartodos() {
        return productoRepository.findAll();
    }

    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }

    public String actualizar(String id, Producto producto) {
        Optional<Producto> prodOpt = productoRepository.findById(id);
        if(prodOpt.isEmpty()) return "Producto no encontrado";

        Producto prod = prodOpt.get();
        prod.setNombre(producto.getNombre());
        prod.setPrecio(producto.getPrecio());
        prod.setStock(producto.getStock());
        prod.setDescripcion(producto.getDescripcion());

        productoRepository.save(prod);
        return "Producto actualizado";
    }



    }
