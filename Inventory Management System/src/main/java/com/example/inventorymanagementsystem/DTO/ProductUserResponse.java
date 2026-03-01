package com.example.inventorymanagementsystem.DTO;

import java.math.BigDecimal;
import java.time.Instant;

public record ProductUserResponse(
        Long id,
        String sku,
        String name,
        Long categoryId,
        String categoryName,
        Integer quantityOnHand,
        BigDecimal unitPrice,
        String status,
        String description,
        Instant createdAt,
        Instant updatedAt
) {
}
