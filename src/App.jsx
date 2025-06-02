import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: "/pastes",
      element:
      <div>
        <Navbar />
        <Pastes />
      </div>
    },
    {
      path: "/pastes/:id",
      element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    }
  ]
)

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pastes />} />
        <Route path="/pastes/:id" element={<ViewPaste />} />
      </Routes>
    </Router>
  )
}

export default App
