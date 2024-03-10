import api, { EndPoints } from '../api/axios'
import { ProductType } from '../models/product-type'

export async function getProductsAxios(token: string) {
  return await api.get<ProductType[]>(EndPoints.products, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export async function postProductAxios(product: FormData, token: string) {
  return await api.post<FormData>(EndPoints.products, product, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export async function deleteProductAxios(productIds: string[], token: string) {
  return await api.delete<{ message: string }>(EndPoints.products, {
    data: productIds,
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export async function putProductAxios(product: FormData, productId: string, token: string) {
  return await api.put<{ message: string }>(`${EndPoints.products}/${productId}`, product, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
