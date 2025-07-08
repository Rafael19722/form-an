import React from "react"
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {AuthProvider} from "./context/AuthContext";
import App from './App.jsx'
import Home from './pages/Home.jsx'
import CreateForm from './pages/CreateForm.jsx'
import ViewForm from './pages/ViewForm.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PrivateRoute from "./routes/PrivateRoute"
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/create" element={<PrivateRoute><CreateForm /></PrivateRoute>} />
        <Route path="/form/:id" element={<ViewForm />} />
        <Route path="/dashboard" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
