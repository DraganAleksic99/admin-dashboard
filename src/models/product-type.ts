export type ProductType = {
  _id?: string
  name: string
  description: string
  category: string
  quantity: number
  productSku: string
  createdAt: string
  updatedAt: string
  image?: {
    data: Buffer
    contentType: string
  }
  price: number
  salePrice: string
  taxSettings: {
    includesTaxes: boolean
    isTaxable: boolean
  }
  imageName: string
  imageSize: string
}
