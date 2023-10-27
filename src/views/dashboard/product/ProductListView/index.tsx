import React, { useEffect, useState } from 'react'
import Header from './Header'
import Results from './Results'
import { getProductsAxios } from '../../../../services/productService'
import { ProductType } from '../../../../models/product-type'
import { 
  Backdrop,
  Box,
  CircularProgress,
  Container,
  styled
 } from '@mui/material'
import Page from '../../../../components/pages'

const StyledPage = styled(Page)(({theme}) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: 100
}))

const StyledBackdrop = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}))

const ProductListView = () => {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])

  const fetchProducts = async () => {
    handleToggle()
    try {
      const { data } = await getProductsAxios()
      setProducts(data)
    } catch(e) {
      alert('Something went wrong')
    }
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(!open)
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <StyledPage title='Product List'>
      <Container maxWidth={false}>
        <Header />
        { products && (
          <Box mt={3}>
            <Results products={products} />
          </Box>
        )}
        <StyledBackdrop open={open} onClick={handleClose}>
          <CircularProgress color='inherit' />
        </StyledBackdrop>
      </Container>
    </StyledPage>
  )
}

export default ProductListView