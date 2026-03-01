package com.example.inventorymanagementsystem.Repository;

import com.example.inventorymanagementsystem.POJO.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
