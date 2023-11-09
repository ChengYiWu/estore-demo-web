import estoreApi from "./clients";
import {
  ChangeOrderStatusToCancelledRequest,
  ChangeOrderStatusToShippedRequest,
  GetOrderResponse,
  GetOrdersResponse,
  PlaceOrderRequest,
} from "./order.api.types";

const OrderApi = {
  getOrders: async (condition): Promise<GetOrdersResponse> => {
    const result = await estoreApi.get("/orders", { params: condition });
    return result.data;
  },
  getOrder: async (orderNo: string): Promise<GetOrderResponse> => {
    const result = await estoreApi.get(`/orders/${orderNo}`);
    return result.data;
  },
  placeOrder: async (data: PlaceOrderRequest): Promise<string> => {
    const result = await estoreApi.post(`/orders`, data);
    return result.data;
  },
  changeOrderStatusToShipped: async (orderNo: string, data: ChangeOrderStatusToShippedRequest): Promise<void> => {
    const result = await estoreApi.put(`/orders/${orderNo}`, data);
    return result.data;
  },
  changeOrderStatusToCancelled: async (orderNo: string, data: ChangeOrderStatusToCancelledRequest): Promise<void> => {
    const result = await estoreApi.put(`/orders/${orderNo}`, data);
    return result.data;
  },
};

export default OrderApi;
