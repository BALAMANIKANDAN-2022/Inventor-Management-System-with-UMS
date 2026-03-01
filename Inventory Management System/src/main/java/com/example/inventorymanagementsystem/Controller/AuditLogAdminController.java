package com.example.inventorymanagementsystem.Controller;

import com.example.inventorymanagementsystem.DTO.AuditLogAdminResponse;
import com.example.inventorymanagementsystem.Service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/audit-logs")
@RequiredArgsConstructor
public class AuditLogAdminController {

    private final AuditLogService auditLogService;

    @GetMapping
    public List<AuditLogAdminResponse> getAllLogs() {
        return auditLogService.getAllLogs();
    }

    @GetMapping("/product/{productId}")
    public List<AuditLogAdminResponse> getLogsByProduct(@PathVariable Long productId) {
        return auditLogService.getLogsByProduct(productId);
    }
}
