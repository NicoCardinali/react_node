import React, { useContext, useState, useEffect, useRef } from 'react'
import { UserContext } from '../context/UserContext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import UserForm from '../components/UserForm'

const UsersList = () => {
  const { users, deleteUser, createUser, updateUser, setUserToEdit } = useContext(UserContext)
  const [editingUser, setEditingUser] = useState(null)
  const toast = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (editingUser === null) {
      setUserToEdit(null)
    }
  }, [editingUser, setUserToEdit])

  const handleEditClick = (user) => {
    setEditingUser(user)
    setUserToEdit(user.id)
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
    setUserToEdit(null)
  }

  const handleSubmit = (values) => {
    if (editingUser) {
      updateUser(editingUser.id, values)
      toast.current.show({ severity: 'success', summary: 'Usuario actualizado', detail: `${values.nombre} actualizado` })
      setEditingUser(null)
    } else {
      createUser(values)
      toast.current.show({ severity: 'success', summary: 'Usuario creado', detail: `${values.nombre} creado` })
    }
  }

  const actionBodyTemplate = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info p-mr-2" onClick={() => handleEditClick(rowData)} tooltip="Editar" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" onClick={() => {
        deleteUser(rowData.id)
        toast.current.show({ severity: 'warn', summary: 'Usuario eliminado', detail: `${rowData.nombre} eliminado` })
      }} tooltip="Eliminar" />
    </>
  )

    const exportPDF = () => {
      const doc = new jsPDF()
      doc.text('Listado de Usuarios', 14, 20)
    
      const tableColumn = ['Nombre', 'Email', 'Edad']
      const tableRows = []
    
      users.forEach(user => {
        const userData = [
          user.nombre,
          user.email,
          user.edad.toString()
        ]
        tableRows.push(userData)
      })
    
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      })
    
      doc.save('usuarios.pdf')
    }

  return (
    <Card title="Gestión de Usuarios" className="p-mb-4">

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')}>Inicio</button>
        <button onClick={() => navigate('/productos')}>Productos</button>
                <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-help" onClick={exportPDF} />
        
      </div>

      <Toast ref={toast} />
      <UserForm onSubmit={handleSubmit} initialValues={editingUser || { nombre: '', email: '', edad: null }} isEditing={!!editingUser} onCancel={handleCancelEdit} />
      <DataTable
        value={users}
        paginator
        rows={5}
        emptyMessage="No hay usuarios para mostrar"
        className="p-datatable-gridlines"
        stripedRows
      >
        <Column field="id" header="ID" sortable style={{ width: '5rem' }}></Column>
        <Column field="nombre" header="Nombre" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="edad" header="Edad" sortable style={{ width: '5rem' }}></Column>
        <Column body={actionBodyTemplate} header="Acciones" style={{ width: '8rem' }}></Column>
      </DataTable>
    </Card>
  )
}

export default UsersList
