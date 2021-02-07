import React from 'react'
import { connect } from 'react-redux'


const Notification = ({ notification }) => {

  if (!notification) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.text}
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notification,
    ...ownProps
  }
}

const ConnecteNotification = connect(
  mapStateToProps,
  null
)(Notification)

export default ConnecteNotification
