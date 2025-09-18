package com.example.prueba.repository;

import com.example.prueba.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "Producto")
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

