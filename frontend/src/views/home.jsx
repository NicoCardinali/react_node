import React from 'react'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Bienvenido al Panel de Gestión</h1>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Button label="Productos" onClick={() => navigate('/productos')} />
        <Button label="Usuarios" onClick={() => navigate('/usuarios')} />
      </div>
    </div>
  )
}

export default Home
