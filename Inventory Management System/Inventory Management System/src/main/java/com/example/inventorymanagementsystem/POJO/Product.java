package com.example.inventorymanagementsystem.POJO;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "products",
        uniqueConstraints = @UniqueConstraint(name = "uk_product_sku", columnNames = "sku"),
        indexes = {

        @Index(name = "idx_product_name",columnList = "name")
        })
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 15)
    @Column(nullable = false,length = 15)
    private String sku;

    @NotBlank @Size(max =30)
    @Column(nullable = false,length = 30)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name = "category_id",
                foreignKey =@ForeignKey(name = "fk_product_category"))
    private Category category;

    @NotNull @Min(0)
    @Column(nullable = false)
    private Integer quantityOnHand;

    @NotNull @Min(0)
    @Column(nullable = false)
    private Integer reorderLevel;

    @NotNull
    @DecimalMin(value = "0.00")
    @Digits(integer = 10,fraction = 2)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal unitCost;

    @NotNull
    @DecimalMin(value = "0.00")
    @Digits(integer = 10,fraction = 2)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 10)
    private ProductStatus status;

    @Size(max=100)
    @Column(length = 100)
    private String description;

    @Version
    @Column(nullable = false)
    private Integer version;

    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;
}
