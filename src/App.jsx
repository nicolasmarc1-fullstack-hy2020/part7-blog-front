import React, { useEffect } from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container } from '@material-ui/core'

import * as loggedUserReducer from "./reducers/loggedUserReducer"
import * as blogReducer from "./reducers/blogReducer"
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './App.css'
import Header from './components/Header'
import UsersPage from './components/UsersPage'

const App = () => {
  const dispatch = useDispatch()
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 16,
    },
    padding: {
      gap: "16px",
      display: "flex",
      alignItems: "center",
      padding: "16px",
      '& > *': {
        margin: theme.spacing(1),
      },

    },
  }))
  const styles = useStyles()
  const user = useSelector((state) => state.loggedUser)

  useEffect(() => {
    dispatch(loggedUserReducer.retrieveUser())
    dispatch(blogReducer.initializeBlogs())
  }, [dispatch])


  const newBlogFormRef = React.createRef()


  const makePaths = (paths) => {
    return paths.reduce((acc, path) => {
      if (path[0] && path[1]) {
        acc.push({ url: path[0], name: path[1] })
      }
      return acc
    }, [])
  }

  const pagesPaths = [
    ['/', 'home'],
    [user ? '/blogs' : undefined, 'blogs'],
    [user ? '/users' : undefined, 'users'],
    [user ? undefined : '/signin', 'sign in']
  ]


  return (
    <div>
      <Header pagesPaths={makePaths(pagesPaths)}>
        {user ? <div
          className={styles.padding}
        >
          {user.name} logged in
            <Button color="secondary" size="small" variant="contained" type="button" onClick={() => dispatch(loggedUserReducer.logout())}>
            log-out
              </Button>
        </div>
          : <p className={styles.padding}>Please SignIn</p>}
      </Header>


      <Container className={styles.root}>
        <Notification />
        {user ?
          <Switch>
            <Route path="/users/:id">
              <UsersPage />
            </Route>
            <Route path="/users/">
              <UsersPage />
            </Route>
            <Route path="/blogs/:id">
              <BlogList />
            </Route>
            <Route path="/blogs/">
              <Toggleable buttonLabel="create new blog" ref={newBlogFormRef} >
                <NewBlogForm toggleVisibility={() => newBlogFormRef.current.toggleVisibility()} />
              </Toggleable>
              <BlogList />
            </Route>
            <Redirect to="/blogs" />
          </Switch>
          :
          <Switch>
            <Route path="/signin"><LoginForm /></Route>
            <Route path="/blogs/">
              <BlogList isBlogAdder={() => false} />
            </Route>
            <Redirect to="/blogs" />
          </Switch>
        }
      </Container>
    </div>
  )
}


export default App