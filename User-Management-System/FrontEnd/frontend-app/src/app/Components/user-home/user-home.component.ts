import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';
import { UserProductsService } from '../../Services/user-products.service';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  user: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];

  selectedCategory: number | null = null;
  searchText: string = '';

  errorMessage = '';

  constructor(
    private userService: UserServiceService,
    private userProductsService: UserProductsService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadCategories();
    this.getAllActiveProducts();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => this.user = data,
      error: () => this.errorMessage = 'Unable to load user profile'
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    });
  }

  getAllActiveProducts() {
    this.userProductsService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        console.log('Active products loaded:', this.products);
        console.log('Filtered products initialized:', this.filteredProducts);
      },
      error: (error) => {
        this.errorMessage = 'Unable to load active products';
        console.error(error);
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(p => {
      const matchesCategory =
        !this.selectedCategory || p.categoryId === this.selectedCategory;

      const matchesSearch =
        !this.searchText ||
        p.name.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }

  stockIn(product: any) {
    if (!product.tempQty || product.tempQty <= 0 || !Number.isInteger(product.tempQty)) {
        alert("Enter valid quantity");
        return;
    }

    this.userProductsService.stockIn(product.id, product.tempQty)
      .subscribe(() => {
        product.quantityOnHand += product.tempQty;
        product.tempQty = 0;
      });
  }

  stockOut(product: any) {
    if (!product.tempQty || product.tempQty <= 0) {
        alert("Enter valid quantity");
        return;
    }
    if(product.tempQty > product.quantityOnHand) {
        alert("Cannot stock out more than available quantity");
        return;
    } 

    this.userProductsService.stockOut(product.id, product.tempQty)
      .subscribe(() => {
        product.quantityOnHand -= product.tempQty;
        product.tempQty = 0;
      });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}