package com.example.inventorymanagementsystem.Repository;

import com.example.inventorymanagementsystem.POJO.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(@NotBlank @Size(max = 30) String name);
}
