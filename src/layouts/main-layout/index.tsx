import React, { ReactNode } from 'react'
import NavigationBar from './navigation-bar'
import { styled } from '@mui/material'

const StyledRootDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}))

const StyledWrapperDiv = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64
})

const StyledContentContainerDiv = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
})

const StyledContentDiv = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
})

type Props = {
  children?: ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <StyledRootDiv>
        <StyledWrapperDiv>
          <StyledContentContainerDiv>{children}</StyledContentContainerDiv>
        </StyledWrapperDiv>
      </StyledRootDiv>
    </>
  )
}

export default MainLayout
