package com.ventas.sales_app.repository;

import com.ventas.sales_app.model.Compra;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompraRepository extends MongoRepository<Compra, String> { }
