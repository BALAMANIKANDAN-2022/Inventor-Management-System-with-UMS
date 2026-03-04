import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  newCategory: Category = { name: '' };
  editMode = false;
  selectedCategoryId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  saveCategory() {
    if (this.editMode && this.selectedCategoryId) {
      this.categoryService.update(this.selectedCategoryId, this.newCategory)
        .subscribe(() => {
          this.resetForm();
          this.loadCategories();
        });
    } else {
      this.categoryService.create(this.newCategory)
        .subscribe(() => {
          this.resetForm();
          this.loadCategories();
        });
    }
  }

  editCategory(category: Category) {
    this.editMode = true;
    this.selectedCategoryId = category.id!;
    this.newCategory = { name: category.name };
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.categoryService.delete(id)
        .subscribe(() => this.loadCategories());
    }
  }

  resetForm() {
    this.newCategory = { name: '' };
    this.editMode = false;
    this.selectedCategoryId = null;
  }
}