import { useState } from 'react'
import { Box, Button, Container, Divider, Typography } from '@mui/material'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Page from '../../../components/pages'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Page title="Authentication" styles={{ margin: 'auto' }}>
      <Container>
        <Box
          my={5}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <Divider />
          <Typography mt={2}>or</Typography>
          <Box mt={1}>
            Go to{' '}
            {isLogin ? (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(false)}
              >
                Register Form
              </Button>
            ) : (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(true)}
              >
                Login Form
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default LoginPage
