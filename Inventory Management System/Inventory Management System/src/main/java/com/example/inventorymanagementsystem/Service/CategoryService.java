package com.example.inventorymanagementsystem.Service;

import com.example.inventorymanagementsystem.DTO.CategoryRequest;
import com.example.inventorymanagementsystem.DTO.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    void delete(Long id);

    CategoryResponse getById(Long id);

    List<CategoryResponse> getAll();
}
