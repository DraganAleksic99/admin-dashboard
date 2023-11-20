import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import Page from '../components/pages'

const About = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)')
  return (
    <Page title="About">
      <Container>
        <Box
          height={mobileDevice ? '50vh' : '80vh'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={mobileDevice ? 'h4' : 'h1'}>About us</Typography>
        </Box>
      </Container>
    </Page>
  )
}

export default About
