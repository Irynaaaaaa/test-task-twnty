import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SolarModules from './components/SolarModules/SolarModules'
import SubmissionForm from './components/SubmissionForm/SubmissionForm'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SolarModules />} />
        <Route path="/submission" element={<SubmissionForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
