import React, { useState, ChangeEvent } from 'react'
import {
 Box,
 Container,
 Divider,
 Tab,
 Tabs,
 styled
} from '@mui/material'
import Header from './Header'
import General from './general'
import Subscription from './Subscription'
import Notifications from './Notifications'
import Security from './Security'
import Page from '../../../components/pages'


const StyledPage = styled(Page)(({theme}) => ({
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
}))

const AccountView = () => {
    const [currentTab, setCurrentTab] = useState('general')

    const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
        setCurrentTab(value)
    }
    return (
        <StyledPage title='Settings'>
            <Container maxWidth='lg'>
                <Header />
                <Box mt={3}>
                    <Tabs
                        onChange={handleTabsChange}
                        scrollButtons='auto'
                        value={currentTab}
                        variant='scrollable'
                        textColor='secondary'
                    >
                        { tabs.map(tab => (
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