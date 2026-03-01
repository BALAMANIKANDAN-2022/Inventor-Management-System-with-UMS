package com.example.inventorymanagementsystem.Controller;

import com.example.inventorymanagementsystem.DTO.ProductUserResponse;
import com.example.inventorymanagementsystem.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductUserController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductUserResponse> getAllProducts() {
        return productService.getAllForUser();
    }

    @GetMapping("/{id}")
    public ProductUserResponse getProduct(@PathVariable Long id) {
        return productService.getByIdForUser(id);
    }
}
