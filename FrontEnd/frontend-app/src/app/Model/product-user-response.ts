export interface ProductUserResponse {
     id: number;
  name: string;
  description: string;
  sku: string;

  categoryId: number;
  categoryName: string;

  unitPrice: number;

  quantityOnHand: number;
  reorderLevel: number;

  status: string;

  createdAt: string;
  updatedAt: string;

  tempQty?: number;
}

