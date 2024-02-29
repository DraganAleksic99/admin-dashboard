export type InventoryType = 'in_stock' | 'limited' | 'out_of_stock'

export type ProductType = {
  _id?: string
  name: string
  description: string
  category: string
  quantity: string
  productSku: string
  createdAt: string | number
  updatedAt: string | number
  image?: string
  price: string
  salePrice: string
  includesTaxes: boolean
  isTaxable: boolean
}
