export interface ProductAdminResponse {
  id: number;
  sku: string;
  name: string;
  categoryId: number;
  categoryName: string;
  quantityOnHand: number;
  reorderLevel: number;
  unitCost: number;
  unitPrice: number;
  status: 'ACTIVE' | 'INACTIVE';
  description: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}