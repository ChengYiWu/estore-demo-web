interface CouponResponse {
  id: number;
  title: string;
  code: string;
  description: string;
  startedAt: string;
  expiredAt: string;
  type: string;
  isActive: boolean;
  createdUserId: string;
  createdUserName: string;
  priceAmountDiscount?: number;
  pricePercentDiscount?: number;
  usedOrderCount: number;
  applicableProducts: CouponApplicableProduct[];
}

interface GetCouponsResponse {
  items: CouponResponse[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface CouponApplicableProduct {
  id: number;
  name: string;
  productItemCount: number;
}

interface CreateCouponRequest {
  title: string;
  code: string;
  description: string;
  type: string;
  priceAmountDiscount?: number;
  pricePercentDiscount?: number;
  startedAt?: string;
  expiredAt?: string;
  isActive?: boolean;
  applicableProductIds: number[];
}

interface UpdateCouponRequest {
  title: string;
  code: string;
  description: string;
  type: string;
  priceAmountDiscount?: number;
  pricePercentDiscount?: number;
  startedAt?: string;
  expiredAt?: string;
  isActive?: boolean;
  applicableProductIds: number[];
}

interface CouponListItem {
  id: number;
  title: string;
  code: string;
  type: string;
  priceAmountDiscount?: number;
  pricePercentDiscount?: number;
  applicableProducts: CouponApplicableProduct[];
}

interface GetCouponListResponse {
  items: CouponListItem[];
}

export type {
  GetCouponsResponse,
  CouponResponse as GetCouponResponse,
  CreateCouponRequest,
  UpdateCouponRequest,
  GetCouponListResponse,
};
