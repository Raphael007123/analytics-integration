import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Login from './components/pages/Login';
import Details from './components/pages/Details';
import Error from './components/pages/Error';
import {Routes,Route} from "react-router-dom"
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import useGAAnalytics from './hooks/useGAAnalytics';
import { SecondaryHeader } from './components/jumbotron';

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
      <Route path='*' element={<Error />} />
    </Routes>
  </>
  );
}

export default App;
