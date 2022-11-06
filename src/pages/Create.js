import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [sdate, setSDate] = useState('')
  const [edate, setEDate] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('challenges')
      .insert([{ title, method, rating, sdate, edate,user_id: user?.id }])

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    else{
      console.log(data)
      setFormError(null)
      navigate('/')
    }
      
    
  }

  return (
    <div className="page create">
      <style>{'body { background-color: black; }'}</style>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Challenge:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Description:</label>
        <textarea 
          id="method"
          value={method}
          placeholder="Brief description of your challenge"
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Priority:</label>
        <input 
          type="number"
          id="rating"
          placeholder="Highest priority: 1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label htmlFor="sdate">Start Date:</label>
        <input 
          type="date"
          id="sdate"
          value={sdate}
          onChange={(e) => setSDate(e.target.value)}
        />
        <label htmlFor="edate">End Date:</label>
        <input 
          type="date"
          id="wdate"
          value={edate}
          onChange={(e) => setEDate(e.target.value)}
        />

        <button>Create Challenge</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create