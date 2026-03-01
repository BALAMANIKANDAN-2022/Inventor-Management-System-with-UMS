// ims/services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private baseUrl = 'http://localhost:8090/api/admin/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  update(id: number, product: any) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  stockIn(id: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/${id}/stock-in?quantity=${quantity}`, {});
  }

  stockOut(id: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/${id}/stock-out?quantity=${quantity}`, {});
  }

  adjust(id: number, newQuantity: number) {
    return this.http.post(`${this.baseUrl}/${id}/adjust?newQuantity=${newQuantity}`, {});
  }
}