export type ProductType = {
  _id?: string
  name: string
  description: string
  category: string
  quantity: string
  productSku: string
  createdAt: string | number
  updatedAt: string | number
  image?: File | null
  price: string
  salePrice: string
  taxSettings: {
    includesTaxes: boolean
    isTaxable: boolean
  }
}
