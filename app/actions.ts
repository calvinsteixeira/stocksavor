'use server'

import { api } from "@/network/api"
import { KitchenStaplesProps } from "@/types/Data"
import { ApiResponse } from "@/network/api"
import { revalidatePath } from "next/cache"

export async function createProduct(data: Omit<KitchenStaplesProps, 'id'>, options?: {
  revalidatePath?: string
}): Promise<ApiResponse> {
  try {
    const result = await api.post('/kitchenstaples', data)
    if ([201, 200].includes(result.status)) {
      if (options?.revalidatePath) {
        revalidatePath(options?.revalidatePath)
      }
      return {
        status: result.status,
        hasError: false,
        message: "",
        data: result.data
      }
    } else {
      throw Error('Falha na criação do recurso')
    }
  } catch (error: any) {
    console.log(error)
    return {
      status: error.status,
      hasError: true,
      message: error.message,
      data: []
    }
  }
}

export async function getProduct(params: {
  id?: string;
  page?: number;
  per_page?: number;
  start?: number;
  end?: number;
  limit?: number;
} | null): Promise<ApiResponse> {
  try {
    const result = await api.get('/kitchenstaples', {
      params: {
        _id: params?.id,
        _page: params?.page,
        _per_page: params?.per_page,
        _start: params?.start,
        _end: params?.end,
        _limit: params?.limit,
      }
    })
    if ([404, 200].includes(result.status)) {
      return {
        status: result.status,
        hasError: false,
        message: "",
        data: result.data
      }
    } else {
      throw Error('Falha ao buscar os dados')
    }
  } catch (error: any) {
    console.log(error)
    return {
      status: error.status,
      hasError: true,
      message: error.message,
      data: []
    }
  }
}

export async function updateProduct(data: KitchenStaplesProps, params: { id: string }, options?: { revalidatePath?: string }): Promise<ApiResponse> {
  try {
    const result = await api.put(`/kitchenstaples/${params.id}`, {
      ...data
    });

    if ([200, 201].includes(result.status)) {
      if (options?.revalidatePath) {
        revalidatePath(options?.revalidatePath)
      }
      return {
        status: result.status,
        hasError: false,
        message: "",
        data: result.data,
      };
    } else {
      throw new Error('Falha ao criar novo produto');
    }
  } catch (error: any) {
    console.log(error);
    return {
      status: error.status,
      hasError: true,
      message: error.message,
      data: [],
    };
  }
}

export async function deleteProduct(params: {
  id: string;
  
}, options?: { revalidatePath?: string; }): Promise<ApiResponse> {
  try {
    const result = await api.delete(`/kitchenstaples/${params.id}`);
    if ([404, 200, 204].includes(result.status)) {
      if (options?.revalidatePath) {
        revalidatePath(options?.revalidatePath)
      }
      return {
        status: result.status,
        hasError: false,
        message: "",
        data: result.data
      }
    } else {
      throw Error('Falha ao deletar os produto')
    }
  } catch (error: any) {
    console.log(error)
    return {
      status: error.status,
      hasError: true,
      message: error.message,
      data: []
    }
  }
}