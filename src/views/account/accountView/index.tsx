import { useState, ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Divider, Tab, Tabs, styled } from '@mui/material'
import Header from './Header'
import General from './general'
import Subscription from './Subscription'
import Notifications from './Notifications'
import Security from './Security'
import Page from '../../../components/pages'
import { getProfileAction } from '../../../features/profile/profileAsyncActions'
import { AppDispatch, RootState } from '../../../store/configureStore'

const StyledPage = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  display: 'flex',
  flex: '1 1 auto'
}))

const AccountView = () => {
  const dispatch: AppDispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState('general')
  const { claims } = useSelector((state: RootState) => state.auth)
  const { accessToken } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(getProfileAction({ id: claims?.payload?._id, token: accessToken }))
  }, [dispatch, claims, accessToken])

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }
  return (
    <StyledPage title="Account">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General />}
          {currentTab === 'subscription' && <Subscription />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </StyledPage>
  )
}

const tabs = [
  { value: 'general', label: 'General' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'security', label: 'Security' }
]

export default AccountView
