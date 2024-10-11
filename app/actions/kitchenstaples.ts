import { api } from "@/network/api"
import { KitchenStaplesProps } from "@/types/Data"
import { ApiResponse } from "@/network/api"

export async function create(data: KitchenStaplesProps): Promise<ApiResponse> {
  try {
    const result = await api.post('/kitchenstaples', data)
    if ([201, 200].includes(result.status)) {
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

export async function get(params: {
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

export async function put(data: KitchenStaplesProps, params: { id: string }): Promise<ApiResponse> {
  try {
    const result = await api.put(`/kitchenstaples/${params.id}`, {
      ...data
    });

    if ([200, 201].includes(result.status)) {
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


export const kitchenstaplesActions = {
  create: create,
  get: get,
  put: put
}