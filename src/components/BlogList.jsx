import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as blogReducer from '../reducers/blogReducer'
import Blog from './Blog'
import BlogDetails from './BlogDetails'

const BlogList = ({ blogs, deleteOwnBlog, addOneLike, isBlogAdder }) => {
  const [focusedBlog, setFocusedBlog] = useState(null)
  const { id } = useParams()

  const isFocused = (blog) => focusedBlog ? blog.id === focusedBlog.id : false
  if (!blogs) {
    return null
  }
  const blogToDisplay = blogs.find((blog) => blog.id === id)

  if (blogToDisplay) {
    return (
      <div>
        <BlogDetails
          key={blogToDisplay.id}
          blog={blogToDisplay}
          deleteOwnBlog={deleteOwnBlog}
          addOneLike={addOneLike}
          isBlogAdder={isBlogAdder}
        />
      </div>
    )
  }

  return (
    <div>
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteOwnBlog={deleteOwnBlog}
            addOneLike={addOneLike}
            isBlogAdder={isBlogAdder}
            toggleBlogListFocus={(blogToFocus) => setFocusedBlog(blogToFocus)}
            isFocused={isFocused(blog)}
          />
        ))}
    </div>
  )
}

const sortBlogs = (blogsList) => {
  // works but for elements with equal likes, get a different order each time
  //  return blogsList.sort((a, b) => a.likes - b.likes).reverse()
  // for elements with equal likes, order on titles to be consistent: "en" /undefined lang
  return blogsList.sort((a, b) =>
    a.likes === b.likes
      ? a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      : b.likes - a.likes
  )
}

const mapStateToProps = (state) => {
  return {
    //  to avoid changing state with sorting, need deep copy value in new array arr.slice or [...arr]
    blogs: sortBlogs([...state.blogs]),
    user: state.loggedUser
    //   const isBlogAdder = (blog) => blog.user.username === user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // can include several dispatch in mapDispatchToProps or if same in different components directly in reducer:
    addOneLike: (blogToUpdate) => dispatch(blogReducer.addOneLike(blogToUpdate)),
    deleteOwnBlog: (blogToRemove) => {
      const confirmation = window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author} ? `
      )
      if (confirmation) {
        dispatch(blogReducer.deleteBlog(blogToRemove))
      }
    },
    isBlogAdder: (blog, user) => blog.user.username === user.username
  }
}

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  // console.log(propsFromState, propsFromDispatch, ownProps)

  //  ...ownProps at the end to get props value if passed and not redux
  return {
    ...propsFromState, ...propsFromDispatch,
    isBlogAdder: (blog) => propsFromDispatch.isBlogAdder(blog, propsFromState.user),
    ...ownProps
  }

}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BlogList)

export default ConnectedBlogList
