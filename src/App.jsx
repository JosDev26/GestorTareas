import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login/Login';
import { TodoList } from './components/TodoList/TodoList';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TodoList />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="bottom-right" />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;