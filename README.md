# 🛒 CRUD FullStack: Productos y Usuarios

Este es un proyecto FullStack desarrollado con **React (Vite)** en el frontend y **Node.js + Express** en el backend. El objetivo es gestionar productos y usuarios, permitiendo operaciones CRUD completas y exportación a PDF.



## 🚀 Tecnologías utilizadas

### 🧩 Frontend (React)

- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [PrimeReact](https://primereact.org/) – UI components
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) – Validaciones
- [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) – Exportación PDF
- Context API – Manejo global de estado

### ⚙️ Backend (Node.js)

- Express
- CORS

---

## 📦 Instalación y uso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/NicoCardinali/react_node.git

2️⃣ Backend (Node.js)

cd backend
npm install
npm run dev

    📌 El backend corre por defecto en http://localhost:3000

3️⃣ Frontend (React)

cd frontend
npm install
npm run dev

    📌 El frontend corre por defecto en http://localhost:5173

🧪 Funcionalidades principales
Productos

    ✅ Crear, editar, eliminar productos

    ✅ Visualizar productos en tabla

    ✅ Exportar listado a PDF (nombre y precio)

Usuarios

    ✅ Crear, editar, eliminar usuarios

    ✅ Visualizar usuarios en tabla

    ✅ Exportar listado a PDF (nombre, email y edad)

🧾 Exportación a PDF

En ambas vistas (productos y usuarios) hay un botón Exportar PDF. El archivo generado incluye una tabla con los datos requeridos.
🔗 Navegación

El proyecto tiene navegación interna:

    🏠 Inicio

    👤 Usuarios

    📦 Productos