import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import MainApp from '../pages/MainApp';
import { getToken } from '../services/tokenService';

const AppRoutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log('Fetching token...');
        const token = await getToken();
        console.log('TOKEN:', token ? 'Found' : 'Not found');
        setToken(token);
        
        // Only try to login if we're not in browser environment
        if (token && typeof window !== 'undefined' && (window as any).__TAURI__) {
          const { login } = await import('../../app/structures/client');
          login(token);
        }
      } catch (err) {
        console.error('Error in AppRoutes:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>Loading...</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );

  if (token && location.pathname === '/auth') {
    return <Navigate to="/" replace />;
  }

  if (!token && location.pathname !== '/auth') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<MainApp />} />
    </Routes>
  );
};

export default AppRoutes;
