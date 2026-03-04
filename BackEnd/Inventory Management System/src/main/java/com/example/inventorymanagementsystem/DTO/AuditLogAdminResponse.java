package com.example.inventorymanagementsystem.DTO;

import java.math.BigDecimal;
import java.time.Instant;

public record AuditLogAdminResponse(
        Long id,
        Long productId,
        String sku,
        String productName,
        String type,
        Integer quantityChanged,
        Integer previousQuantity,
        Integer newQuantity,
        BigDecimal unitCostSnapshot,
        BigDecimal unitPriceSnapshot,
        String performedBy,
        Instant createdAt
) {
}
