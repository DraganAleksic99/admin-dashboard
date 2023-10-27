import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Link,
    Paper,
    Typography,
    styled
} from '@mui/material'
import { RootState } from '../../../store/reducers'

const StyledOverviewBox = styled(Box)(({theme}) => ({
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
    }
}))

const StyledDetailsBox = styled(Box)(({theme}) => ({
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}))

const StyledProductImg = styled('img')(({theme}) => ({
    marginRight: theme.spacing(1),
    height: 48,
    width: 48
}))

const Subscription = () => {
    const {
        profile: { subscription }
    } = useSelector((state: RootState) => state.profile)

    return (
        <Card>
            <CardHeader title="Manage your subscription" />
            <Divider />
            <CardContent>
                <Paper variant="outlined">
                    <StyledOverviewBox>
                        <div>
                            <Typography display="inline" variant="h4" color="textPrimary">
                                {subscription.currency}
                                {subscription.price}
                            </Typography>
                            <Typography display="inline" variant="subtitle1">
                                /mo
                            </Typography>
                        </div>
                        <Box display="flex" alignItems="center">
                            <StyledProductImg
                                alt="Product"
                                src="/images/products/product_premium.svg"
                            />
                            <Typography variant="overline" color="textSecondary">
                                {subscription.name}
                            </Typography>
                        </Box>
                    </StyledOverviewBox>
                    <Divider />
                    <StyledDetailsBox>
                        <div>
                            <Typography variant="body2" color="textPrimary">
                                {`${subscription.proposalsLeft} proposals left`}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                {`${subscription.templatesLeft} templates`}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" color="textPrimary">
                                {`${subscription.invitesLeft} invites left`}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                {`${subscription.adsLeft} ads left`}
                            </Typography>
                        </div>
                        <div>
                            {subscription.hasAnalytics && (
                                <Typography variant="body2" color="textPrimary">
                                    Analytics dashboard
                                </Typography>
                                )}
                            {subscription.hasEmailAlerts && (
                                <Typography variant="body2" color="textPrimary">
                                    Email alerts
                                </Typography>
                            )}
                        </div>
                    </StyledDetailsBox>
                </Paper>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button size="small" color="secondary" variant="contained">
                        Upgrade plan
                    </Button>
                </Box>
                <Box mt={2}>
                    <Typography variant="body2" color="textSecondary">
                        The refunds don&apos;t work once you have the subscription, but you can always{' '}
                        <Link color="secondary" component={RouterLink} to="#">
                            Cancel your subscription
                        </Link>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Subscription