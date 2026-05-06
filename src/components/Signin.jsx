import axios from "axios"
import React,{useState} from "react"
import { Link,useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Signin =()=>{
    let navigate = useNavigate();
    const { login } = useAuth();
    // declare states 
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    // 3 states for posting data 
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    // function to handle submit 
    const handlesubmit =async(e)=>{
        e.preventDefault()
        setLoading("Signing you in...")
        // create empty digital envelope to store user inputs 
        const formdata= new FormData ()
        // append/add 
        formdata.append("email",email)
        formdata.append("password",password)
        try{
            const response= await axios.post("https://higgs.alwaysdata.net/api/signin", formdata)
            setSuccess(response.data.message)
            setLoading("")
            // if login/signin is successful we save the user to local storage 
            // NB:  redirect user to homepage(getproducts )
            if(response.data.user){
                // login success
                login(response.data.user);
                // redirect the user to hompeage 
                navigate("/")
            } else {
                // login failed 
                setSuccess(response.data.message)
            }
        }catch(error){
            setError(error.message)
            setLoading("")
        }
    }

    return(
        <div className="row mt-4 justify-content-center">
            <div className="col-md-6 card shadow p-4 themed-form-card">
                <h1 className="form-card-title">Sign In 🔑</h1>
                {/* binding variables  */}
                <h2 className="status-msg status-loading">{loading}</h2>
                <h2 className="status-msg status-success">{success}</h2>
                <h2 className="status-msg status-error">{error}</h2> 
                <form action="" onSubmit={handlesubmit}>
                    <input type="text"  className="form-control" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/> <br /> 
                    <input type="text"  className="form-control" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/><br />
                    <button type="submit" className="btn btn-success w-100 action-dark-btn">Sign in</button>
                    <p className="auth-switch-text">New here? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
        </div>
        
    )
}
export default Signin