package com.example.inventorymanagementsystem.Controller;

import com.example.inventorymanagementsystem.DTO.ProductUserResponse;
import com.example.inventorymanagementsystem.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductUserController {

    @Autowired
    private ProductService productService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping
    public List<ProductUserResponse> getAllActiveProducts() {
        return productService.getAllForUser();
    }

    @GetMapping("/{id}")
    public ProductUserResponse getProduct(@PathVariable Long id) {
        return productService.getByIdForUser(id);
    }

    @PostMapping("/{id}/stock-in")
    @ResponseStatus(HttpStatus.OK)
    public void stockIn(@PathVariable Long id,
                        @RequestParam Integer quantity) {
        productService.stockIn(id, quantity, getCurrentUsername());
    }

    @PostMapping("/{id}/stock-out")
    @ResponseStatus(HttpStatus.OK)
    public void stockOut(@PathVariable Long id,
                         @RequestParam Integer quantity) {
        productService.stockOut(id, quantity, getCurrentUsername());
    }
}
