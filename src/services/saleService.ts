import api, { EndPoints } from '../api/axios'
import { SaleType } from '../models/sale-type'

export async function getSalesAxios(token: string) {
  return await api.get<SaleType[]>(EndPoints.sales, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
