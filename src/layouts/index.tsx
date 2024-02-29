import { Suspense } from 'react'
import { Grid, useMediaQuery, styled, Theme, CircularProgress, Backdrop } from '@mui/material'
import { Outlet } from 'react-router-dom'
import DashboardSidebarNavigation from './dashboard-layout/dashboard-sidebar-navigation'

type Props = {
  theme?: Theme
  mobile: string | undefined
}

const StyledContentDiv = styled('div')(({ theme, mobile }: Props) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  ...(mobile && {
    paddingLeft: '3rem'
  })
}))

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff'
}))

const Dashboard = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)')

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
      <DashboardSidebarNavigation />
      <StyledContentDiv mobile={mobileDevice ? 'true' : undefined}>
        <Suspense
          fallback={
            <StyledBackdrop open={true}>
              <CircularProgress color="inherit" />
            </StyledBackdrop>
          }
        >
          <Outlet />
        </Suspense>
      </StyledContentDiv>
    </Grid>
  )
}

export default Dashboard
