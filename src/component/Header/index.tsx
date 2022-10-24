import * as S from './styles'

import igniteLogo from 'assets/ignite-logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <S.HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/" title="Timer" end>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.HeaderContainer>
  )
}
