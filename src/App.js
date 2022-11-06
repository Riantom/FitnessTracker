import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import  supabase  from "./config/supabaseClient";
// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'


function App() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  const handleSignOut=async ()=>{
    const { error } = await supabase.auth.signOut()
    if(!error){
      setSession(null)

    }
  }
  return (
    <>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Login /> :
    <div>
    <BrowserRouter>
    
      <nav>
        <h1>Fitness Tracker</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Challenge</Link>
        <a onClick={handleSignOut}>Sign out</a>
      </nav>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
    </div>
     }
    </div>
    </>
  );
}

export default App;
