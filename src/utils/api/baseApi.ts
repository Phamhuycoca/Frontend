import axiosInstance from './axiosInstance';
import axios, { type AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export class BaseApi<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  protected readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getLisr(config?: AxiosRequestConfig): Promise<T[]> {
    try {
      const response = await axiosInstance.get<ApiResponse<T[]>>(this.endpoint, config);

      return response.data.data;
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async getById(id: string | number): Promise<T> {
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(`${this.endpoint}/${id}`);

      return response.data.data;
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async create(data: CreateDto): Promise<T> {
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(this.endpoint, data);

      return response.data.data;
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async update(id: string | number, data: UpdateDto): Promise<T> {
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data);

      return response.data.data;
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      await axiosInstance.delete(`${this.endpoint}/${id}`);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);

      throw error;
    }

    console.error('Unknown Error:', error);

    throw error;
  }
}
