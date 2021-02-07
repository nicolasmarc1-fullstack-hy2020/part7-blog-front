import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import App from './App'
import store from './store'
import './App.css'
import theme from './theme'

const customTheme = createMuiTheme({
  bgtest:
    'linear-gradient(to top right, hsl(132.12121212121212, 64.70588235294117%, 30%), hsl(178, 55%, 35%),  hsl(178, 45%, 45%), hsl(128, 45%, 45%), hsl(118, 35%, 35%),  hsl(108, 25%, 30%));',
  palette: {
    primary: {
      main: 'hsl(200,100%,38%)',
    },
  },
  ...theme
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={customTheme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
