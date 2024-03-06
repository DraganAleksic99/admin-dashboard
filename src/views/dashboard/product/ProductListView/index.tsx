import { useEffect, useState } from 'react'
import Header from './Header'
import Results from './Results'
import { getProductsAxios } from '../../../../services/productService'
import { ProductType } from '../../../../models/product-type'
import { Box, Container, styled } from '@mui/material'
import Page from '../../../../components/pages'

const StyledPage = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: 100,
  display: 'flex',
  flex: '1 1 auto'
}))

const ProductListView = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  const fetchProducts = async () => {
    try {
      const { data } = await getProductsAxios()
      setProducts(data)
    } catch (e) {
      alert('Something went wrong')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <StyledPage title="Product List">
      <Container maxWidth={false}>
        <Header />
        {products && (
          <Box mt={3}>
            <Results onProductDeleted={fetchProducts} products={products} />
          </Box>
        )}
      </Container>
    </StyledPage>
  )
}

export default ProductListView
