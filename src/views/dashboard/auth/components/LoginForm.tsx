import { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  CardHeader,
  Divider,
  Card,
  Alert
} from '@mui/material'
import { loginAxios } from '../../../../services/authService'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { saveClaimsAction, saveTokenAction } from '../../../../features/auth/authSlice'
import { ClaimsType } from '../../../../models/claims-type'

const LoginForm = () => {
  const key = 'token'
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const saveUserAuthDetails = (data: { user: { _id: string; email: string }; token: string }) => {
    sessionStorage.setItem(key, data.token)
    const claims: ClaimsType = jwtDecode(data.token)
    dispatch(saveTokenAction(data.token))
    dispatch(saveClaimsAction(claims))
  }

  return (
    <Formik
      initialValues={{
        email: 'demo@gmail.com',
        password: 'Pass123'
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { data } = await loginAxios(values)
          saveUserAuthDetails(data)
          formikHelpers.resetForm()
          formikHelpers.setStatus({ success: true })
          formikHelpers.setSubmitting(false)
          navigate('/dashboard')
        } catch (e: any) {
          setError(e.response.data.message)
          formikHelpers.setStatus({ success: false })
          formikHelpers.setSubmitting(false)
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Card>
          <form noValidate onSubmit={handleSubmit}>
            <CardHeader title="Login" />
            <Divider />
            <Box m={2}>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                autoFocus
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box mt={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
              {error && (
                <Box mt={3}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}
              <Box mt={2}>
                <Alert severity="info">
                  <div>
                    Use <b>demo@gmail.com</b> and password <b>Pass123!</b>
                  </div>
                </Alert>
              </Box>
            </Box>
          </form>
        </Card>
      )}
    </Formik>
  )
}

export default LoginForm
