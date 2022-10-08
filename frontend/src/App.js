import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Simcards from "./pages/Simcards";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddSimcard from "./pages/AddSimcard";
import EditSimcard from "./pages/EditSimcard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/simcards" element={<Simcards />} />
          <Route path="/simcards/add" element={<AddSimcard />} />
          <Route path="/simcards/edit/:id" element={<EditSimcard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
