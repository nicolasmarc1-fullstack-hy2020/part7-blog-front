/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { useField } from '../hooks'
import * as blogReducer from '../reducers/blogReducer'

const NewBlogForm = ({ addBlog, toggleVisibility }) => {
  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  const submitBlog = (event) => {

    event.preventDefault()
    addBlog({
      author: author.field.value,
      title: title.field.value,
      url: url.field.value,
    })
    author.handlers.reset()
    title.handlers.reset()
    url.handlers.reset()
    //  check if included in props or already taken care of
    if (toggleVisibility) {
      toggleVisibility()
    }

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitBlog}>
        <div>
          title
          <input
            required
            name="title"
            data-testid='title-input'
            {...title.field}
          />
        </div>
        <div>
          author
          <input
            name="author"
            data-testid='author-input'
            {...author.field}
          />
        </div>
        <div>
          url
          <input
            required
            name="url"
            data-testid='url-input'
            {...url.field}
          />
        </div>
        <Button type="submit" variant="contained" size="small" color="primary" data-testid='submit-blog-button'>Create</Button>
      </form>
    </div>
  )
}
const mapDispatchToProps = (dispatch, ownProps) => {
  // if addBlog function not passed by parent ownProps use redux connection
  // without redux, toggleVisibility managed in addBlog then check if included in props, with redux passed as props (because has ref from higher state)
  return {
    addBlog: ownProps.addBlog ? ownProps.addBlog : (blogToCreate) => dispatch(blogReducer.createBlog(blogToCreate)),
    toggleVisibility: ownProps.toggleVisibility,
  }
}

const ConnectedNewBlogForm = connect(
  null,
  mapDispatchToProps
)(NewBlogForm)


export default ConnectedNewBlogForm 