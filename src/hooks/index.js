import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    field: {
      type,
      value,
      onChange
    },
    handlers: {
      reset: () =>  setValue('')
    }
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  useEffect(() => {
    const fetchResource = async () => {
      const res = await axios.get(baseUrl)
      setResources(res.data)
      return res.data
    }
    fetchResource()
  }, [baseUrl])

  // }, [user / token])

  // const baseUrl = '/api/notes'
  // let token = null
  // const setToken = newToken => {
  //   token = `bearer ${newToken}`
  // }
  // const getAll = () => {
  //   const request = axios.get(baseUrl)
  //   return request.then(response => response.data)
  // }
  // ...


  const create = async (resource) => {
    // ...
    // const config = {
    //   headers: { Authorization: token },
    // }
    const res = await axios.post(baseUrl, resource)
    setResources(oldResources => [...oldResources, res.data])
    return res.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}