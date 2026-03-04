export interface AuditLogAdminResponse {
  id: number;
  productId: number;
  sku: string;
  productName: string;
  type: string;
  quantityChanged: number;
  previousQuantity: number;
  newQuantity: number;
  unitCostSnapshot: number;
  unitPriceSnapshot: number;
  performedBy: string;
  createdAt: string;
}