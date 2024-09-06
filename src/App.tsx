import Sidebar from '@components/Sidebar'
import Spinner from '@components/Spinner';
import { AuthProvider } from '@contexts/AuthContext';
import Home from '@pages/Home'
import { RootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {isAuthenticated && <Sidebar />}
        </div>
        {isLoading && <Spinner />}
      </Router>
    </AuthProvider>
  )
}

export default App
