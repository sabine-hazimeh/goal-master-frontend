import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import About from './pages/About';
import FaceRecognition from './pages/FaceRecognition';
import JournalsForm from './pages/JournalsForm';
import Journals from './pages/Journals';
import Consultants from './pages/Consultants';
import Chat from './pages/Chat';
import Users from './pages/Users';
import ConsultantsForm from './pages/ConsultantsForm';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/face-recognition' element={<FaceRecognition/>}/>
      <Route path='/journal-form' element={<JournalsForm/>}/>
      <Route path='/journals' element={<Journals/>}/>
      <Route path='/consultants' element={<Consultants/>}/>
      <Route path="/chat/:chatId" element={<Chat />} />
      <Route path='/users' element={<Users/>}/>
      <Route path='/consultants-form' element={<ConsultantsForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
