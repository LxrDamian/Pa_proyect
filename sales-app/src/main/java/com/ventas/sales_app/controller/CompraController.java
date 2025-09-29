package com.ventas.sales_app.controller;


import com.ventas.sales_app.model.Compra;
import com.ventas.sales_app.model.Producto;
import com.ventas.sales_app.repository.CompraRepository;
import com.ventas.sales_app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/compras")
public class CompraController {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping
    public String comprar(@RequestBody Compra compra) {

        List<Producto> productosCompra = compra.getProductos();

        for (Producto p : productosCompra) {
            Optional<Producto> prodOpt = productoRepository.findById(p.getId());
            if (prodOpt.isEmpty()) return "Producto no encontrado: " + p.getNombre();
            if (prodOpt.get().getStock() < p.getCantidad()) {
                return "No hay suficiente stock de " + p.getNombre();
            }
        }

        for (Producto p : productosCompra) {
            Producto prod = productoRepository.findById(p.getId()).get();
            prod.setStock(prod.getStock() - p.getCantidad());
            productoRepository.save(prod);
        }

        compra.setFecha(LocalDateTime.now());
        compraRepository.save(compra);

        return "Compra realizada correctamente";
    }
}