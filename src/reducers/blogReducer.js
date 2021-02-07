import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer"

// actionTypes
export const blogActions = {
  INIT_BLOGS: 'INIT_BLOGS',
  CREATE_BLOG: 'CREATE_BLOG',
  LIKE_BLOG: 'LIKE_BLOG',
  DELETE_BLOG: 'DELETE_BLOG',
  ADD_COMMENT: 'ADD_COMMENT'
}

// Reducer
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case blogActions.INIT_BLOGS:
      return action.data
    case blogActions.CREATE_BLOG:
      return [...state, action.data]
    case blogActions.DELETE_BLOG:
      return state.filter((blog) => blog.id !== action.data.id)
    case blogActions.LIKE_BLOG: {
      const updatedBlog = action.data
      return state.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog)
    }
    case blogActions.ADD_COMMENT: {
      const updatedBlog = action.data
      return state.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog)
    }
    default:
      return state
  }
}
export default blogReducer


// Action Creators
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: blogActions.INIT_BLOGS,
      data: blogs
    })
  }
}

// can include several dispatch in mapDispatchToProps or if same in different components directly in reducer:
export const createBlog = (blogToCreate) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogToCreate)
      dispatch({
        type: blogActions.CREATE_BLOG,
        data: newBlog
      })
      dispatch(setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added `,
        type: 'notification confirmation',
      }))

    } catch (e) {
      dispatch(setNotification({
        text: `blog creation failed: ${e.response.data.error}`,
        type: "notification error",
      }))
    }
  }
}

export const addOneLike = (blogToUpdate) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogToUpdate.id, {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    })
    dispatch({
      type: blogActions.LIKE_BLOG,
      data: updatedBlog
    })
  }
}

export const addAComment = (blogToUpdate, newComment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogToUpdate.id, newComment)
    dispatch({
      type: blogActions.ADD_COMMENT,
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blogToRemove) => {
  return async (dispatch) => {
    blogService.delete(blogToRemove.id)
    dispatch({
      type: blogActions.DELETE_BLOG,
      data: blogToRemove
    })
  }
}