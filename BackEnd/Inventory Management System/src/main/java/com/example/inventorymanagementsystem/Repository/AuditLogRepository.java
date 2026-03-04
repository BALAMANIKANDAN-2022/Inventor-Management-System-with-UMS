package com.example.inventorymanagementsystem.Repository;

import com.example.inventorymanagementsystem.POJO.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByProductId(Long productId);
}
