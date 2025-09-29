package com.ventas.sales_app.repository;

import com.ventas.sales_app.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductoRepository extends MongoRepository<Producto, String> { }