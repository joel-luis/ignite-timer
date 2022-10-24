import { Header } from 'component/Header'
import { Outlet } from 'react-router-dom'

import * as S from './styles'

export function DefaultLayout() {
  return (
    <S.LayoutContainer>
      <Header />
      <Outlet />
    </S.LayoutContainer>
  )
}
