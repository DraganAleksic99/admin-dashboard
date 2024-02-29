import { Container, styled } from '@mui/material'
import Header from './Header'
import ProductCreateForm from './ProductCreateForm'
import Page from '../../../../components/pages'

const StyledPage = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: 100,
  display: 'flex',
  flex: '1 1 auto'
}))

const ProductCreateView = () => {
  return (
    <StyledPage title="Product Create">
      <Container maxWidth={false}>
        <Header />
        <ProductCreateForm />
      </Container>
    </StyledPage>
  )
}

export default ProductCreateView
