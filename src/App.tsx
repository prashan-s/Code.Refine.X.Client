import Sidebar from '@components/Sidebar'
import Home from '@pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Sidebar />
      </div>
    </Router>
  )
}

export default App
