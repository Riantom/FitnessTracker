import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup'
import Login from './pages/Login'


function App() {

  async function handleSignOut() {
    // @TODO: add sign out logic
  }

  return (
   /* <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>*/
    <BrowserRouter>
    
      <nav>
        <h1>Fitness Tracker</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Challenge</Link>
        <button onClick={handleSignOut}>Sign out</button>
      </nav>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
