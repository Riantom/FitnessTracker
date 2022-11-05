import supabase from "../config/supabaseClient"
import React from "react";
import { Link } from 'react-router-dom'

const TaskCard = ({ task, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', task.id)
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(task.id)
    }
   window.location.reload();
  }
  const handleDone = async (status) => {
    const { data, error } = await supabase
      .from('recipes')
      .update({done:status})
      .eq('id', task.id)
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
    }
   window.location.reload();
  }

  return (
    <div className="smoothie-card">
      <h3>{task.title}</h3>
      <p>{task.method}</p>
      <p>Date:{task.date}</p>
      <div className="rating">{task.rating}</div>
      <div className="buttons">
        <Link to={"/" + task.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
        {!task.done&&(<i className="material-icons" onClick={()=>handleDone(true)}>done</i>)}
        {task.done&&(<i className="material-icons" onClick={()=>handleDone(false)}>highlight_off</i>)}
      </div>
    </div>
  )
}

export default TaskCard
