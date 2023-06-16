import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './components/Login';
import Details from './components/Details';
import Errror from './components/Errror';
import {Routes,Route} from "react-router-dom"
import Register from './components/Register';
import Profile from './components/Profile';
import useGAAnalytics from './hooks/useGAAnalytics';

function App() {
  return (
  <>
    <Header />
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Details />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/details' element={<Details />} />
      <Route path='*' element={<Errror />} />
    </Routes>
  </>
  );
}

export default App;
