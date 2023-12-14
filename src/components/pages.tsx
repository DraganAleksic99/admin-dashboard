import { forwardRef, HTMLProps, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

type Props = {
  children?: ReactNode
  title?: string
  styles?: {}
} & HTMLProps<HTMLDivElement>

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', styles = {}, ...rest }, ref) => {
    return (
      <div ref={ref as any} {...rest} style={styles}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    )
  }
)

export default Page
