import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Button, Grid, Link, Typography, Box, styled } from '@mui/material'

const Header = () => {
  return (
    <Grid container justifyContent="space-between" spacing={3}>
      <Grid item>
        <Box mb={2}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
            <Link variant="body1" color="inherit" to="/dashboard" component={RouterLink}>
              Dashboard
            </Link>
            <Box>
              <Typography variant="body1" color="inherit">
                Create Product
              </Typography>
            </Box>
          </Breadcrumbs>
        </Box>
        <Typography variant="h4" color="textPrimary">
          Create a New Product
        </Typography>
      </Grid>
      <Grid item>
        <Button component={RouterLink} to="/dashboard/list-products">
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
