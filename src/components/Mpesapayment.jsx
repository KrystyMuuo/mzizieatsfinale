import axios from "axios"
import React, { useState } from "react"
import { useLocation } from "react-router-dom"
const Mpesapayment =()=>{
    const {singleproduct, cartItems}=useLocation().state||{}
    const items = cartItems && cartItems.length ? cartItems : (singleproduct ? [{...singleproduct, quantity: 1}] : []);
    const imagepath="https://christabellhiggs.alwaysdata.net/static/images/"
    // declare your states here 
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const[phone,setPhone]=useState("")
    // function to make payment 
    const handlesubmit=async(e)=>{
        e.preventDefault()
        setLoading("Processing your payment...")
        // create empty digital envelope to store inputs 
        const formdata=new FormData()
        // append/add 
        formdata.append("phone",phone)
        const totalAmount = items.reduce((sum, item) => sum + (item.product_cost * (item.quantity || 1)), 0);
        formdata.append("amount",totalAmount)
        try{
            const response=await axios.post("https://christabellhiggs.alwaysdata.net/api/mpesa_payment", formdata)
            setSuccess(response.data.message)
            setLoading("")
        }catch(error){
            setError("Something went wrong")
            setLoading("")
        }
    }
    return(
        <div className="row justify-content-center">
            <h1  className="text-light">Make payment-Lipa na Mpesa 🏷️</h1>
            
            <div className="col-md-8 card shadow p-4 themed-form-card">
                <div className="card-body">
                    <h1 className="form-card-title">Order Summary</h1>
                    {items.map((item) => (
                      <div key={item.cartKey || item._id || item.product_name} className="d-flex align-items-center mb-2">
                        <img src={imagepath + item.product_photo} alt={item.product_name} style={{height:"70px", width:"70px", objectFit:"cover", borderRadius:"8px", marginRight:"10px"}} />
                        <div>
                          <div>{item.product_name}</div>
                          <small>Ksh {item.product_cost} x {item.quantity || 1}</small>
                        </div>
                      </div>
                    ))}
                    <b style={{ color: '#1a3c34', fontSize: '1.3rem' }}>
                      Total Ksh {items.reduce((sum, item) => sum + (item.product_cost * (item.quantity || 1)), 0)}
                    </b> <br />
                    {/* bind states */}
                    <h2 className="status-msg status-loading">{loading}</h2>
                    <h2 className="status-msg status-success">{success}</h2>
                    <h2 className="status-msg status-error">{error}</h2> 
                    <form action="" onSubmit={handlesubmit}>
                        <input type="number" className="form-control" placeholder="Enter phone 254XXXXXXXXX" onChange={(e)=>setPhone(e.target.value)} /> <br />
                        <button type="submit" className="btn btn-dark w-100 action-dark-btn">Make Payment 📱</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Mpesapayment