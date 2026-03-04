import { Component, OnInit } from '@angular/core';
import { AuditLogService } from '../../Services/audit-log.service';
import { AuditLogAdminResponse } from '../../Model/audit-log-admin-response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html'
})
export class AuditLogComponent implements OnInit {

  logs: AuditLogAdminResponse[] = [];
  filteredLogs: AuditLogAdminResponse[] = [];

  searchProduct = '';
  searchSku = '';
  searchType = '';

  currentPage = 1;
  pageSize = 10;

  constructor(private auditService: AuditLogService,
              private route: ActivatedRoute
              ) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
    const productId = params['productId'];
    console.log('Received productId from query params:', productId);

    if (productId) {
      console.log('Fetching logs for productId:', productId);
      this.auditService.getLogsByProduct(productId)
        .subscribe(res => {
          this.logs = res;
            console.log('Logs loaded for productId', productId, this.logs);
          this.applyFilter();
        });
    } else {
      this.loadLogs();
    }
  });
  }

  loadLogs() {
    this.auditService.getAllLogs().subscribe(res => {
      this.logs = res;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredLogs = this.logs.filter(log =>
      (!this.searchProduct || log.productName.toLowerCase().includes(this.searchProduct.toLowerCase())) &&
      (!this.searchSku || log.sku.toLowerCase().includes(this.searchSku.toLowerCase())) &&
      (!this.searchType || log.type.toLowerCase().includes(this.searchType.toLowerCase()))
    );

    this.currentPage = 1;
  }

  get paginatedLogs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLogs.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filteredLogs.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}