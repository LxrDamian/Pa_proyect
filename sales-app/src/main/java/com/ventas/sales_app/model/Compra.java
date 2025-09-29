package com.ventas.sales_app.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "compras")
public class Compra {

    @Id
    private String id;

    private String correoUsuario;

    private List<Producto> productos;

    private double total;
    private LocalDateTime fecha;

    public Compra() {}

    public Compra(String correoUsuario, List<Producto> productos, double total, LocalDateTime fecha) {
        this.correoUsuario = correoUsuario;
        this.productos = productos;
        this.total = total;
        this.fecha = fecha;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCorreoUsuario() { return correoUsuario; }
    public void setCorreoUsuario(String correoUsuario) { this.correoUsuario = correoUsuario; }

    public List<Producto> getProductos() { return productos; }
    public void setProductos(List<Producto> productos) { this.productos = productos; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}