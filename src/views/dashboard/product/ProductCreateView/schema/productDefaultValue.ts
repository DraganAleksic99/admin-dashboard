import { ProductType } from '../../../../../models/product-type'

export const productDefaultValue: ProductType = {
  category: '',
  createdAt: '',
  name: '',
  quantity: '',
  updatedAt: '',
  description: '',
  taxSettings: {
    includesTaxes: false,
    isTaxable: false
  },
  productSku: '',
  salePrice: '',
  price: ''
}
