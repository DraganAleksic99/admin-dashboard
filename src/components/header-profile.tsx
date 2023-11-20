import React, { useState, MouseEvent } from 'react'
import { LogOut as LogOutIcon, Hexagon as HexagonIcon } from 'react-feather'
import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
  Menu,
  MenuProps
} from '@mui/material'

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  width: theme.spacing(3),
  height: theme.spacing(3)
}))

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))`
  .MuiPaper-root {
    border: 1px solid #d3d4d5;
  }
`
const StyledLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit'
})

const HeaderProfile = () => {
  const { profile } = useSelector((state: RootState) => state.profile)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={handleClick}>
        <StyledAvatar variant={'circular'} alt="User" src={profile.avatar} />
      </Box>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary={profile.email} />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HexagonIcon />
          </ListItemIcon>
          <ListItemText primary="Partners" />
        </MenuItem>
        <StyledLink href={'/'}>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </StyledLink>
      </StyledMenu>
    </div>
  )
}

export default HeaderProfile
