import estoreApi from "./clients";
import {
  CreateCouponRequest,
  GetCouponListResponse,
  GetCouponResponse,
  GetCouponsResponse,
  UpdateCouponRequest,
} from "./coupon.api.types";

const CouponApi = {
  getList: async (): Promise<GetCouponListResponse> => {
    const result = await estoreApi.get("/coupons/list");
    return result.data;
  },
  getCoupons: async (condition): Promise<GetCouponsResponse> => {
    const result = await estoreApi.get("/coupons", { params: condition });
    return result.data;
  },
  getCoupon: async (id: string): Promise<GetCouponResponse> => {
    const result = await estoreApi.get(`/coupons/${id}`);
    return result.data;
  },
  createCoupon: async (data: CreateCouponRequest): Promise<string> => {
    const result = await estoreApi.post(`/coupons`, data);
    return result.data;
  },
  updateCoupon: async (id: string, data: UpdateCouponRequest): Promise<void> => {
    const result = await estoreApi.put(`/coupons/${id}`, data);
    return result.data;
  },
  deleteCoupon: async (id: string): Promise<void> => {
    const result = await estoreApi.delete(`/coupons/${id}`);
    return result.data;
  },
};

export default CouponApi;
