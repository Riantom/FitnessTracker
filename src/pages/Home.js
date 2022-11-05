import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import TaskCard from '../components/TaskCard'


const Home = () => {
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
    setActiveTasks(prevTasks => {
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
  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {atasks && ( dtasks &&(
        <div className="smoothies">
          
          <div className="smoothie-grid">
            <p>Upcoming Challenges:</p>
            {atasks.length<1 && (
              <p>No Upcoming Challenges</p>
            )}
            {atasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
            
          </div>
          <div className="smoothie-grid"> 
              <p>Completed Challenges:</p>
            {dtasks.length<1 && (
              <p>Let's do some challenges!!</p>
            )}
            {dtasks.map(task => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onDone={handleDone} />
            ))}
          </div>
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
