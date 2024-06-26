import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import ProfileDetails from './ProfileDetails'
import GeneralSettings from './GeneralSettings'
import { RootState } from '../../../../store/configureStore'

const General = () => {
  const { profile } = useSelector((state: RootState) => state.profile)

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={profile} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <GeneralSettings user={profile} />
      </Grid>
    </Grid>
  )
}

export default General
