import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Collapse,
  ListSubheader,
  Avatar,
  Box,
  Typography,
  styled,
  useMediaQuery,
  Theme
} from '@mui/material'
import {
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  Calendar as CalendarIcon,
  List as ListIcon,
  FilePlus as FilePlusIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
  DollarSign as DolarSignIcon
} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/reducers'
import { getProfileAction } from '../../features/profile/profileAsyncActions'

type Props = {
  theme?: Theme
  mobile: string | undefined
}

const drawerWidth = 240

const StyledDrawer = styled(Drawer)(({ theme, mobile }: Props) => ({
  width: drawerWidth,
  flexShrink: 0,
  ...(mobile && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  })
}))

const StyledDiv = styled('div')({
  display: 'flex'
})

const StyledDrawerPaper = styled('div')(({ theme, mobile }: Props) => ({
  width: drawerWidth,
  ...(mobile && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  })
}))

const DrawerContainer = styled('div')({
  overflow: 'auto'
})

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
})

const StyledLinkTag = styled('a')({
  textDecoration: 'none',
  color: 'inherit'
})

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&&': {
    paddingLeft: theme.spacing(4)
  }
}))

const StyledAvatar = styled(Avatar)({
  cursor: 'pointer',
  width: 64,
  height: 64
})

const DashboardSidebarNavigation = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { profile } = useSelector((state: RootState) => state.profile)
  const { claims } = useSelector((state: RootState) => state.auth)
  const mobileDevice = useMediaQuery('(max-width:650px)')

  const handleClick = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    sessionStorage.clear()
  }

  useEffect(() => {
    //@ts-ignore
    dispatch(getProfileAction('z4fNfs0'))
  }, [])

  return (
    <StyledDiv>
      <StyledDrawer mobile={mobileDevice ? 'true' : undefined} variant="permanent" anchor="left">
        <StyledDrawerPaper mobile={mobileDevice ? 'true' : undefined} />
        {profile.name && !mobileDevice && (
          <Box p={2}>
            <Box display="flex" justifyContent="center">
              <StyledAvatar alt="User" src={profile.avatar} />
            </Box>
            <Box mt={2} textAlign="center">
              <Typography>{profile.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Your tier: {profile.tier}
              </Typography>
            </Box>
          </Box>
        )}
        <Divider />
        {mobileDevice ? (
          <DrawerContainer>
            <List>
              <ListSubheader>Reports</ListSubheader>
              <StyledLink to={`/dashboard`}>
                <ListItemButton>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItemButton>
              </StyledLink>
              <ListSubheader>Management</ListSubheader>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <StyledLink to={`/dashboard/list-products`}>
                    <StyledListItemButton>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </StyledListItemButton>
                  </StyledLink>
                  <StyledLink to={`/dashboard/create-product`}>
                    <StyledListItemButton>
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Product" />
                    </StyledListItemButton>
                  </StyledLink>
                </List>
              </Collapse>
              <ListSubheader>Applications</ListSubheader>
              <StyledLink to="/dashboard/calendar">
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItemButton>
              </StyledLink>
              <ListSubheader>Pages</ListSubheader>
              <StyledLink to="/dashboard/account">
                <ListItemButton>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Account'} />
                </ListItemButton>
              </StyledLink>
              <StyledLink to="/pricing">
                <ListItemButton>
                  <ListItemIcon>
                    <DolarSignIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Pricing'} />
                </ListItemButton>
              </StyledLink>
              <StyledLinkTag href="/">
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItemButton>
              </StyledLinkTag>
            </List>
            <Divider />
          </DrawerContainer>
        ) : (
          <DrawerContainer>
            <List>
              <ListSubheader>Reports</ListSubheader>
              <StyledLink to={`/dashboard`}>
                <ListItemButton>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItemButton>
              </StyledLink>
              <ListSubheader>Management</ListSubheader>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <StyledLink to={`/dashboard/list-products`}>
                    <StyledListItemButton>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </StyledListItemButton>
                  </StyledLink>
                  <StyledLink to={`/dashboard/create-product`}>
                    <StyledListItemButton>
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Product" />
                    </StyledListItemButton>
                  </StyledLink>
                </List>
              </Collapse>
              <ListSubheader>Applications</ListSubheader>
              <StyledLink to="/dashboard/calendar">
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItemButton>
              </StyledLink>
              <ListSubheader>Pages</ListSubheader>
              <StyledLink to="/dashboard/account">
                <ListItemButton>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Account'} />
                </ListItemButton>
              </StyledLink>
              <StyledLink to="/pricing">
                <ListItemButton>
                  <ListItemIcon>
                    <DolarSignIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Pricing'} />
                </ListItemButton>
              </StyledLink>
              <StyledLinkTag href="/">
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItemButton>
              </StyledLinkTag>
            </List>
            <Divider />
          </DrawerContainer>
        )}
      </StyledDrawer>
    </StyledDiv>
  )
}

export default DashboardSidebarNavigation
