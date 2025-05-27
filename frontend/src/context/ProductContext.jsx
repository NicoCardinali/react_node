import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([])

  const [productToEdit, setProductToEdit] = useState(null)


  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/productos')
      setProducts(res.data.data)
    } catch (error) {
      console.error('Error al cargar productos', error)
    }
  }

  const createProduct = async (product) => {
    try {
      const res = await axios.post('http://localhost:3000/productos', product)
      setProducts([...products, res.data.data])
    } catch (error) {
      console.error('Error al crear producto', error)
    }
  }

  const updateProduct = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:3000/productos/${id}`, updatedData)
      if (res.data.status === 201) {
        setProducts(prevProducts => 
          prevProducts.map(prod => (prod.id === id ? res.data.data : prod))
        )
      }
    } catch (error) {
      console.error('Error actualizando producto:', error)
    }
  }
  
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/productos/${id}`)
      if (res.data.status === 201) {
        setProducts(prevProducts => prevProducts.filter(prod => prod.id !== id))
      }
    } catch (error) {
      console.error('Error eliminando producto:', error)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ products, fetchProducts, createProduct, updateProduct, deleteProduct, productToEdit, setProductToEdit }}>
{children}
    </ProductContext.Provider>
  )
}
