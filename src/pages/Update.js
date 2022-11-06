import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [sdate, setSDate] = useState('')
  const [edate, setEDate] = useState('')
  const [done, setDone] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    
    const { error } = await supabase
      .from('challenges')
      .update({ title, method, rating, sdate,edate, done })
      .eq('id', id)

    if (error) {
      setFormError('Please fill in all the fields correctly.')
    }
    else {
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        setSDate(data.sdate)
        setEDate(data.edate)
        setDone(data.done)
      }
    }
    fetchTasks()
  }, [id, navigate])

  return (
    <div className="page create">
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
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
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
          id="edate"
          value={edate}
          onChange={(e) => setEDate(e.target.value)}
        />

        <button>Update Challenge</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update
