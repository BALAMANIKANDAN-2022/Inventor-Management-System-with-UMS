package com.example.inventorymanagementsystem.ServiceImplementation;

import com.example.inventorymanagementsystem.DTO.AuditLogAdminResponse;
import com.example.inventorymanagementsystem.POJO.AuditLog;
import com.example.inventorymanagementsystem.Repository.AuditLogRepository;
import com.example.inventorymanagementsystem.Service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogServiceImplementation implements AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<AuditLogAdminResponse> getAllLogs() {
        return auditLogRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AuditLogAdminResponse> getLogsByProduct(Long productId) {
        return auditLogRepository.findById(productId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AuditLogAdminResponse mapToResponse(AuditLog auditLog){
        return new AuditLogAdminResponse(
                auditLog.getId(),
                auditLog.getProduct().getId(),
                auditLog.getProduct().getSku(),
                auditLog.getProduct().getName(),
                auditLog.getType().name() ,
                auditLog.getQuantityChanged(),
                auditLog.getPreviousQuantity(),
                auditLog.getNewQuantity(),
                auditLog.getUnitCostSnapshot(),
                auditLog.getUnitPriceSnapshot(),
                auditLog.getPerformedBy(),
                auditLog.getCreatedAt()
        );
    }
}
