package com.example.inventorymanagementsystem.Repository;

import com.example.inventorymanagementsystem.POJO.Product;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySku(@NotBlank String sku);
}
