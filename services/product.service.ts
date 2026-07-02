import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";

export const productService = {
  // ទាញយកទិន្នន័យផលិតផលទាំងអស់
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>("/items");
    return response.data;
  },

  // ទាញយកទិន្នន័យផលិតផលតែមួយតាម ID
  getProductById: async (id: string | number): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/items/${id}`);
    return response.data;
  },
};