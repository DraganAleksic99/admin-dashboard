import { Link as RouterLink } from 'react-router-dom'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Button, Grid, Link, Typography, Box } from '@mui/material'

const Header = () => {
  return (
    <Grid container justifyContent="space-between" spacing={3} mb={3}>
      <Grid item>
        <Box mb={2}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
            <Link variant="body1" color="inherit" to="/dashboard" component={RouterLink}>
              Dashboard
            </Link>
            <Box>
              <Typography variant="body1" color="inherit">
                Edit Product
              </Typography>
            </Box>
          </Breadcrumbs>
        </Box>
        <Typography variant="h4" color="textPrimary">
          Edit product
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to="/dashboard/list-products"
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
