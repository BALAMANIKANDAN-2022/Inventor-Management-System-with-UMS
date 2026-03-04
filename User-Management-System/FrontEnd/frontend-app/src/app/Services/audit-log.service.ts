// ims/services/audit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { AuditLogAdminResponse } from '../Model/audit-log-admin-response';
import { Observable } from 'rxjs';
import { get } from 'http';

@Injectable({ providedIn: 'root' })
export class AuditLogService {

  private baseUrl = 'http://localhost:8090/api/admin/audit-logs';

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

 getAllLogs(): Observable<AuditLogAdminResponse[]> {
    return this.http.get<AuditLogAdminResponse[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getLogsByProduct(productId: number): Observable<AuditLogAdminResponse[]> {
    return this.http.get<AuditLogAdminResponse[]>(`${this.baseUrl}/product/${productId}`, { headers: this.getHeaders() });
  }
}