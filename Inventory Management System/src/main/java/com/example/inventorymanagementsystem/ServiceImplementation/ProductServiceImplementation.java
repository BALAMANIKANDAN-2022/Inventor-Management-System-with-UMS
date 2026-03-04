package com.example.inventorymanagementsystem.ServiceImplementation;

import com.example.inventorymanagementsystem.DTO.ProductAdminResponse;
import com.example.inventorymanagementsystem.DTO.ProductCreateRequest;
import com.example.inventorymanagementsystem.DTO.ProductUpdateRequest;
import com.example.inventorymanagementsystem.DTO.ProductUserResponse;
import com.example.inventorymanagementsystem.POJO.*;
import com.example.inventorymanagementsystem.Repository.AuditLogRepository;
import com.example.inventorymanagementsystem.Repository.CategoryRepository;
import com.example.inventorymanagementsystem.Repository.ProductRepository;
import com.example.inventorymanagementsystem.Service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImplementation implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public ProductAdminResponse create(ProductCreateRequest request, String username) {
        Optional<Product> existing = productRepository.findBySku(request.sku());

        if(existing.isPresent()) {
            Product product = existing.get();

            if(product.getStatus() == ProductStatus.INACTIVE) {
                product.setStatus(ProductStatus.ACTIVE);
                Product saved =productRepository.save(product);
                createAudit(saved,TransactionType.CREATE,
                        saved.getQuantityOnHand(), 0,
                        saved.getQuantityOnHand(),username);
                return mapToAdminProductResponse(product);
            } else {
                throw new IllegalArgumentException("Product Already Exists");
            }
        }

        Category category =  categoryRepository.findById(request.categoryId())
                .orElseThrow(()->new EntityNotFoundException("Category Not Found"));

        Product product = new Product();
        product.setSku(request.sku());
        product.setName(request.name());
        product.setCategory(category);
        product.setQuantityOnHand(request.quantityOnHand());
        product.setReorderLevel(request.reorderLevel());
        product.setUnitCost(request.unitCost());
        product.setUnitPrice(request.unitPrice());
        product.setDescription(request.description());
        product.setStatus(ProductStatus.valueOf(request.status()));

        Product saved = productRepository.save(product);

        createAudit(saved,TransactionType.CREATE,
                saved.getQuantityOnHand(), 0,
                saved.getQuantityOnHand(),username);

        return mapToAdminProductResponse(saved);
    }

    @Override
    public ProductAdminResponse update(Long id, ProductUpdateRequest request, String username) {

        Product product = getProductOrThrow(id);

        if(!product.getVersion().equals(request.version())){
            throw new OptimisticLockException("Product Modified By Another User");
        }

        product.setName(request.name());
        product.setQuantityOnHand(request.quantityOnHand());
        product.setReorderLevel(request.reorderLevel());
        product.setUnitCost(request.unitCost());
        product.setUnitPrice(request.unitPrice());
        product.setDescription(request.description());
        product.setStatus(ProductStatus.valueOf(request.status()));

        createAudit(product, TransactionType.UPDATE,0,
                product.getQuantityOnHand(),
                request.quantityOnHand(),
                username);
        return mapToAdminProductResponse(product);
    }

    @Override
    public void delete(Long id, String username) {

        Product product = getProductOrThrow(id);

        if(product.getStatus()==ProductStatus.INACTIVE){
            throw new IllegalStateException("Product Already Inactive");
        }
        createAudit(product,TransactionType.DELETE,0,
                product.getQuantityOnHand(),
                0,
                username);

        product.setStatus(ProductStatus.INACTIVE);
        productRepository.save(product);
    }

    @Override
    public ProductAdminResponse getByIdForAdmin(Long id) {
        return mapToAdminProductResponse(getProductOrThrow(id));
    }

    @Override
    public ProductUserResponse getByIdForUser(Long id) {
        return mapToUserProductResponse(getProductOrThrow(id));
    }

    @Override
    public List<ProductUserResponse> getAllForUser() {
        return productRepository.findByStatus(ProductStatus.ACTIVE)
                .stream()
                .map(this::mapToUserProductResponse)
                .toList();
    }

    @Override
    public List<ProductAdminResponse> getAllForAdmin() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToAdminProductResponse)
                .toList();
    }

    @Override
    public void stockIn(Long productId, Integer quantity, String username) {
        Product product = getProductOrThrow(productId);
        int previous = product.getQuantityOnHand();
        int newQty = previous + quantity;

        product.setQuantityOnHand(newQty);

        createAudit(product, TransactionType.STOCK_IN,
                quantity, previous, newQty, username);
    }

    @Override
    public void stockOut(Long productId, Integer quantity, String username) {

        Product product = getProductOrThrow(productId);

        int previous = product.getQuantityOnHand();

        if(previous < quantity){
            throw new IllegalStateException("Insufficient Stock");
        }

        int newQty = previous - quantity;
        product.setQuantityOnHand(newQty);

        createAudit(product,TransactionType.STOCK_OUT,
                quantity, previous, newQty, username);
    }

    @Override
    public void adjustStock(Long productId, Integer newQuantity, String username) {

        Product product = getProductOrThrow(productId);

        int previous = product.getQuantityOnHand();
        product.setQuantityOnHand((newQuantity));

        createAudit(product, TransactionType.ADJUSTMENT,
                newQuantity-previous,
                previous,
                newQuantity,
                username);
    }

    private Product getProductOrThrow(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Not Found"));
    }

    private void createAudit(Product product,
                             TransactionType type,
                             Integer quantityChanged,
                             Integer previousQty,
                             Integer newQty,
                             String username){
        AuditLog log = new AuditLog();
        log.setProduct(product);
        log.setType(type);
        log.setQuantityChanged(quantityChanged);
        log.setPreviousQuantity(previousQty);
        log.setNewQuantity(newQty);
        log.setUnitCostSnapshot(product.getUnitCost());
        log.setUnitPriceSnapshot(product.getUnitPrice());
        log.setPerformedBy(username);

        auditLogRepository.save(log);
    }
    private ProductAdminResponse mapToAdminProductResponse(Product product){
        return new ProductAdminResponse(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getQuantityOnHand(),
                product.getReorderLevel(),
                product.getUnitCost(),
                product.getUnitPrice(),
                product.getStatus().name(),
                product.getDescription(),
                product.getVersion(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

    private ProductUserResponse mapToUserProductResponse(Product product){
        return new ProductUserResponse(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getQuantityOnHand(),
                product.getReorderLevel(),
                product.getUnitPrice(),
                product.getStatus().name(),
                product.getDescription(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}
