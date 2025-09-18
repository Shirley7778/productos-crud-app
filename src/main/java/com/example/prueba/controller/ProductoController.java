//package com.example.prueba.controller;
//
//import com.example.prueba.model.Producto;
//import com.example.prueba.repository.ProductoRepository;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/productos")
//@CrossOrigin(origins = "http://127.0.0.1:5500")
//public class ProductoController {
//    private final ProductoRepository productoRepository;
//
//    public ProductoController(ProductoRepository productoRepository) {
//        this.productoRepository = productoRepository;
//    }
//
//    @GetMapping
//    public List<Producto> getAll() {
//        return productoRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public Producto getById(@PathVariable Long id) {
//        return productoRepository.findById(id).orElse(null);
//    }
//
//    @PostMapping
//    public Producto create(@RequestBody Producto producto) {
//        return productoRepository.save(producto);
//    }
//
//    @PutMapping("/{id}")
//    public Producto update(@PathVariable Long id, @RequestBody Producto producto) {
//        producto.setId(id);
//        return productoRepository.save(producto);
//    }
//
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable Long id) {
//        productoRepository.deleteById(id);
//    }
//}