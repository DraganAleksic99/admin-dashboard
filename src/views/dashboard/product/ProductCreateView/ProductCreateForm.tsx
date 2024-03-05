import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  styled
} from '@mui/material'
import FilesDropzone from '../../../../components/files-dropzone'
import QuillEditor from '../../../../components/quill-editor'
import { postProductAxios, putProductAxios } from '../../../../services/productService'
import { yupProductValidation } from './schema/yupProductValidation'
import { ProductType } from '../../../../models/product-type'
import bytesToSize from '../../../../utils/bytes-to-size'

const categories = [
  {
    id: 'dress',
    name: 'Dress'
  },
  {
    id: 'jewelry',
    name: 'Jewelry'
  },
  {
    id: 'blouse',
    name: 'Blouse'
  },
  {
    id: 'beauty',
    name: 'Beauty'
  }
]

const StyledQuillEditor = styled(QuillEditor)({
  '& .ql-editor': {
    height: 400
  }
})

type Props = {
  initialValues?: ProductType
  edit?: boolean
}

const ProductCreateForm = ({ initialValues, edit }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState(initialValues.imageName)
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yupProductValidation}
      onSubmit={async (values, formikHelpers) => {
        const formData = new FormData()

        values.name && formData.append('name', values.name)
        values.category && formData.append('category', values.category)
        values.description && formData.append('description', values.description)

        file && formData.append('image', file)
        ;(file || image) && formData.append('imageName', file?.name || initialValues.imageName)
        file && formData.append('imageSize', bytesToSize(file.size))

        values.price && formData.append('price', String(values.price))
        values.salePrice && formData.append('salePrice', values.salePrice)
        formData.append('quantity', String(values.quantity))
        values.taxSettings.includesTaxes &&
          formData.append('taxSettings[includesTaxes]', String(values.taxSettings.includesTaxes))
        values.taxSettings.isTaxable &&
          formData.append('taxSettings[isTaxable]', String(values.taxSettings.isTaxable))
        values.productSku && formData.append('productSku', values.productSku)

        try {
          let response

          if (edit) {
            response = await putProductAxios(formData, initialValues._id)
          } else {
            response = await postProductAxios(formData)
          }

          formikHelpers.setStatus({ success: true })
          formikHelpers.setSubmitting(false)
          enqueueSnackbar(`${response.data.message}`, {
            variant: 'success'
          })
          navigate('/dashboard/list-products')
        } catch (err: any) {
          setError(err.response.data.message)
          formikHelpers.setStatus({ success: false })
          formikHelpers.setSubmitting(false)
        }
      }}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(formikProps.touched.name && formikProps.errors.name)}
                    fullWidth
                    helperText={formikProps.touched.name && formikProps.errors.name}
                    label="Product Name"
                    name="name"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.name}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <StyledQuillEditor
                      value={formikProps.values.description}
                      onChange={(value: string) => formikProps.setFieldValue('description', value)}
                    />
                  </Paper>
                  {formikProps.touched.description && formikProps.errors.description && (
                    <Box mt={2}>
                      <FormHelperText error>{formikProps.errors.description}</FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone
                      imageName={initialValues.imageName}
                      imageSize={initialValues.imageSize}
                      setImage={setImage}
                      file={file}
                      setFile={setFile}
                    />
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(formikProps.touched.price && formikProps.errors.price)}
                          fullWidth
                          helperText={
                            formikProps.touched.price && formikProps.errors.price
                              ? formikProps.errors.price
                              : 'If you have a sale price this will be shown as old price'
                          }
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            formikProps.touched.salePrice && formikProps.errors.salePrice
                          )}
                          fullWidth
                          helperText={formikProps.touched.salePrice && formikProps.errors.salePrice}
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikProps.values.taxSettings?.isTaxable}
                            onChange={e =>
                              formikProps.setFieldValue('taxSettings.isTaxable', e.target.checked)
                            }
                            value={formikProps.values.taxSettings?.isTaxable}
                            name="taxSettings.isTaxable"
                          />
                        }
                        label="Product is taxable"
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikProps.values.taxSettings?.includesTaxes}
                            onChange={e =>
                              formikProps.setFieldValue(
                                'taxSettings.includesTaxes',
                                e.target.checked
                              )
                            }
                            value={formikProps.values.taxSettings?.includesTaxes}
                            name="taxSettings.includesTaxes"
                          />
                        }
                        label="Price includes taxes"
                      />
                      {formikProps.touched.taxSettings && formikProps.errors.taxSettings && (
                        <FormHelperText error>
                          {formikProps.errors.taxSettings && String(formikProps.errors.taxSettings)}
                        </FormHelperText>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <TextField
                    error={Boolean(formikProps.touched.category && formikProps.errors.category)}
                    fullWidth
                    helperText={formikProps.touched.category && formikProps.errors.category}
                    label="Category"
                    name="category"
                    onChange={formikProps.handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={formikProps.values.category}
                    variant="outlined"
                  >
                    <option disabled key="empty"></option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(formikProps.touched.quantity && formikProps.errors.quantity)}
                      fullWidth
                      helperText={formikProps.touched.quantity && formikProps.errors.quantity}
                      label="Quantity"
                      name="quantity"
                      type="number"
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.quantity}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(
                        formikProps.touched.productSku && formikProps.errors.productSku
                      )}
                      fullWidth
                      helperText={formikProps.touched.productSku && formikProps.errors.productSku}
                      label="Product Sku"
                      name="productSku"
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.productSku}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              {edit ? 'Edit' : 'Create'} product
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default ProductCreateForm
