import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BarberCadLog from './components/Cadastro-Login-Barber.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <BarberCadLog />
  </StrictMode>,
)
