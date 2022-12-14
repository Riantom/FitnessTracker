import { useState } from 'react'
import  supabase  from '../config/supabaseClient'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="row">
        {/*<style>{'body { background-color: black; }'}</style>*/}
      <div className="form" >
        <h1>UnChallenged</h1>
        <br/>
        <p className="login"align="center" >Sign in via magic link with your email below</p>
         <br/>
        {loading ? (<h3 >
          Sending magic link...
        </h3>) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
