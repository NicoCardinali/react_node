import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  edad: Yup.number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .positive('Debe ser mayor que cero')
    .required('La edad es obligatoria'),
})

const UserForm = ({ onSubmit, initialValues = { nombre: '', email: '', edad: null }, isEditing = false, onCancel }) => {
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
    <Card title={isEditing ? 'Editar usuario' : 'Crear usuario'} style={{ maxWidth: 400, marginBottom: '2rem' }}>
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
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.email && formik.errors.email ? 'p-invalid' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="p-error">{formik.errors.email}</small>
          )}
        </div>

        <div className="p-field p-mb-3">
          <label htmlFor="edad">Edad</label>
          <InputNumber
            id="edad"
            name="edad"
            value={formik.values.edad}
            onValueChange={(e) => formik.setFieldValue('edad', e.value)}
            onBlur={formik.handleBlur}
            className={formik.touched.edad && formik.errors.edad ? 'p-invalid' : ''}
            min={0}
          />
          {formik.touched.edad && formik.errors.edad && (
            <small className="p-error">{formik.errors.edad}</small>
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

export default UserForm
