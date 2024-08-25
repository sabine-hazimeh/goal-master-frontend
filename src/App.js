import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import FaceRecognition from "./pages/FaceRecognition";
import JournalsForm from "./pages/JournalsForm";
import Journals from "./pages/Journals";
import Consultants from "./pages/Consultants";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import ConsultantsForm from "./pages/ConsultantsForm";
import GoalsForm from "./pages/GoalsForm";
import PrivateRoute from "./components/PrivateRoute";
import PreventBackButton from "./components/PreventBackButton";
import AdminConsultants from "./pages/AdminConsultants";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <PreventBackButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/consultants-form" element={<ConsultantsForm />} />
          <Route path="/goals-form" element={<GoalsForm />} />
          <Route path="/journal-form" element={<JournalsForm />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/users" element={<Users />} />
          <Route path="/face-recognition" element={<FaceRecognition />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-consultants" element={<AdminConsultants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
