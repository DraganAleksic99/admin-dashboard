import React from 'react'
import { Box, Button, Container, Divider, Grid, Paper, Typography, styled } from '@mui/material'
import Page from '../../components/pages'

type PaperProps = {
  recommended?: 'true' | false
}

const StyledPage = styled(Page)({
  minHeight: '100%',
  height: '100%',
  paddingTop: 120,
  paddingBottom: 120
})

const StyledProductPaper = styled(Paper)<PaperProps>(({ theme, recommended }) => ({
  position: 'relative',
  padding: theme.spacing(5, 3),
  cursor: 'pointer',
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  '&:hover': {
    transform: 'scale(1.1)'
  },
  ...(recommended
    ? {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
      }
    : {})
}))

const StyledProductImg = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  position: 'absolute',
  top: -24,
  left: theme.spacing(3),
  height: 48,
  width: 48,
  fontSize: 24
}))

const StyledChooseButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white
}))

const PricingPage = () => {
  return (
    <StyledPage title="Pricing">
      <Container maxWidth="sm">
        <Typography align="center" variant="h2" color="textPrimary">
          Start Selling!
        </Typography>
        <Box mt={3}>
          <Typography align="center" variant="subtitle1" color="textSecondary">
            Welcome to the best platform for selling products
          </Typography>
        </Box>
      </Container>
      <Box mt="160px">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <StyledProductPaper elevation={1}>
                <StyledProductImg alt="Product" src="images/products/product_standard.svg" />
                <Typography component="h4" gutterBottom variant="overline" color="textSecondary">
                  Standard
                </Typography>
                <div>
                  <Typography component="span" display="inline" variant="h4" color="textPrimary">
                    $5
                  </Typography>
                  <Typography
                    component="span"
                    display="inline"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    /month
                  </Typography>
                </div>
                <Typography variant="overline" color="textSecondary">
                  Max 1 user
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography variant="body2" color="textPrimary">
                  20 proposals/month
                  <br />
                  10 templates
                  <br />
                  Analytics dashboard
                  <br />
                  Email alerts
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <StyledChooseButton variant="contained" fullWidth>
                  Choose
                </StyledChooseButton>
              </StyledProductPaper>
            </Grid>
            <Grid item md={4} xs={12}>
              <StyledProductPaper recommended="true" elevation={1}>
                <StyledProductImg
                  alt="Product"
                  src="images/products/product_premium--outlined.svg"
                />
                <Typography component="h4" gutterBottom variant="overline" color="inherit">
                  Premium
                </Typography>
                <div>
                  <Typography component="span" display="inline" variant="h4" color="inherit">
                    $29
                  </Typography>
                  <Typography component="span" display="inline" variant="subtitle2" color="inherit">
                    /month
                  </Typography>
                </div>
                <Typography variant="overline" color="inherit">
                  Max 3 user
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography variant="body2" color="inherit">
                  20 proposals/month
                  <br />
                  10 templates
                  <br />
                  Analytics dashboard
                  <br />
                  Email alerts
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <StyledChooseButton variant="contained" fullWidth>
                  Choose
                </StyledChooseButton>
              </StyledProductPaper>
            </Grid>
            <Grid item md={4} xs={12}>
              <StyledProductPaper elevation={1}>
                <StyledProductImg alt="Product" src="images/products/product_extended.svg" />
                <Typography component="h4" gutterBottom variant="overline" color="textSecondary">
                  Extended
                </Typography>
                <div>
                  <Typography component="span" display="inline" variant="h4" color="textPrimary">
                    $259
                  </Typography>
                  <Typography
                    component="span"
                    display="inline"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    /month
                  </Typography>
                </div>
                <Typography variant="overline" color="textSecondary">
                  Unlimited
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography variant="body2" color="textPrimary">
                  All from above
                  <br />
                  Unlimited 24/7 support
                  <br />
                  Personalised Page
                  <br />
                  Advertise your profile
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <StyledChooseButton variant="contained" fullWidth>
                  Choose
                </StyledChooseButton>
              </StyledProductPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </StyledPage>
  )
}

export default PricingPage
