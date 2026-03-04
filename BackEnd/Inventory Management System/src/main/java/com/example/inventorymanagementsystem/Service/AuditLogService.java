package com.example.inventorymanagementsystem.Service;

import com.example.inventorymanagementsystem.DTO.AuditLogAdminResponse;

import java.util.List;

public interface AuditLogService {
    List<AuditLogAdminResponse> getAllLogs();

    List<AuditLogAdminResponse> getLogsByProduct(Long productId);
}
