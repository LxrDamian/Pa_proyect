package com.ventas.sales_app.config;


import com.ventas.sales_app.model.Usuario;
import com.ventas.sales_app.model.Producto;
import com.ventas.sales_app.repository.UsuarioRepository;
import com.ventas.sales_app.repository.ProductoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataLoader {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductoRepository productoRepository;

    @PostConstruct
    public void init() {

        if(usuarioRepository.findByCorreo("admin@prueba.com").isEmpty()) {
            usuarioRepository.save(new Usuario("Admin Test", "admin@prueba.com", "123456", "ADMIN"));
        }

        if(productoRepository.count() == 0) {
            productoRepository.saveAll(List.of(
                    new Producto("Celular A",1200,10,"Celular gama media"),
                    new Producto("Celular B",1500,8,"Celular gama alta"),
                    new Producto("Celular C",800,15,"Celular económico"),
                    new Producto("Auriculares X",200,25,"Auriculares inalámbricos"),
                    new Producto("Cargador Rápido",50,50,"Cargador USB-C"),
                    new Producto("Protector de Pantalla",30,40,"Vidrio templado"),
                    new Producto("Funda de Celular",25,60,"Funda silicona"),
                    new Producto("Memoria SD 64GB",80,20,"Memoria externa"),
                    new Producto("Power Bank 10000mAh",120,30,"Batería portátil"),
                    new Producto("Smartwatch Y",350,12,"Reloj inteligente")
            ));
        }
    }
}
