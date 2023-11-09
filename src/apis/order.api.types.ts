interface OrderResponse {
  orderNo: string;
  note: string;
  status: string;
  contactPhone: string;
  shippingAddress: string;
  shippingFee: number;
  shippedUserName: string;
  shippedAt: string;
  totalPrice: number;
  priceDiscount: number;
  finalTotalPrice: number;
  placedAt: string;
  cancelledUserName: string;
  cancelledAt: string;
  cancelledReason: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  orderItemId: number;
  orderItemPrice: number;
  productId: number;
  productName: string;
  productItemName: string;
}

interface GetOrdersResponse {
  items: OrderResponse[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface PlaceOrderRequest {
  contactPhone: string;
  shippingAddress: string;
  note?: string;
  customerId: string;
  couponCode?: string;
  items: PlaceOrderItem[];
}

interface PlaceOrderItem {
  productItemId: number;
  quantity: number;
}

interface ChangeOrderStatusToShippedRequest {
  orderNo: string;
}

interface ChangeOrderStatusToCancelledRequest {
  orderNo: string;
  reason: string;
}

export type {
  GetOrdersResponse,
  OrderResponse as GetOrderResponse,
  PlaceOrderRequest,
  ChangeOrderStatusToShippedRequest,
  ChangeOrderStatusToCancelledRequest,
};
