import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar'
import Spinner from '@components/Spinner';
import { AuthProvider } from '@contexts/AuthContext';
import Codespaces from '@pages/Codespaces';
import Editor from '@pages/Editor';
import Home from '@pages/Home'
import Projects from '@pages/Projects';
import SettingsPage from '@pages/Settings';
import { RootState } from '@redux/reducers';
import { setIsSidebarHidden } from '@redux/reducers/sideBarReducer';
import { ToastService } from '@utils/toastService';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const isSidebarHidden = useSelector((state: RootState) => state.sideBar.isSidebarHidden);

  const dispatch = useDispatch(); // Get dispatch function

  // Function to hide or show the sidebar
  const handleSetSidebarHidden = (hidden: boolean) => {
    dispatch(setIsSidebarHidden(hidden)); // Dispatch the action to hide/show the sidebar
  };

  useEffect(() => {
    handleSetSidebarHidden(true);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {/* {!isAuthenticated && <Navbar />} */}
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Home setIsSidebarHidden={handleSetSidebarHidden} />} />
            <Route path="/editor" element={<Editor setIsSidebarHidden={handleSetSidebarHidden} />} />
            <Route
              path="/projects"
              element={<Projects setIsSidebarHidden={handleSetSidebarHidden} />} // Pass the function as a prop
            />
            <Route
              path="/projects/:projectId/codespaces"
              element={<Codespaces setIsSidebarHidden={handleSetSidebarHidden} />} // Pass the function as a prop
            />
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
