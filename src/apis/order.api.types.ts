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
  isEditable: boolean;
  orderItems: OrderItem[];
}

interface OrderItem {
  orderItemId: number;
  orderItemPrice: number;
  orderItemQuantity: number;
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

interface ChangeOrderStatusToCancelledRequest {
  reason: string;
}

export type {
  GetOrdersResponse,
  OrderResponse as GetOrderResponse,
  PlaceOrderRequest,
  ChangeOrderStatusToCancelledRequest,
};
