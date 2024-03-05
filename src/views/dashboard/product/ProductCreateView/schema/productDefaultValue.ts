import { ProductType } from '../../../../../models/product-type'

export const productDefaultValue: ProductType = {
  category: '',
  createdAt: '',
  name: '',
  quantity: 0,
  updatedAt: '',
  description: '',
  taxSettings: {
    includesTaxes: false,
    isTaxable: false
  },
  productSku: '',
  salePrice: '',
  price: 1,
  imageName: '',
  imageSize: ''
}
