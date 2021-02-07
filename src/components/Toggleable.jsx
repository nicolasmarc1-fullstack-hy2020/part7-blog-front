import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Fab, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'


const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenNotVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  return (
    <div>
      <div style={showWhenNotVisible}>
        <Fab aria-label="add" color="primary" onClick={toggleVisibility}><AddIcon /></Fab>
        <Typography variant="overline"> {props.buttonLabel}</Typography>

      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" size="small" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable
