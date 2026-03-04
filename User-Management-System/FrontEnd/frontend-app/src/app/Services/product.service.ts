import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private adminUrl = 'http://localhost:8090/api/admin/products';
  private userUrl = 'http://localhost:8090/api/products';

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
  
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

  // ---------- ADMIN ----------
  getAllForAdmin(): Observable<any> {
    return this.http.get(this.adminUrl,{headers: this.getHeaders()});
  }

  getByIdForAdmin(id: number): Observable<any> {
    return this.http.get(`${this.adminUrl}/${id}`,{headers: this.getHeaders()});
  }

  create(product: any): Observable<any> {
    return this.http.post(this.adminUrl, product, {headers: this.getHeaders()});
  }

  update(id: number, product: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/${id}`, product, {headers: this.getHeaders()});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`, {headers: this.getHeaders()});
  }

  stockIn(id: number, quantity: number) {
    return this.http.post(`${this.adminUrl}/${id}/stock-in`,
      null,
      { params: new HttpParams().set('quantity', quantity), headers: this.getHeaders() });
  }

  stockOut(id: number, quantity: number) {
    return this.http.post(`${this.adminUrl}/${id}/stock-out`,
      null,
      { params: new HttpParams().set('quantity', quantity), headers: this.getHeaders() });
  }

  adjustStock(id: number, newQuantity: number) {
    return this.http.post(`${this.adminUrl}/${id}/adjust`,
      null,
      { params: new HttpParams().set('newQuantity', newQuantity), headers: this.getHeaders() });
  }

  // ---------- USER ----------
  getAllForUser(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  getByIdForUser(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/${id}`);
  }
}