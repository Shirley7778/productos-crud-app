package com.example.prueba.repository;

import com.example.prueba.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RepositoryRestResource(path = "Producto")

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

