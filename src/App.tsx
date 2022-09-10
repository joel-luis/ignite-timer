import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './themes/default'
import { GlobalStyle } from './themes/global'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
