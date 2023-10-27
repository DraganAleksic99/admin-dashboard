import React, { useState, ChangeEvent } from 'react'
import numeral from 'numeral'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { 
    Image as ImageIcon,
    Edit as EditIcon,
    ArrowRight as ArrowRightIcon,
    Search as SearchIcon
 } from 'react-feather'
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
import { 
    availabilityOptions,
    categoryOptions,
    sortOptions
 } from '../../../../helpers/inputProductOptions'
import { 
    applyFilters,
    applyPagination,
    TableResultsHelpers,
    getInventoryLabel
 } from './TableResultsHelpers'
import { ProductType } from '../../../../models/product-type'

type Props = {
    products?: ProductType[]
}

const StyledQueryTextField = styled(TextField)({
    width: 500
})

const StyledCategoryTextField = styled(TextField)({
    flexBasis: 200
})

const StyledAvailabilityTextField = styled(TextField)(({theme}) => ({
    marginLeft: theme.spacing(4),
    flexBasis: 200
}))

const StyledStockFormControlLabel = styled(FormControlLabel)(({theme}) => ({
    marginLeft: theme.spacing(2)
}))

const StyledShippableFormControlLabel = styled(FormControlLabel)(({theme}) => ({
    marginLeft: theme.spacing(2)
}))

const StyledBulkOperationsDiv = styled('div')({
    position: 'relative'
})

const StyledBulkActionsDiv = styled('div')(({theme}) => ({
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
}))

const StyledBulkActionButton = styled(Button)(({theme}) => ({
    marginLeft: theme.spacing(2)
}))

const StyledImageTableCell = styled(TableCell)({
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0,
})

const StyledImage = styled('img')({
    height: 68,
    width: 68,
})

const Results = ({products, ...rest}: Props) => {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10)
    const [query, setQuery] = useState('')

    const [sort, setSort] = useState<string>(sortOptions[0].value)
    const [filters, setFilters] = useState<TableResultsHelpers | any>({
        category: null,
        availability: null,
        inStock: null,
        isShippable: null
    })

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        setQuery(e.target.value)
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        let value: any = null
        if (e.target.value !== 'all') {
            value = e.target.value
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            category: value
        }))
    }

    const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        let value: any = null
        if (e.target.value !== 'all') {
            value = e.target.value
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            availability: value
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

    const handleShippableChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        let value: any = null
        if (e.target.checked) {
            value = true
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            inShippable: value
        }))
    }

    const handleSortChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.persist()
        setSort(e.target.value)
    }
    const handleSelectAllProducts = (e: ChangeEvent<HTMLInputElement>): void => {
        setSelectedProducts(
            e.target.checked ? products.map(product => product.id) : []
        )
    }
    const handleSelectOneProduct = (e: ChangeEvent<HTMLInputElement>, productId: string): void => {
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

    const filteredProducts = applyFilters(products, query, filters)
    const paginatedProducts = applyPagination(filteredProducts, page, limit)
    const enableBulkOperations = selectedProducts.length > 0
    const selectedSomeProducts = selectedProducts.length > 0 && selectedProducts.length < products.length
    const selectedAllProducts = selectedProducts.length === products.length
    
    return (
        <Card {...rest}>
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
                    ),
                    }}
                    onChange={handleQueryChange}
                    placeholder="Search products"
                    value={query}
                    variant="outlined" />
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
                    value={filters.category || 'all'}
                    variant="outlined"
                >
                {categoryOptions.map(categoryOption => (
                    <option key={categoryOption.id} value={categoryOption.id}>
                        {categoryOption.name}
                    </option>
                ))}
                </StyledCategoryTextField>
                <StyledAvailabilityTextField
                    label="Availability"
                    name="availability"
                    onChange={handleAvailabilityChange}
                    select
                    SelectProps={{ native: true }}
                    value={filters.availability || 'all'}
                    variant="outlined"
                >
                {availabilityOptions.map(avalabilityOption => (
                    <option key={avalabilityOption.id} value={avalabilityOption.id}>
                        {avalabilityOption.name}
                    </option>
                ))}
                </StyledAvailabilityTextField>
                <StyledStockFormControlLabel
                    control={
                        <Checkbox
                            checked={!!filters.inStock}
                            onChange={handleStockChange}
                            name="inStock"
                        />
                    }
                    label="In Stock"
                />
                <StyledShippableFormControlLabel
                    control={
                        <Checkbox
                            checked={!!filters.isShippable}
                            onChange={handleShippableChange}
                            name="Shippable"
                        />
                    }
                    label="Shippable"
                />
            </Box>
        </Box>
        {enableBulkOperations && (
            <StyledBulkOperationsDiv>
                <StyledBulkActionsDiv>
                    <Checkbox
                        checked={selectedAllProducts}
                        indeterminate={selectedSomeProducts}
                        onChange={handleSelectAllProducts} />
                    <StyledBulkActionButton variant="outlined">
                        Delete
                    </StyledBulkActionButton>
                    <StyledBulkActionButton variant="outlined">
                        Edit
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
                                    onChange={handleSelectAllProducts} />
                            </TableCell>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell>Inventory</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Attributes</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map(product => {
                            const isProductSelected = selectedProducts.includes(product.id);
                            return (
                                <TableRow hover key={product.id} selected={isProductSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isProductSelected}
                                            onChange={event => handleSelectOneProduct(event, product.id)}
                                            value={isProductSelected} />
                                    </TableCell>
                                    <StyledImageTableCell>
                                        {product.image ? (
                                            <StyledImage
                                                alt="Product"
                                                src={product.image} />
                                        ) : (
                                            <Box p={2} bgcolor="background.dark">
                                                <SvgIcon>
                                                    <ImageIcon />
                                                </SvgIcon>
                                            </Box>
                                        )}
                                    </StyledImageTableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {getInventoryLabel(product.inventoryType)}
                                    </TableCell>
                                    <TableCell>
                                        {product.quantity} in stock
                                        {product.variants > 1 && ` in ${product.variants} variants`}
                                    </TableCell>
                                    <TableCell>
                                        {product.attributes.map(attr => attr)}
                                    </TableCell>
                                    <TableCell>
                                        {numeral(product.price).format(
                                        `${product.currency}0,0.00`,
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton>
                                            <SvgIcon fontSize="small">
                                                <EditIcon />
                                            </SvgIcon>
                                        </IconButton>
                                        <IconButton>
                                            <SvgIcon fontSize="small">
                                                <ArrowRightIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component='div'
                    count={filteredProducts.length}
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