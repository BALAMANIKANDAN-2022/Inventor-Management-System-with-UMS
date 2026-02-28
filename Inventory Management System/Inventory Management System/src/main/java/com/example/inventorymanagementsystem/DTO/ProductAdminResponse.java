package com.example.inventorymanagementsystem.DTO;

import java.math.BigDecimal;
import java.time.Instant;

public record ProductAdminResponse(
        Long id,
        String sku,
        String name,
        Long categoryId,
        String categoryName,
        Integer quantityOnHand,
        Integer reorderLevel,
        BigDecimal unitCost,
        BigDecimal unitPrice,
        String status,
        String description,
        Integer version,
        Instant createdAt,
        Instant updatedAt
) {
}
