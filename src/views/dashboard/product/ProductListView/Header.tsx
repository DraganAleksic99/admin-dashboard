import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { NavigateNext } from '@mui/icons-material'
import { Box, Breadcrumbs, Button, Grid, Link, SvgIcon, Typography, styled } from '@mui/material'
import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from 'react-feather'

const StyledActionButton = styled(Button)(({ theme }) => ({
  '& + &': {
    marginLeft: theme.spacing(2)
  }
}))

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}))

const Header = props => {
  return (
    <Grid container spacing={3} justifyContent="space-between" {...props}>
      <Grid item>
        <StyledBreadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/dashboard" component={RouterLink}>
            Dashboard
          </Link>
          <Box>
            <Typography variant="body1" color="inherit">
              List Products
            </Typography>
          </Box>
        </StyledBreadcrumbs>
        <Typography variant="h4" color="textPrimary">
          All Products
        </Typography>
        <Box mt={2}>
          <StyledActionButton
            startIcon={
              <SvgIcon fontSize="small">
                <UploadIcon />
              </SvgIcon>
            }
          >
            Import
          </StyledActionButton>
          <StyledActionButton
            startIcon={
              <SvgIcon fontSize="small">
                <DownloadIcon />
              </SvgIcon>
            }
          >
            Export
          </StyledActionButton>
        </Box>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to="/dashboard/create-product"
          variant="contained"
          color="primary"
          startIcon={
            <SvgIcon>
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Product
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
