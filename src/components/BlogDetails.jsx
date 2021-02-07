import React, { useState } from 'react'
import { Typography, Button, Link, Grid, TextField, List, ListItem } from '@material-ui/core'
import { Link as RLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { addAComment } from '../reducers/blogReducer'


const BlogCore = ({
  blog,
  addOneLike,
  isBlogAdder,
  deleteOwnBlog,
  toggleBlogListFocus,
  isFocused,
}) => {
  const dispatch = useDispatch()
  const commentInput = useField('text')
  const blogStyle = {
    // paddingTop: 10,
    // paddingLeft: 2,
    // border: 'solid',
    // borderWidth: 1,
    // marginBottom: 5,
  }
  const detailsStyle = {}

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentInput.field.value !== "") {
      dispatch(addAComment(blog, commentInput.field.value))
      commentInput.handlers.reset()
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <Typography className="blogTitle" variant="h3">{blog.title} </Typography>
      <Typography variant="subtitle1">{blog.author}  </Typography>


      <div className="blogDetails" style={detailsStyle}>
        <Link className="blogURL" target="_blank" href={blog.url} >{blog.url}</Link>
        <div className="blogLikes">
          {blog.likes} likes
          <Button variant="contained" size="small" style={{ marginLeft: 8 }} color="primary" onClick={() => addOneLike(blog)}>like</Button>
        </div>

        <div>added by <Link variant="button" component={RLink} to={`/users/${blog.user.id}`}>{blog.user.name}</Link></div>
        {isBlogAdder(blog) && (
          <div>
            <Button variant="outlined" size="small" color="secondary" data-testid="delete button" onClick={() => deleteOwnBlog(blog)}>
              remove
            </Button>
          </div>
        )}
      </div>
      <div>
        <Typography variant="h6">comments</Typography>
        <form onSubmit={handleCommentSubmit}>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <TextField
                label="add a comment"
                variant="outlined"
                required
                name="commentInput"
                size="small"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...commentInput.field}
                fullWidth
                data-testid="username-input"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Button variant="contained" size="small" color="primary" type="submit">like</Button>
            </Grid>
          </Grid>
        </form>
        <List>
          {blog.comments?.map(comment => <ListItem key={comment}>{comment}</ListItem>)}
        </List>
      </div>
    </div>
  )
}


//  if doesn't want a Blog in a list or if doesn't want to collapse other Blogs when click on a new one + testing
const BlogFallbackToggle = ({
  blog,
  addOneLike,
  isBlogAdder,
  deleteOwnBlog,
}) => {
  const [focusedBlog, setFocusedBlog] = useState(null)
  const isFocused = (blogCore) => focusedBlog ? blogCore.id === focusedBlog.id : false

  return (
    <BlogCore
      key={blog.id}
      blog={blog}
      deleteOwnBlog={deleteOwnBlog}
      addOneLike={addOneLike}
      isBlogAdder={isBlogAdder}
      toggleBlogListFocus={(blogToFocus) => setFocusedBlog(blogToFocus)}
      isFocused={isFocused(blog)}
    />
  )
}

export default function BlogDetails(props) {
  if (props.toggleBlogListFocus === undefined || props.isFocused === undefined) {
    if (props.blog === undefined) {
      return ''
    }
    return BlogFallbackToggle(props)
  }

  return BlogCore(props)
}
