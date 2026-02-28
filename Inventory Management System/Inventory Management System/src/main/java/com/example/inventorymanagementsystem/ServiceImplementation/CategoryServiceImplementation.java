package com.example.inventorymanagementsystem.ServiceImplementation;

import com.example.inventorymanagementsystem.DTO.CategoryRequest;
import com.example.inventorymanagementsystem.DTO.CategoryResponse;
import com.example.inventorymanagementsystem.POJO.Category;
import com.example.inventorymanagementsystem.Repository.CategoryRepository;
import com.example.inventorymanagementsystem.Service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImplementation implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryResponse create(CategoryRequest request) {
        if(categoryRepository.existsByName(request.name())) {
            throw new IllegalArgumentException("Category Already Exists");
        }
        Category category = new Category();
        category.setName(request.name());
        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Category Not Found"));
        category.setName(request.name());
        categoryRepository.save(category);
        return mapToResponse(category);
    }

    @Override
    public void delete(Long id) {
        if(!categoryRepository.existsById(id)){
            throw new EntityNotFoundException("Category Not Found");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryResponse getById(Long id) {
        return categoryRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(()->new EntityNotFoundException("Category Not Found"));
    }

    @Override
    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private CategoryResponse mapToResponse(Category category){
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }
}
