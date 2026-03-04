package com.example.inventorymanagementsystem.Service;

import com.example.inventorymanagementsystem.DTO.ProductAdminResponse;
import com.example.inventorymanagementsystem.DTO.ProductCreateRequest;
import com.example.inventorymanagementsystem.DTO.ProductUpdateRequest;
import com.example.inventorymanagementsystem.DTO.ProductUserResponse;

import java.util.List;

public interface ProductService {
    ProductAdminResponse create(ProductCreateRequest request, String username);

    ProductAdminResponse update(Long id, ProductUpdateRequest request, String username);

    void delete(Long id, String username);

    ProductAdminResponse getByIdForAdmin(Long id);

    ProductUserResponse getByIdForUser(Long id);

    List<ProductUserResponse> getAllForUser();

    List<ProductAdminResponse> getAllForAdmin();

    void stockIn(Long productId, Integer quantity, String username);

    void stockOut(Long productId, Integer quantity, String username);

    void adjustStock(Long productId, Integer newQuantity, String username);
}
