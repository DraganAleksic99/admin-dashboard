import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
 Avatar,
 Box,
 Button,
 Card,
 CardActions,
 CardContent,
 Link,
 Typography,
 styled
} from '@mui/material'
import { UserType } from '../../../../models/user-type'

const StyledTypography = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(1)
}))

const StyledAvatar = styled(Avatar)({
    height: 100,
    width: 100
})

type Props = {
    user: UserType
}

const ProfileDetails = ({user, ...rest}: Props) => {
    return (
        <Card {...rest}>
            <CardContent>
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    textAlign="center"
                >
                    <StyledAvatar src={user?.avatar} />
                    <StyledTypography
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                    >
                    {user?.name}
                    </StyledTypography>
                    <Typography color="textPrimary" variant="body1">
                        Your tier:{' '}
                        <Link component={RouterLink} to="/pricing">
                            {user?.tier}
                        </Link>
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="text">
                    Remove picture
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProfileDetails