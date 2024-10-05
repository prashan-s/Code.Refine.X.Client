import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar'
import Spinner from '@components/Spinner';
import { AuthProvider } from '@contexts/AuthContext';
import Codespaces from '@pages/Codespaces';
import Home from '@pages/Home'
import Projects from '@pages/Projects';
import SettingsPage from '@pages/Settings';
import { RootState } from '@redux/reducers';
import { ToastService } from '@utils/toastService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); // Add state to control sidebar visibility

  return (
    <AuthProvider>
      <Router>
        {!isAuthenticated && <Navbar />}
        <div style={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects setIsSidebarHidden={setIsSidebarHidden} />} />
            <Route path="/projects/:projectId/codespaces" element={<Codespaces setIsSidebarHidden={setIsSidebarHidden} />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          {isAuthenticated && !isSidebarHidden && <Sidebar />}
        </div>
        {isLoading && <Spinner />}
        <ToastService />
      </Router>
    </AuthProvider>
  )
}

export default App
