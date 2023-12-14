import { Link as RouterLink } from 'react-router-dom'
import { PlusCircle as PlusCircleIcon } from 'react-feather'
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material'
import { Button, Breadcrumbs, Grid, Link, SvgIcon, Typography, styled, Box } from '@mui/material'

type Props = {
  onAddClick?: () => void
}

const StyledActionButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '& + &': {
    marginLeft: theme.spacing(1)
  }
}))

const Header = ({ onAddClick, ...rest }: Props) => {
  return (
    <Grid container justifyContent="space-between" spacing={3} mb={3} {...rest}>
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style={{ paddingBottom: '18px' }}
        >
          <Link variant="body1" color="inherit" to="/dashboard" component={RouterLink}>
            Dashboard
          </Link>
          <Box>
            <Typography variant="body1" color="inherit">
              Calendar
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          Here's what you planned
        </Typography>
      </Grid>
      <Grid item>
        <StyledActionButton
          color="primary"
          variant="contained"
          onClick={onAddClick}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Event
        </StyledActionButton>
      </Grid>
    </Grid>
  )
}

export default Header
