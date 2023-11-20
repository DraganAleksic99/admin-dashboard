import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Breadcrumbs, Typography, Link } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'

const Header = () => {
  return (
    <div>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" to="/app" component={RouterLink}>
          Dashboard
        </Link>
        <Box>
          <Typography variant="body1" color="inherit">
            Account
          </Typography>
        </Box>
      </Breadcrumbs>
      <Typography variant="h4" color="textPrimary">
        Settings
      </Typography>
    </div>
  )
}

export default Header
