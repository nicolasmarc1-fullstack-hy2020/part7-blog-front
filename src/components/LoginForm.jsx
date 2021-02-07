/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Box, Button, FormLabel, Grid, TextField, Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import * as loggedUserReducer from '../reducers/loggedUserReducer'
import { useField } from '../hooks'

const LoginForm = ({ userLogin, children }) => {
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const handleSumbit = (event) => {
    event.preventDefault()
    userLogin({
      username: username.field.value,
      password: password.field.value,
    })
    username.handlers.reset()
    password.handlers.reset()
    history.push('/blogs')
  }

  return (
    <Grid spacing={4} container >
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          Login to the application
      </Typography>
      </Grid >
      {/* <Grid item >
      </Grid> */}
      <Grid item xs={12} >
        {children}
      </Grid>
      <Grid item xs={12} >
        <form onSubmit={handleSumbit}>
          <Grid spacing={4} container xs={12}>
            <Grid item xs={12} >
              <TextField
                label="username"
                variant="outlined"
                required
                name="username"
                {...username.field}
                fullWidth
                data-testid="username-input"
              />
            </Grid>
            <Grid item xs={12} >

              <TextField
                label="password"
                variant="outlined"
                required
                name="password"
                {...password.field}
                fullWidth
                data-testid="password-input"
              />
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" fullWidth color="primary" type="submit" data-testid="login-button">Sign-in</Button>
            </Grid>
          </Grid>

        </form>
      </Grid>

    </Grid >
  )
}
LoginForm.propTypes = {
  children: PropTypes.node,
  userLogin: PropTypes.func.isRequired,
}

LoginForm.defaultProps = {
  children: ""
}


const ConnectedLoginForm = connect(
  null,
  (dispatch, ownProps) => {
    return {
      userLogin: ownProps.userLogin
        ? ownProps.userLogin
        : (credentials) => dispatch(loggedUserReducer.login(credentials))
    }
  }
)(LoginForm)

// full shorthand
// const ConnectedLoginForm = connect(
//   null,
//   {userLogin: loggedUserReducer.login}
// )(LoginForm)

export default ConnectedLoginForm 