import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { GlobalStyle } from './styles/global-styles'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import MainLayout from './layouts/main-layout'
import 'react-quill/dist/quill.snow.css'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from './store/configureStore'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <SnackbarProvider dense maxSnack={3}>
              <Helmet titleTemplate="%s - React Boilerplate" defaultTitle="React Boilerplate">
                <meta name="description" content="A React Boilerplate application" />
              </Helmet>
              <MainLayout>
                <AppRoutes />
              </MainLayout>
              <GlobalStyle />
            </SnackbarProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  )
}

export default App
