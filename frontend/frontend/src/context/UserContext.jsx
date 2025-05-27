import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/usuarios')
      setUsers(res.data.data)
    } catch (error) {
      console.error('Error al cargar usuarios', error)
    }
  }

  const createUser = async (user) => {
    try {
      const res = await axios.post('http://localhost:3000/usuarios', user)
      setUsers([...users, res.data.data])
    } catch (error) {
      console.error('Error al crear usuario', error)
    }
  }

  const updateUser = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:3000/usuarios/${id}`, updatedData)
      if (res.data.status === 201) {
        setUsers(prevUsers =>
          prevUsers.map(u => (u.id === id ? res.data.data : u))
        )
      }
    } catch (error) {
      console.error('Error actualizando usuario:', error)
    }
  }

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/usuarios/${id}`)
      if (res.data.status === 201) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== id))
      }
    } catch (error) {
      console.error('Error eliminando usuario:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <UserContext.Provider value={{
      users,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      userToEdit,
      setUserToEdit
    }}>
      {children}
    </UserContext.Provider>
  )
}
