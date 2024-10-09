import { api } from "@/services/api"
import { KitchenStaplesProps } from "@/types/Data"
import { ApiResponse } from "@/services/api"

interface DataResponse extends ApiResponse {
  data: KitchenStaplesProps[]
}

export async function create(data: KitchenStaplesProps) {
  try {
    const result = await api.post('/kitchenstaples', data)
    if ([201, 200].includes(result.status)) {
      return result
    } else {
      throw Error('Falha na criação do recurso')
    }
  } catch (error) {
    console.log(error)
    return error
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
      status: 500,
      hasError: true,
      message: error.message,
      data: []
    }
  }
}

export const kitchenstaplesActions = {
  create: create,
  get: get
}