
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Tasks } from './components/Tasks'
import { CreateTask } from "./components/CreateTask"

function App() {


  return (
    <>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="tasks/create" element={<CreateTask />} />
      </Routes>
    </>
  )
}

export default App
