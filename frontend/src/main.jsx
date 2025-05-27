import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'         
import 'primeicons/primeicons.css' 
import 'primeflex/primeflex.css'     

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ProductProvider } from './context/ProductContext.jsx'
import { UserProvider } from './context/UserContext.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ProductProvider>
  </StrictMode>,
)

