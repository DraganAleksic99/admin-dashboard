import { useState, MouseEvent } from 'react'
import { LogOut as LogOutIcon, Hexagon as HexagonIcon } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/configureStore'
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
import { saveTokenAction, saveClaimsAction } from '../features/auth/authSlice'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { claims } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    dispatch(saveTokenAction(undefined))
    dispatch(saveClaimsAction(undefined))
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={handleClick}>
        <StyledAvatar variant={'circular'} alt="User" src={''} />
      </Box>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary={claims?.payload?.email} />
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
