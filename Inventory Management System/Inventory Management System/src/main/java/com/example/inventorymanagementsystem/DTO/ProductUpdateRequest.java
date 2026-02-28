package com.example.inventorymanagementsystem.DTO;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductUpdateRequest(
        @Size(max = 15) String sku,
        @Size(max = 30)String name,
        Long categoryId,
        @Min(0) Integer quantityOnHand,
        @Min(0) Integer reorderLevel,
        @DecimalMin("0.00") BigDecimal unitCost,
        @DecimalMin("0.00") BigDecimal unitPrice,
        @Size(max = 100) String description,
        String status,
        Integer version
) {}
