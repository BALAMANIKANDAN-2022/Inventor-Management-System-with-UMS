package com.example.inventorymanagementsystem.DTO;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ProductCreateRequest(
        @NotBlank String sku,
        @NotBlank @Size(max=30) String name,
        Long categoryId,

        @NotNull @Min(0) Integer quantityOnHand,
        @NotNull @Min(0) Integer reorderLevel,

        @NotNull @DecimalMin("0.00") @Digits(integer = 10, fraction = 2)
        BigDecimal unitCost,

        @NotNull @DecimalMin("0.00") @Digits(integer = 10, fraction = 2)
        BigDecimal unitPrice,

        @Size(max=100) String description,
        @NotNull String status
) {
}
