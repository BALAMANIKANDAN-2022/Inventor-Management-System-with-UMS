// ims/services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProductsService {

  private baseUrl = 'http://localhost:8090/api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}