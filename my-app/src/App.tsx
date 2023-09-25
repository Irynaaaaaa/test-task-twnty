import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const SolarModules = lazy(
  () => import('./components/SolarModules/SolarModules')
)
const SubmissionForm = lazy(
  () => import('./components/SubmissionForm/SubmissionForm')
)

const App = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SolarModules />} />
          <Route path="/submission" element={<SubmissionForm />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
