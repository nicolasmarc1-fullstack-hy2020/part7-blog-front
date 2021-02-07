import React from 'react'
import {
  Button,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import {
  Link,
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
    background: theme.bgtest,
    "&:hover": {
      opacity: "0.5"
    },


  },
  title: {
    flexGrow: 1,
    // marginRight: theme.spacing(4),
    flexDirection: "row-reverse"
  },
}))

const Header = ({ pagesPaths, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {pagesPaths.map((path) => (
            <Button
              key={path.url}
              color="inherit"
              component={Link}
              to={path.url}
            >
              <Typography variant="h6" className={classes.title}>
                {path.name}
              </Typography>
            </Button>
          ))

          }
        </Toolbar>
        {children}
      </AppBar>
    </div>
  )
}
export default Header
