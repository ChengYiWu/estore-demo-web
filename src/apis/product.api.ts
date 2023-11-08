import estoreApi from "./clients";
import {
  CreateProductRequest,
  GetProductListResponse,
  GetProductResponse,
  GetProductsResponse,
  UpdateProductRequest,
} from "./product.api.types";

const ProductApi = {
  getList: async (): Promise<GetProductListResponse> => {
    const result = await estoreApi.get("/products/list");
    return result.data;
  },
  getProducts: async (condition): Promise<GetProductsResponse> => {
    const result = await estoreApi.get("/products", { params: condition });
    return result.data;
  },
  getProduct: async (id: string): Promise<GetProductResponse> => {
    const result = await estoreApi.get(`/products/${id}`);
    return result.data;
  },
  createProduct: async (data: CreateProductRequest): Promise<string> => {
    const result = await estoreApi.post(`/products`, data);
    return result.data;
  },
  updateProduct: async (id: string, data: UpdateProductRequest): Promise<void> => {
    const result = await estoreApi.put(`/products/${id}`, data);
    return result.data;
  },
  deleteProduct: async (id: string): Promise<void> => {
    const result = await estoreApi.delete(`/products/${id}`);
    return result.data;
  },
};

export default ProductApi;
