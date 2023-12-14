import { ReactNode } from 'react'
import NavigationBar from './navigation-bar'
import { styled } from '@mui/material'

const StyledRootDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden'
}))

type Props = {
  children?: ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <StyledRootDiv>{children}</StyledRootDiv>
    </>
  )
}

export default MainLayout
