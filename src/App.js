import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import  supabase  from "./config/supabaseClient";
// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import Navi from "./components/Navi";
import 'bootstrap/dist/css/bootstrap.min.css';



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
    
  
 
  return (
    <>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Login /> :
    <div>
    <BrowserRouter>
      <Navi/>
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
