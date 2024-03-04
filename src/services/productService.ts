import api, { EndPoints } from '../api/axios'
import { ProductType } from '../models/product-type'

export async function getProductsAxios() {
  return await api.get<ProductType[]>(EndPoints.products)
}

export async function postProductAxios(product: FormData) {
  return await api.post<FormData>(EndPoints.products, product)
}

export async function deleteProductAxios(productIds: string[]) {
  return await api.delete<{ message: string }>(EndPoints.products, { data: productIds })
}

export async function putProductAxios(product: FormData, productId: string) {
  return await api.put<{ message: string }>(`${EndPoints.products}/${productId}`, product)
}
