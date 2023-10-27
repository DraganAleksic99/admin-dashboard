import React, { lazy, useEffect } from "react"
import { Grid, useMediaQuery, styled, Theme } from "@mui/material"
import DashboardSidebarNavigation from "./dashboard-layout/dashboard-sidebar-navigation"
import { useParams, useNavigate } from "react-router-dom"
import DashboardDefaultContent from "../views/dashboard/dashboard-default-content"

const SettingsAndPrivacy = lazy(() => import('../views/dashboard/settings-and-privacy'))
const ProductListView = lazy(() => import('../views/dashboard/product/ProductListView'))
const ProductCreateView = lazy(() => import('../views/dashboard/product/ProductCreateView'))
const CalendarView = lazy(() => import('../views/dashboard/calendar/CalendarView'))
const AccountView = lazy(() => import('../views/account/accountView'))

const routes: string[] = ['settings-and-privacy', 'list-products', 'create-product', 'calendar', 'account']

type Props = {
  theme?: Theme
  mobile: string | undefined
}

const StyledWrapperDiv = styled('div')(({theme}) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  }
}))

const StyledContentContainerDiv = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
})

const StyledContentDiv = styled('div')(({theme, mobile}: Props) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  ...(mobile && {
    paddingLeft: '3rem'
  })
}))

const Dashboard = () => {
    const { extension } = useParams()
    const navigate = useNavigate()
    const mobileDevice = useMediaQuery('(max-width:650px)')
    
    useEffect(() => {
      if (!routes.includes(extension) && extension !== undefined) navigate('/not-found')
    },[])
    
    return (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <DashboardSidebarNavigation />{' '}
          <StyledWrapperDiv>
            <StyledContentContainerDiv>
              <StyledContentDiv mobile={mobileDevice ? 'true' : undefined}>
                { !extension && <DashboardDefaultContent />}
                { extension === routes[0] && <SettingsAndPrivacy />}
                { extension === routes[1] && <ProductListView />}
                { extension === routes[2] && <ProductCreateView />}
                { extension === routes[3] && <CalendarView />}
                { extension === routes[4] && <AccountView />}
              </StyledContentDiv>
            </StyledContentContainerDiv>
          </StyledWrapperDiv>
        </Grid>
    )
}

export default Dashboard