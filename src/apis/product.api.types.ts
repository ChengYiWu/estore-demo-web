import ExistFile from "@/types/commons/ExistFile";
import { MutipleFileUpload, SingleFileUpload } from "@/types/commons/FileUploadable";

interface ProductItem {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  image?: ExistFile;
  placedOrderCount: number;
  shippedOrderCount: number;
  cancelledOrderCount: number;
}

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  brand?: string;
  weight?: string;
  dimensions?: string;
  isEditable: boolean;
  createdUserName: string;
  images: ExistFile[];
  productItems: ProductItem[];
}

interface GetProductsResponse {
  items: ProductResponse[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

type CreateProductRequest = {
  name: string;
  description: string;
  brand?: string;
  weight?: string;
  dimensions?: string;
  productItems: CreateProductItem[];
} & MutipleFileUpload;

type CreateProductItem = {
  name: string;
  price: number;
  stockQuantity: number;
  isActive?: boolean;
} & SingleFileUpload;

type UpdateProductRequest = {
  name: string;
  description: string;
  brand?: string;
  weight?: string;
  dimensions?: string;
  productItems: UpdateProductItem[];
} & MutipleFileUpload;

type UpdateProductItem = {
  id?: number | null;
  name: string;
  price: number;
  stockQuantity: number;
  isActive?: boolean | null;
} & SingleFileUpload;

interface GetProductListResponse {
  items: ProductListItem[];
}

interface ProductListItem {
  id: number;
  name: string;
  productItems: ProductListProductItem[];
}

interface ProductListProductItem {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
}

export type {
  GetProductsResponse,
  ProductResponse as GetProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
  GetProductListResponse,
};
