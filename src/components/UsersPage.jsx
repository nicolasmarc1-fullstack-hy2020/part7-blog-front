import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TableHead
} from '@material-ui/core'

const UsersPage = () => {

  const blogs = useSelector(state => state.blogs)
  const { id } = useParams()

  const users = blogs.reduce((accu, blog) => {
    const userID = blog.user.id
    if (accu[userID] === undefined) {
      // eslint-disable-next-line no-param-reassign
      accu[userID] = { blogs: [], id: userID, name: blog.user.name, username: blog.user.username }
    }
    // eslint-disable-next-line no-param-reassign
    accu[userID].blogs.push(blog)
    return accu
  }, {})

  const userToDisplay = users[id]

  if (userToDisplay?.id) {
    return (
      <div>
        <Typography variant="h6">{userToDisplay.name}</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell >added blogs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userToDisplay.blogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell> - </TableCell>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }


  return (
    <div>
      <Typography variant="h6">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell >blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(users).map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default UsersPage