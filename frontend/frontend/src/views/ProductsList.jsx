import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import ProductForm from '../components/ProductForm'


const ProductsList = () => {
  const { products, deleteProduct, createProduct, updateProduct, setProductToEdit } = useContext(ProductContext)
  const [editingProduct, setEditingProduct] = useState(null)
  const toast = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (editingProduct === null) {
      setProductToEdit(null)
    }
  }, [editingProduct, setProductToEdit])

  const handleEditClick = (product) => {
    setEditingProduct(product)
    setProductToEdit(product.id)
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setProductToEdit(null)
  }

  const handleSubmit = (values) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, values)
      toast.current.show({ severity: 'success', summary: 'Producto actualizado', detail: `${values.nombre} actualizado` })
      setEditingProduct(null)
    } else {
      createProduct(values)
      toast.current.show({ severity: 'success', summary: 'Producto creado', detail: `${values.nombre} creado` })
    }
  }

  const actionBodyTemplate = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info p-mr-2" onClick={() => handleEditClick(rowData)} tooltip="Editar" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" onClick={() => {
        deleteProduct(rowData.id)
        toast.current.show({ severity: 'warn', summary: 'Producto eliminado', detail: `${rowData.nombre} eliminado` })
      }} tooltip="Eliminar" />
    </>
  )

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Listado de Productos', 14, 20)
  
    const tableColumn = ['Nombre', 'Precio']
    const tableRows = []
  
    products.forEach(prod => {
      const prodData = [
        prod.nombre,
        prod.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
      ]
      tableRows.push(prodData)
    })
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    })
  
    doc.save('productos.pdf')
  }

  return (
    
    <Card title="Gestión de Productos" className="p-mb-4">


      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')}>Inicio</button>
        <button onClick={() => navigate('/usuarios')}>Usuarios</button>
        <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-help" onClick={exportPDF} />
      </div>

      <Toast ref={toast} />
      <ProductForm onSubmit={handleSubmit} initialValues={editingProduct || { nombre: '', precio: '' }} isEditing={!!editingProduct} onCancel={handleCancelEdit} />

      <DataTable
        value={products}
        paginator
        rows={5}
        emptyMessage="No hay productos para mostrar"
        className="p-datatable-gridlines"
        stripedRows
      >
        <Column field="id" header="ID" sortable style={{ width: '5rem' }}></Column>
        <Column field="nombre" header="Nombre" sortable></Column>
        <Column field="precio" header="Precio" sortable body={(row) => row.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}></Column>
        <Column body={actionBodyTemplate} header="Acciones" style={{ width: '8rem' }}></Column>
      </DataTable>
    </Card>
  )
}

export default ProductsList
