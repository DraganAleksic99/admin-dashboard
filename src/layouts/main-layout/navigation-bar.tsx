import { AppBar, Box, Toolbar, Button, colors, styled, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import HeaderProfile from '../../components/header-profile'

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: colors.lightBlue[50]
})

export default function NavigationBar() {
  const { claims } = useSelector((state: RootState) => state.auth)
  const token = localStorage.getItem('token')
  const mobileDevice = useMediaQuery('(max-width:650px)')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledLink to={'/'} style={{ flexGrow: 1 }}>
            {!mobileDevice && 'LOGO'}
          </StyledLink>
          <Button color="inherit">
            <StyledLink to={'/'}>Home</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink to={'/about'}>About</StyledLink>
          </Button>
          {claims ? (
            <>
              <Button color="inherit">
                <StyledLink to={'/dashboard'}>Dashboard</StyledLink>
              </Button>
              <HeaderProfile />
            </>
          ) : (
            <Button color="inherit">
              <StyledLink to={'/login'}>Login</StyledLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
