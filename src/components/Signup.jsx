import axios from "axios"
import React,{useState} from "react"
import { Link } from "react-router-dom"
const Signup =()=>{
    // declare our states here 
    const [username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const[passwordStrength, setPasswordStrength] = useState("")
    // function to handle submit 
    const handlesubmit =async(e)=>{
        e.preventDefault()
        setLoading("Creating your account...")
        // create empty digital envelope to store user inputs 
        const formdata=new FormData()
        // append/add 
        formdata.append("username", username)
        formdata.append("email",email)
        formdata.append("password", password)
        formdata.append("phone", phone)

        try {
          const response=await axios.post("https://higgs.alwaysdata.net/api/signup",formdata)
          setSuccess(response.data.message)
          setLoading("")
        } catch (error) {
          setError(error.message)
          setLoading("")
        }
    }
    const checkPasswordStrength = (value) => {
      let score = 0;
      if (value.length >= 8) score += 1;
      if (/[A-Z]/.test(value)) score += 1;
      if (/[0-9]/.test(value)) score += 1;
      if (/[^A-Za-z0-9]/.test(value)) score += 1;
      if (score <= 1) setPasswordStrength("weak");
      else if (score <= 3) setPasswordStrength("medium");
      else setPasswordStrength("strong");
    };

    return(
        <div className="row mt-4 justify-content-center">
          <div className="col-md-6 card shadow p-4 themed-form-card">
            <h1 className="form-card-title">Sign Up 👤</h1>
             {/* bind the states  */}
             <h2 className="status-msg status-loading">{loading}</h2>
             <h2 className="status-msg status-success">{success}</h2>
             <h2 className="status-msg status-error">{error}</h2>
            <form action="" onSubmit={handlesubmit}>
              <input type="text" className="form-control" placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)}/> 
              <br />
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
              <br />
              <input type="password" className="form-control" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value); checkPasswordStrength(e.target.value)}}/>
              {passwordStrength && (
                <div className={`password-strength strength-${passwordStrength}`}></div>
              )}
              <br />
              <input type="tel" className="form-control" placeholder="Enter Phone" onChange={(e)=>setPhone(e.target.value)}/>
              <br />
              <button type="submit" className="btn btn-success w-100 action-dark-btn" >Sign Up</button>
              <p className="auth-switch-text">Already have an account? <Link to="/signin">Sign in</Link></p>
            </form>
          </div>
        </div>

        
    )
}
export default Signup