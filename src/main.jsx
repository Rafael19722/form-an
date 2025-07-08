import React from "react"
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import CreateForm from './pages/CreateForm.jsx'
import ViewForm from './pages/ViewForm.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
        <Route path="/dashboard" element={<AdminPanel />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
