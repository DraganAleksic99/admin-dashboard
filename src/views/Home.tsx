import Page from '../components/pages'
import { Box, Container, Typography, useMediaQuery } from '@mui/material'

const Home = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)')
  return (
    <Page title="Home">
      <Container maxWidth={false}>
        <Box
          height={mobileDevice ? '50vh' : '80vh'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={mobileDevice ? 'h4' : 'h1'}>Welcome to Online Shop 🛍️</Typography>
        </Box>
      </Container>
    </Page>
  )
}

export default Home
