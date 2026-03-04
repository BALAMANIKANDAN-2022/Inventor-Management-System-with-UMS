import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

filters = {
  name: '',
  categoryId: null,
  status: '',
  lowStock: false
};

filteredProducts: any[] = [];

currentPage = 1;
itemsPerPage = 15;
totalPages = 1;
totalPagesArray: number[] = [];

  categories: any[] = [];
  products: any[] = [];
  selectedProduct: any = {
  sku: '',
  name: '',
  categoryId: null,
  quantityOnHand: null,
  reorderLevel: null,
  unitCost: null,
  unitPrice: null,
  description: '',
  status: 'ACTIVE'
};
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

 loadProducts() {
  this.productService.getAllForAdmin().subscribe(data => {
    this.products = data;
    this.applyFilters();
  });
}

  editProduct(product: any) {
    this.selectedProduct = { ...product,
    categoryId: product.categoryId };
    this.isEditMode = true;
  }

  applyFilters() {

  this.filteredProducts = this.products.filter(p => {

    const matchesName =
      !this.filters.name ||
      p.name.toLowerCase().includes(this.filters.name.toLowerCase());

    const matchesCategory =
      !this.filters.categoryId ||
      p.categoryId === this.filters.categoryId;

    const matchesStatus =
      !this.filters.status ||
      p.status === this.filters.status;

    const matchesLowStock =
      !this.filters.lowStock ||
      p.quantityOnHand <= p.reorderLevel;

    return matchesName &&
           matchesCategory &&
           matchesStatus &&
           matchesLowStock;
  });

  this.currentPage = 1;
  this.updatePagination();
}

clearFilters() {
  this.filters = {
    name: '',
    categoryId: null,
    status: '',
    lowStock: false
  };
  this.applyFilters();
}

updatePagination() {
  this.totalPages =
    Math.ceil(this.filteredProducts.length / this.itemsPerPage);

  this.totalPagesArray =
    Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

get paginatedProducts() {
  const start =
    (this.currentPage - 1) * this.itemsPerPage;

  return this.filteredProducts.slice(
    start,
    start + this.itemsPerPage
  );
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

viewLogs(productId: number) {
  console.log('Navigating to audit logs with productId:', productId);
  this.router.navigate(['/admin/audit-logs'], {
    queryParams: { productId: productId }
  });
}


  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  saveProduct() {
    if (this.isEditMode) {
      this.productService.update(this.selectedProduct.id, this.selectedProduct)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    } else {
      this.productService.create(this.selectedProduct)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    }
  }

  resetForm() {
    this.selectedProduct = {
    sku: '',
    name: '',
    categoryId: null,
    quantityOnHand: null,
    reorderLevel: null,
    unitCost: null,
    unitPrice: null,
    description: '',
    status: 'ACTIVE'
  };
    this.isEditMode = false;
  }

  stockIn(product: any) {
    const qty = prompt('Enter quantity to add');
    if (qty) {
      this.productService.stockIn(product.id, +qty)
        .subscribe(() => this.loadProducts());
    }
  }

  stockOut(product: any) {
    const qty = prompt('Enter quantity to reduce');
    if (qty) {
      this.productService.stockOut(product.id, +qty)
        .subscribe(() => this.loadProducts());
    }
  }

  adjust(product: any) {
    const qty = prompt('Enter new quantity');
    if (qty) {
      this.productService.adjustStock(product.id, +qty)
        .subscribe(() => this.loadProducts());
    }
  }
}