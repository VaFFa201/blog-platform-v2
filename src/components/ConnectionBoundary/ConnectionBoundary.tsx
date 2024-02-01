import { Layout, Result } from 'antd'
import './ConnectionBoundary.css'
import { ReactNode } from 'react'

import { useNavigatorOnline } from '../../hooks/hooks.ts'

interface Props {
  children: ReactNode
}

const ConnectionBoundary: React.FC<Props> = ({ children }) => {
  const { isOnline } = useNavigatorOnline()

  console.log(isOnline)

  if (isOnline) {
    return <Layout className="main-layout">{children}</Layout>
  }
  return <Result status="warning" title="There are some problems with your internet connection." />
}

export default ConnectionBoundary
