import axios from "axios"
import React,{useState} from "react"
const Addproduct =()=>{
    // declare states 
    const[product_name,setProductName]=useState("")
    const[product_description,setProductDescription]=useState("")
    const[product_cost,setProductCost]=useState("")
    const[product_photo,setProductPhoto]=useState("")
    // define 3 states for posting data 
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    //  fucntion to handle submit 
    const handlesubmit= async (e)=>{
        e.preventDefault()
        setLoading("Uploading product details...")
        // create empty digital envelpe to store inputs 
        const formdata=new FormData()
        // append/add 
        formdata.append("product_name",product_name)
        formdata.append("product_description",product_description)
        formdata.append("product_cost",product_cost)
        formdata.append("product_photo",product_photo)

        try{
            const response= await axios.post("https://christabellhiggs.alwaysdata.net/api/addproduct",formdata)
            setSuccess(response.data.message)
            setLoading("")
        } catch(error){
            setError(error.message)
            setLoading("")
        }
    }
    return(
        <div className="row justify-content-center m-2 ">
            <div className="col-md-8 card shadow p-4 themed-form-card">
                <h1 className="form-card-title">Add product 🌿</h1>
                {/* binding the states  */}
                <h2 className="status-msg status-loading animate-pulse">{loading}</h2>
                <h2 className="status-msg status-success">{success}</h2>
                <h2 className="status-msg status-error">{error}</h2>
                <form action="" onSubmit={handlesubmit} >
                    <input type="text" className="form-control" placeholder="Enter product name" onChange={(e)=>setProductName(e.target.value)}/> <br />
                    <textarea name="" id="" className="form-control" placeholder="Enter product description" onChange={(e)=>setProductDescription(e.target.value)}></textarea> <br />
                    <input type="number" className="form-control" placeholder="Enter product cost" onChange={(e)=>setProductCost(e.target.value)}/> <br />
                    <input type="file" accept="image/*" className="form-control" onChange={(e)=>setProductPhoto(e.target.files[0])} /> <br />
                    <button type="submit" className="btn btn-dark btn-lg w-100" style={{ backgroundColor: '#2d5a4e', border: '1px solid #a5d6a7' }}>Add product</button>
                </form>

            </div>

        </div>
        
    )
}
export default Addproduct
