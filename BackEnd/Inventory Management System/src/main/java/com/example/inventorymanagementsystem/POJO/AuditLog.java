package com.example.inventorymanagementsystem.POJO;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "audit_logs",
        indexes = {
                @Index(name = "idx_log_product_created", columnList = "product_id, Created_at DESC"),
                @Index(name = "idx_log_created", columnList = "createdAt DESC")
        })
@Data
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id",
                nullable = false,
                foreignKey = @ForeignKey(name = "fk_log_product"))
    private Product product;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TransactionType type;

    @NotNull
    @Column(nullable = false)
    private Integer quantityChanged;

    private Integer previousQuantity;

    private Integer newQuantity;

    @Digits(integer = 10, fraction = 2)
    @DecimalMin("0.00")
    @Column(precision = 12, scale = 2)
    private BigDecimal unitCostSnapshot;

    @Digits(integer = 10, fraction = 2)
    @DecimalMin("0.00")
    @Column(precision = 12, scale = 2)
    private BigDecimal unitPriceSnapshot;

    @NotBlank
    @Column(nullable = false, length = 120)
    private String performedBy;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
}
