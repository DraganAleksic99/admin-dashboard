import { ReactNode } from 'react'
import { styled } from '@mui/material'
import { alpha } from '@mui/material'

type Props = {
  className?: string
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success'
  children?: ReactNode
  style?: {}
}

const Label = ({ color = 'secondary', children, style, ...rest }: Props) => {
  return (
    <StyledSpan color={color} {...rest}>
      {children}
    </StyledSpan>
  )
}

const StyledSpan = styled('span')(({ theme, color }) => {
  let colorValue, backgroundValue

  switch (color) {
    case 'primary':
      colorValue = theme.palette.primary.main
      backgroundValue = alpha(theme.palette.primary.main, 0.08)
      break
    case 'secondary':
      colorValue = theme.palette.secondary.main
      backgroundValue = alpha(theme.palette.secondary.main, 0.08)
      break
    case 'error':
      colorValue = theme.palette.error.main
      backgroundValue = alpha(theme.palette.error.main, 0.08)
      break
    case 'warning':
      colorValue = theme.palette.warning.main
      backgroundValue = alpha(theme.palette.warning.main, 0.08)
      break
    case 'success':
      colorValue = theme.palette.success.main
      backgroundValue = alpha(theme.palette.success.main, 0.08)
      break
    default:
      colorValue = 'inherit'
  }
  return {
    fontFamily: theme.typography.fontFamily,
    alignItems: 'center',
    borderRadius: 2,
    display: 'inline-flex',
    flexGrow: 0,
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    height: 20,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase',
    color: colorValue,
    backgroundColor: backgroundValue
  }
})

export default Label
