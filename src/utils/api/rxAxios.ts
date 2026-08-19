import axiosInstance from './axiosInstance';
import axios from 'axios';

import {
  Observable,
  from,
  throwError,
} from 'rxjs';

import {
  map,
  catchError,
} from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export class rxAxios<T,CreateDto = Partial<T>,UpdateDto = Partial<T>> {
  protected readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // GET ALL
  getAll(params?: Record<string, unknown>): Observable<T[]> {
    return from(
      axiosInstance.get<ApiResponse<T[]>>(
        this.endpoint,
        {
          params,
        }
      )
    ).pipe(
      map(response => response.data.data),

      catchError(error =>
        this.handleError(error)
      )
    );
  }

  // GET BY ID
  getById(id: string | number): Observable<T> {
    return from(
      axiosInstance.get<ApiResponse<T>>(
        `${this.endpoint}/${id}`
      )
    ).pipe(
      map(response => response.data.data),

      catchError(error =>
        this.handleError(error)
      )
    );
  }

  // CREATE
  create(data: CreateDto): Observable<T> {
    return from(
      axiosInstance.post<ApiResponse<T>>(
        this.endpoint,
        data
      )
    ).pipe(
      map(response => response.data.data),

      catchError(error =>
        this.handleError(error)
      )
    );
  }

  // UPDATE
  update(id: string | number,data: UpdateDto): Observable<T> {
    return from(
      axiosInstance.put<ApiResponse<T>>(
        `${this.endpoint}/${id}`,
        data
      )
    ).pipe(
      map(response => response.data.data),

      catchError(error =>
        this.handleError(error)
      )
    );
  }

  // DELETE
  delete(id: string | number): Observable<void> {
    return from(
      axiosInstance.delete(
        `${this.endpoint}/${id}`
      )
    ).pipe(
      map(() => undefined),

      catchError(error =>
        this.handleError(error)
      )
    );
  }

  private handleError(error: unknown): Observable<never> {
    if (axios.isAxiosError(error)) {
      console.error(
        'API Error:',
        error.response?.data
      );
    } else {
      console.error(
        'Unknown Error:',
        error
      );
    }

    return throwError(() => error);
  }
}