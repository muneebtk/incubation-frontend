import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext';
import {useContext} from 'react'
import AuthContext from './context/AuthContext';

function App() {
  return (
    <div >
      <Router>
        <AuthProvider>
        <Header/>
          <Routes>
            <Route element={<HomePage/>} exact path='/' />
            <Route element={<LoginPage/>} path='/login' />
          </Routes>
        </AuthProvider>
     </Router>
    </div>
  );
}

export default App;
