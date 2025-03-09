import { ApiResponse, ResponseData } from '../../common/interfaces';
import apiClient from './apiClient';

class BaseService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private getHeaders(includeAuth: boolean = false, customHeaders?: Record<string, string>) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders, // Thêm các headers tùy chỉnh
    };

    if (includeAuth) {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async getAll(
    params?: Record<string, any>,
    includeAuth: boolean = false,
    customHeaders?: Record<string, string>,
  ): Promise<ResponseData<T[]>> {
    try {
      const response = await apiClient.get<ResponseData<T[]>>(this.endpoint, {
        params,
        headers: this.getHeaders(includeAuth, customHeaders),
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy danh sách từ ${this.endpoint}:`, error);
      throw error;
    }
  }

  async getById(id: string, includeAuth: boolean = false, customHeaders?: Record<string, string>): Promise<T> {
    try {
      const response = await apiClient.get<T>(`${this.endpoint}/${id}`, {
        headers: this.getHeaders(includeAuth, customHeaders),
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết ID ${id} từ ${this.endpoint}:`, error);
      throw error;
    }
  }

  // async create(
  //   data: Partial<T>,
  //   includeAuth: boolean = false,
  //   customHeaders?: Record<string, string>,
  // ): Promise<ApiResponse<T>> {
  //   try {
  //     console.log('dataaaaa', data);

  //     const response = await apiClient.post<ApiResponse<T>>(this.endpoint, data, {
  //       headers: this.getHeaders(includeAuth, customHeaders),
  //     });
  //     return response.data; // ✅ Lấy `data` từ response
  //   } catch (error) {
  //     console.error(`Lỗi khi tạo mới tại ${this.endpoint}:`, error);
  //     throw error;
  //   }
  // }
  async create(data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      console.log('dataaaaa', data);

      const response = await apiClient.post<ApiResponse<T>>(this.endpoint, { data });
      return response.data; // ✅ Lấy `data` từ response
    } catch (error) {
      console.error(`Lỗi khi tạo mới tại ${this.endpoint}:`, error);
      throw error;
    }
  }

  async update(
    id: string,
    data: Partial<T>,
    includeAuth: boolean = false,
    customHeaders?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data, {
        headers: this.getHeaders(includeAuth, customHeaders),
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật ID ${id} tại ${this.endpoint}:`, error);
      throw error;
    }
  }

  async delete(id: string, includeAuth: boolean = false, customHeaders?: Record<string, string>): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`, {
        headers: this.getHeaders(includeAuth, customHeaders),
      });
    } catch (error) {
      console.error(`Lỗi khi xóa ID ${id} tại ${this.endpoint}:`, error);
      throw error;
    }
  }
}

export default BaseService;
