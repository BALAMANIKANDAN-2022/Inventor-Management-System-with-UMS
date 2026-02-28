package com.example.inventorymanagementsystem.Controller;

import com.example.inventorymanagementsystem.DTO.ProductAdminResponse;
import com.example.inventorymanagementsystem.DTO.ProductCreateRequest;
import com.example.inventorymanagementsystem.DTO.ProductUpdateRequest;
import com.example.inventorymanagementsystem.Service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class ProductAdminController {

    @Autowired
    private ProductService productService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductAdminResponse createProduct(@Valid @RequestBody ProductCreateRequest request) {
        return productService.create(request, getCurrentUsername());
    }

    @PutMapping("/{id}")
    public ProductAdminResponse updateProduct(@PathVariable Long id,
                                              @Valid @RequestBody ProductUpdateRequest request) {
        return productService.update(id, request, getCurrentUsername());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id, getCurrentUsername());
    }

    @GetMapping("/{id}")
    public ProductAdminResponse getProduct(@PathVariable Long id) {
        return productService.getByIdForAdmin(id);
    }

    @GetMapping
    public List<ProductAdminResponse> getAllProducts() {
        return productService.getAllForAdmin();
    }

    // -------- STOCK OPERATIONS --------

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

    @PostMapping("/{id}/adjust")
    @ResponseStatus(HttpStatus.OK)
    public void adjustStock(@PathVariable Long id,
                            @RequestParam Integer newQuantity) {
        productService.adjustStock(id, newQuantity, getCurrentUsername());
    }

}
