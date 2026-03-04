// ims/services/product.service.ts
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProductsService {

  private baseUrl = 'http://localhost:8090/api/products';

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  stockIn(id: number, quantity: number) {
  return this.http.post(
    `${this.baseUrl}/${id}/stock-in`,
    null,
    { params: { quantity }, headers: this.getHeaders() }
  );
}

stockOut(id: number, quantity: number) {
  return this.http.post(
    `${this.baseUrl}/${id}/stock-out`,
    null,
    { params: { quantity }, headers: this.getHeaders() }
  );
}
}