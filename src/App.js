import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth'


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Fitness Tracker</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Challenge</Link>
      </nav>
      <div>
        <Auth/>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
