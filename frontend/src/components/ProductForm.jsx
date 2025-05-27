import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  precio: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('El precio es obligatorio'),
})

const ProductForm = ({ onSubmit, initialValues = { nombre: '', precio: '' }, isEditing = false, onCancel }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values)
      if (!isEditing) resetForm()
    },
  })

  return (
    <Card title={isEditing ? 'Editar producto' : 'Crear producto'} style={{ maxWidth: 400, marginBottom: '2rem' }}>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="p-field p-mb-3">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.nombre && formik.errors.nombre ? 'p-invalid' : ''}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <small className="p-error">{formik.errors.nombre}</small>
          )}
        </div>

        <div className="p-field p-mb-3">
          <label htmlFor="precio">Precio</label>
          <InputNumber
            id="precio"
            name="precio"
            value={formik.values.precio}
            onValueChange={(e) => formik.setFieldValue('precio', e.value)}
            onBlur={formik.handleBlur}
            mode="currency"
            currency="ARS"
            locale="es-AR"
            className={formik.touched.precio && formik.errors.precio ? 'p-invalid' : ''}
            min={0}
          />
          {formik.touched.precio && formik.errors.precio && (
            <small className="p-error">{formik.errors.precio}</small>
          )}
        </div>

        <div className="p-d-flex p-jc-between">
          <Button type="submit" label={isEditing ? 'Actualizar' : 'Crear'} icon="pi pi-check" />
          {isEditing && (
            <Button type="button" label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={onCancel} />
          )}
        </div>
      </form>
    </Card>
  )
}

export default ProductForm
