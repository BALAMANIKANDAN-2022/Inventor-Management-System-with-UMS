// ims/services/audit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuditLogService {

  private baseUrl = 'http://localhost:8090/api/admin/audit-logs';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
}