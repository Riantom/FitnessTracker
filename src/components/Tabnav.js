import React, { useEffect, useState } from 'react';
import TaskCard from "./TaskCard"
import supabase from '../config/supabaseClient'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Tabnav() {
  const [key, setKey] = useState('active');
  const [fetchError, setFetchError] = useState(null)
  const [atasks, setActiveTasks] = useState(null)
  const [dtasks, setDoneTasks] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setActiveTasks(prevTasks => {
      return prevTasks.filter(ts => ts.id !== id)
    })
  }
  const handleDone = (id) => {
    setDoneTasks(prevTasks => {
      return prevTasks.filter(ts => ts.id !== id)
    })
  }
   useEffect(() => {
    const fetchActiveTasks = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select()
        .eq('done',false)
        .order(orderBy, {ascending: false})
      
      if (error) {
        setFetchError('Could not fetch the active challenges')
        setActiveTasks(null)
      }
      if (data) {
        setActiveTasks(data)
        setFetchError(null)
      }
    }
    const fetchDoneTasks = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select()
        .eq('done',true)
        .order(orderBy, {ascending: false})
      
      if (error) {
        setFetchError('Could not fetch the done challenges')
        setDoneTasks(null)
      }
      if (data) {
        setDoneTasks(data)
        setFetchError(null)
      }
    }

    fetchActiveTasks()
    fetchDoneTasks()
    console.log(atasks)
  },[orderBy])


  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="active" title="Ongoing Challenges">
        {fetchError && (<p>{fetchError}</p>)}
        <div className="page home">
      {atasks &&(
        <div className="smoothies">
          <div className="smoothie-grid">
            {atasks.length<1 && (
              <p>No Upcoming Challenges.</p>
            )}
            {atasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
       </div>
       <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
      </Tab>
      <Tab eventKey="done" title="Completed Challenges">
        {fetchError && (<p>{fetchError}</p>)}
           <div className="page home">
      {dtasks &&(
        <div className="smoothies">
          <div className="smoothie-grid"> 
            {dtasks.length<1 && (
              <p>Let's do some more challenges!!</p>
            )}
            {dtasks&&(dtasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onDone={handleDone} />
            )))}
          </div>
       </div>
            )}
        </div>
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
      </Tab>
    </Tabs>
  );
}

export default Tabnav;