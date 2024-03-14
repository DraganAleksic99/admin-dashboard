import { useState, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import numeral from 'numeral'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Image as ImageIcon, Edit as EditIcon, Search as SearchIcon } from 'react-feather'
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  styled
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { categoryOptions, sortOptions } from '../../../../helpers/inputProductOptions'
import {
  applyFilters,
  applyPagination,
  applySort,
  TableResultsHelpers,
  getInventoryLabel
} from './TableResultsHelpers'
import { ProductType } from '../../../../models/product-type'
import { deleteProductAxios } from '../../../../services/productService'
import { RootState } from '../../../../store/configureStore'

type Props = {
  products?: ProductType[]
  onProductDeleted: () => void
}

const StyledQueryTextField = styled(TextField)({
  width: 500
})

const StyledCategoryTextField = styled(TextField)({
  flexBasis: 200
})

const StyledStockFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: theme.spacing(2)
}))

const StyledBulkOperationsDiv = styled('div')({
  position: 'relative'
})

const StyledBulkActionsDiv = styled('div')(({ theme }) => ({
  paddingLeft: 4,
  paddingRight: 4,
  marginTop: 6,
  position: 'absolute',
  width: '100%',
  zIndex: 2,
  backgroundColor: theme.palette.background.default
}))

const StyledBulkActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2)
}))

const StyledImageTableCell = styled(TableCell)({
  fontSize: 0,
  width: 68,
  flexBasis: 68,
  flexGrow: 0,
  flexShrink: 0
})

const StyledImage = styled('img')({
  height: 68,
  width: 68
})

const Results = ({ products, onProductDeleted }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const { enqueueSnackbar } = useSnackbar()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { accessToken } = useSelector((state: RootState) => state.auth)

  const [sort, setSort] = useState<string>(sortOptions[0].value)
  const [filters, setFilters] = useState<TableResultsHelpers | any>({
    category: null,
    inStock: null
  })

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist()
    setQuery(e.target.value)
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist()
    let value: any = null
    if (e.target.value !== 'All') {
      value = e.target.value
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      category: value
    }))
  }

  const handleStockChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist()
    let value: any = null
    if (e.target.checked) {
      value = true
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      inStock: value
    }))
  }

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist()
    setSort(e.target.value)
  }

  const handleSelectAllProducts = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedProducts(e.target.checked ? products.map(product => product._id) : [])
  }

  const handleSelectOneProduct = (_e: ChangeEvent<HTMLInputElement>, productId: string): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts(prevSelected => [...prevSelected, productId])
    } else {
      setSelectedProducts(prevSelected => prevSelected.filter(id => id !== productId))
    }
  }

  const handlePageChange = (e: any, newPage: number): void => {
    setPage(newPage)
  }

  const handleLimitChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(e.target.value))
  }

  const handleDeleteProduct = async () => {
    try {
      const { data } = await deleteProductAxios(selectedProducts, accessToken)
      onProductDeleted()
      setSelectedProducts([])
      enqueueSnackbar(data.message, {
        variant: 'success'
      })
    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }

  const filteredProducts = applyFilters(products, query, filters)
  const sortedProducts = applySort(filteredProducts, sort)
  const paginatedProducts = applyPagination(sortedProducts, page, limit)
  const enableBulkOperations = selectedProducts.length > 0

  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < products.length
  const selectedAllProducts =
    selectedProducts.length === products.length && selectedProducts.length !== 0

  return (
    <Card>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <StyledQueryTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search products"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={3} display="flex" alignItems="center">
          <StyledCategoryTextField
            label="Category"
            name="category"
            onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            value={filters.category || 'All'}
            variant="outlined"
          >
            {categoryOptions.map(categoryOption => (
              <option key={categoryOption.id} value={categoryOption.name}>
                {categoryOption.name}
              </option>
            ))}
          </StyledCategoryTextField>
          <StyledStockFormControlLabel
            control={
              <Checkbox checked={!!filters.inStock} onChange={handleStockChange} name="inStock" />
            }
            label="In Stock"
          />
        </Box>
      </Box>
      {enableBulkOperations && (
        <StyledBulkOperationsDiv>
          <StyledBulkActionsDiv>
            <Checkbox
              checked={selectedAllProducts}
              indeterminate={selectedSomeProducts}
              onChange={handleSelectAllProducts}
            />
            <StyledBulkActionButton variant="outlined" onClick={handleDeleteProduct}>
              Delete
            </StyledBulkActionButton>
          </StyledBulkActionsDiv>
        </StyledBulkOperationsDiv>
      )}
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllProducts}
                    indeterminate={selectedSomeProducts}
                    onChange={handleSelectAllProducts}
                  />
                </TableCell>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts?.map(product => {
                const isProductSelected = selectedProducts.includes(product._id)
                const imageUrl =
                  product.image?.data &&
                  `http://localhost:3500/product/image/${product._id}?${new Date().getTime()}`
                return (
                  <TableRow hover key={product._id} selected={isProductSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isProductSelected}
                        onChange={event => handleSelectOneProduct(event, product._id)}
                        value={isProductSelected}
                      />
                    </TableCell>
                    <StyledImageTableCell>
                      {product.image?.data ? (
                        <StyledImage alt="Product" src={imageUrl} />
                      ) : (
                        <Box p={2} bgcolor="background.dark">
                          <SvgIcon>
                            <ImageIcon />
                          </SvgIcon>
                        </Box>
                      )}
                    </StyledImageTableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{getInventoryLabel(Number(product.quantity))}</TableCell>
                    <TableCell>{product.quantity} in stock</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{numeral(product.price).format('$0,0.00')}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          navigate(`/dashboard/edit-product/${product._id}`, {
                            state: { product }
                          })
                        }
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={sortedProducts.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

export default Results
