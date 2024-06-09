import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Dashbord from './Pages/Dashbord';
import View from './Pages/View';
import ProtectedRoute from './Config/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Config/firebase';

function App() {
  const [user, loading] = useAuthState(auth);
  

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path='/' element={!user ? <Home /> : <Navigate to="/dashboard" />} />
      <Route path='/register' element={!user ? <Home insideregister={true} /> : <Navigate to="/dashboard" />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashbord /></ProtectedRoute>} />
      <Route path="/:id/view" element={<ProtectedRoute><View /></ProtectedRoute>} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
