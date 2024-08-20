import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import About from './pages/About';
import FaceRecognition from './pages/FaceRecognition';
import JournalsForm from './pages/JournalsForm';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/face-recognition' element={<FaceRecognition/>}/>
      <Route path='/journals' element={<JournalsForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
