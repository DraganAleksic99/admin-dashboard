import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Chart from 'react-apexcharts'
import { Box, Card, CardContent, Container, Grid, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Theme } from '@mui/material/styles'
import Page from '../../components/pages'
import { getSalesAxios } from '../../services/saleService'
import { SaleType } from '../../models/sale-type'
import { RootState } from '../../store/configureStore'

declare module '@mui/material/styles' {
  interface Palette {
    type?: 'light' | 'dark'
  }
}

const StyledPage = styled(Page)({
  minHeight: '100%'
})

const getChartStyling = (theme: Theme) => ({
  chart: {
    background: theme.palette.background.paper,
    toolbar: {
      show: true
    }
  },
  colors: ['#13affe', '#fbab49'],
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: theme.palette.divider,
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  legend: {
    show: true,
    labels: {
      colors: theme.palette.text.secondary
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '40%'
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  theme: {
    mode: theme.palette.type
  },
  tooltip: {
    theme: theme.palette.type
  },
  xaxis: {
    axisBorder: {
      show: true,
      color: theme.palette.divider
    },
    axisTicks: {
      show: true,
      color: theme.palette.divider
    },
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: {
        colors: theme.palette.text.secondary
      }
    }
  },
  yaxis: {
    axisBorder: {
      show: true,
      color: theme.palette.divider
    },
    axisTicks: {
      show: true,
      color: theme.palette.divider
    },
    labels: {
      style: {
        colors: theme.palette.text.secondary
      }
    }
  }
})

const styles = {
  display: 'flex',
  flex: '1 1 auto'
}

const DashboardDefaultContent = () => {
  const [sales, setSales] = useState<SaleType[]>([])
  const { accessToken } = useSelector((state: RootState) => state.auth)
  const theme = useTheme()

  const fetchSales = useCallback(async () => {
    const { data } = await getSalesAxios(accessToken)
    setSales(data)
  }, [accessToken])

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  return (
    <StyledPage title="Dashboard" styles={styles}>
      <Container maxWidth={false}>
        <Box my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textPrimary">
                    Sales
                  </Typography>
                  <Chart
                    options={getChartStyling(theme)}
                    series={sales}
                    type="bar"
                    height={'100%'}
                  ></Chart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </StyledPage>
  )
}

export default DashboardDefaultContent
