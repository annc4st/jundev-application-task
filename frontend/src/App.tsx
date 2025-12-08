
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Tasks } from './components/Tasks'
import { CreateTask } from "./components/CreateTask"
import { Navbar } from './components/Navbar'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="tasks/create" element={<CreateTask />} />
      </Routes>
    </>
  )
}

export default App
