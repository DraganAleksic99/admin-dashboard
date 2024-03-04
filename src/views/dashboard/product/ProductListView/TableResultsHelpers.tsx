import { ProductType } from '../../../../models/product-type'
import Label from '../../../../components/label'

export type TableResultsHelpers = {
  category?: string
  inStock?: boolean
}

export const applyFilters = (
  products: ProductType[],
  query: string,
  filters: TableResultsHelpers
): ProductType[] => {
  return products.filter(product => {
    let matches = true

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false
    }

    if (filters.category && product.category !== filters.category) {
      matches = false
    }

    if (filters.inStock && Number(product.quantity) < 1) {
      matches = false
    }

    return matches
  })
}

export const applyPagination = (
  products: ProductType[],
  page: number,
  limit: number
): ProductType[] => {
  return products.slice(page * limit, page * limit + limit)
}

export const applySort = (products: ProductType[], sortOption: string): ProductType[] => {
  let updatedProducts: ProductType[]
  switch (sortOption) {
    case 'createdAt|desc':
      products.sort((firstProduct: ProductType, secondProduct: ProductType) => {
        if (firstProduct.createdAt > secondProduct.createdAt) {
          return 1
        } else {
          return -1
        }
      })
      break
    case 'createdAt|asc':
      products.sort((firstProduct: ProductType, secondProduct: ProductType) => {
        if (firstProduct.createdAt > secondProduct.createdAt) {
          return -1
        } else {
          return 1
        }
      })
      break
    case 'updatedAt|desc':
      updatedProducts = products.filter(product => product.updatedAt)
      products = updatedProducts.sort((firstProduct: ProductType, secondProduct: ProductType) => {
        if (firstProduct.updatedAt > secondProduct.updatedAt) {
          return -1
        } else {
          return 1
        }
      })
      break
    case 'updatedAt|asc':
      updatedProducts = products.filter(product => product.updatedAt)
      products = updatedProducts.sort((firstProduct: ProductType, secondProduct: ProductType) => {
        if (firstProduct.updatedAt > secondProduct.updatedAt) {
          return 1
        } else {
          return -1
        }
      })
      break
  }
  return products
}

export const getInventoryLabel = (quantity: number): JSX.Element => {
  const map = {
    in_stock: {
      text: 'In Stock',
      color: 'success'
    },
    limited: {
      text: 'Limited',
      color: 'warning'
    },
    out_of_stock: {
      text: 'Out of Stock',
      color: 'error'
    }
  }

  let inventoryType: string

  console.log(quantity)

  if (quantity < 5) inventoryType = 'limited'

  if (quantity >= 5) inventoryType = 'in_stock'

  if (quantity === 0) inventoryType = 'out_of_stock'

  const { text, color }: any = map[inventoryType]

  return <Label color={color}>{text}</Label>
}
