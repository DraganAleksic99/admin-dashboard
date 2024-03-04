import { Container, styled } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import ProductCreateForm from '../ProductCreateView/ProductCreateForm'
import Page from '../../../../components/pages'

const StyledPage = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: 100,
  display: 'flex',
  flex: '1 1 auto'
}))

const ProductUpdateView = () => {
  const location = useLocation()
  const { product } = location.state

  return (
    <StyledPage title="Product Create">
      <Container maxWidth={false}>
        <Header />
        <ProductCreateForm edit initialValues={product} />
      </Container>
    </StyledPage>
  )
}

export default ProductUpdateView
