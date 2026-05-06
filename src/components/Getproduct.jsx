import axios from "axios"
import React,{useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Carousel from "./Carousel";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
const Getproduct =()=>{
    let navigate = useNavigate();
    const { addToCart, getItemQuantity } = useCart();
    const fixedCategories = [
      "all",
      "Fresh Fruits",
      "Vegetables",
      "Grains & Staples",
      "Dairy",
      "Meat",
      "Others"
    ];
    const getProductKey = (product) =>
      `${product?.product_name || "item"}-${product?.product_cost || 0}-${product?.product_photo || "photo"}`;
    // declare states 
    const[loading,setLoading]=useState("")
    const[products,setProducts]=useState([])
    const[error,setError]=useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [cartMessage, setCartMessage] = useState("");
    const [cartMessageKey, setCartMessageKey] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 8;
    // function to get products 
    const getproducts = async()=>{
        setLoading("Loading fresh products for you...")
        try{
            const response= await axios.get("https://christabellhiggs.alwaysdata.net/api/getproducts")
            const categorized = response.data.map((p) => ({
              ...p,
              category: getCategory(p.product_name, p.product_description)
            }));
            setProducts(categorized)
            setLoading("")

        }catch(error){
          setError(error.message)
          setLoading("")

        }
    }
    const getCategory = (name = "", description = "") => {
      const text = `${name} ${description}`.toLowerCase();
      if (text.includes("kale") || text.includes("spinach") || text.includes("lettuce") || text.includes("cabbage") || text.includes("sukuma") || text.includes("greens") || text.includes("potato") || text.includes("sweet potato") || text.includes("yam") || text.includes("cassava") || text.includes("arrowroot") || text.includes("beetroot") || text.includes("carrot") || text.includes("onion") || text.includes("tomato")) return "Vegetables";
      if (text.includes("apple") || text.includes("banana") || text.includes("orange") || text.includes("mango") || text.includes("pineapple") || text.includes("avocado") || text.includes("watermelon") || text.includes("fruit")) return "Fresh Fruits";
      if (text.includes("beans") || text.includes("lentil") || text.includes("pea") || text.includes("rice") || text.includes("maize") || text.includes("flour") || text.includes("grain") || text.includes("cereal") || text.includes("bread") || text.includes("cake") || text.includes("donut") || text.includes("biscuit") || text.includes("cookie") || text.includes("bun") || text.includes("pastry")) return "Grains & Staples";
      if (text.includes("milk") || text.includes("yoghurt") || text.includes("yogurt") || text.includes("cheese") || text.includes("butter") || text.includes("cream")) return "Dairy";
      if (text.includes("beef") || text.includes("chicken") || text.includes("goat") || text.includes("fish") || text.includes("meat") || text.includes("mutton") || text.includes("pork")) return "Meat";
      return "Others";
    };
    // call the function 
    
    useEffect(()=>{
        getproducts()
    },[])
    const imagepath="https://christabellhiggs.alwaysdata.net/static/images/"
    const filtered = products
      .filter((p) => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p) => category === "all" ? true : p.category === category)
      .sort((a, b) => {
        if (sortBy === "cost") {
          return sortOrder === "asc" ? a.product_cost - b.product_cost : b.product_cost - a.product_cost;
        }
        return sortOrder === "asc"
          ? a.product_name.localeCompare(b.product_name)
          : b.product_name.localeCompare(a.product_name);
      });
    const totalPages = Math.ceil(filtered.length / perPage) || 1;
    const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
    const categories = fixedCategories;
    const onAddCart = (p) => {
      const explicitProduct = { ...p, cartKey: getProductKey(p) };
      addToCart(explicitProduct);
      setCartMessage(`${explicitProduct.product_name} added to cart`);
      setCartMessageKey(explicitProduct.cartKey);
      setTimeout(() => {
        setCartMessage("");
        setCartMessageKey("");
      }, 1800);
    };

    return(
        <div className="container-fluid">
            {/* carousel goes here  */}
            <Carousel/>
            <h1 className="text-light">Available Products </h1>
            <div className="row mt-2 mb-3 justify-content-center align-items-center">
              <div className="col-md-7 col-lg-6">
                <input className="form-control search-input" placeholder="Search products..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} />
              </div>
            </div>
            <div className="row mb-3 filter-row">
              <div className="col-md-12 mb-2">
                <div className="category-pills">
                  {categories.map((c) => (
                    <button
                      key={c}
                      className={`category-pill ${category === c ? "active" : ""}`}
                      onClick={() => { setCategory(c); setPage(1); }}
                      type="button"
                    >
                      <span>{c === "all" ? "All" : c}</span>
                      {c !== "all" && <span className="category-caret">▼</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <button
                    type="button"
                    className={`btn ${sortBy === "name" ? "btn-success" : "btn-outline-success"} rounded-pill px-3`}
                    onClick={() => setSortBy("name")}
                  >
                    Sort by Name
                  </button>
                  <button
                    type="button"
                    className={`btn ${sortBy === "cost" ? "btn-success" : "btn-outline-success"} rounded-pill px-3`}
                    onClick={() => setSortBy("cost")}
                  >
                    Sort by Price
                  </button>
                </div>
              </div>
              {sortBy === "cost" && (
                <div className="col-md-4 col-lg-3 mb-2 mx-auto">
                  <select className="form-select filter-dropdown" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </select>
                </div>
              )}
            </div>
            {/* bind the states  */}
            <h2 style={{ color: "#6B705C", textAlign: "center", fontSize: "1.2rem", fontStyle: "italic" }}> {loading}</h2>
            <h2 className="text-info">{error}</h2>
            {/* map here  */}
            {filtered.length === 0 ? (
              <div className="empty-category-wrap">
                <p className="empty-category-text">
                  No products found in this category.
                </p>
                <button
                  type="button"
                  className="btn empty-category-btn"
                  onClick={() => {
                    setCategory("all");
                    setSearchTerm("");
                    setPage(1);
                  }}
                >
                  Back to All Products
                </button>
              </div>
            ) : (
              <div className="row product-grid">
              {pageItems.map(singleproduct=>{
                const productKey = getProductKey(singleproduct);
                const itemQty = getItemQuantity(singleproduct);
                return (

                  <div className="col-md-3 col-sm-6 mb-4" key={productKey}>
                      <div className="card shadow h-100 product-card" style={{ backgroundColor: '#bfecac', border: 'none' }}>
                  {/* image goes here */}
                  <div className="image-wrap">
                    <img src={imagepath+singleproduct.product_photo} alt={singleproduct.product_name} className="product-image" />
                  </div>
                  <div className="card-body product-card-body">
                      <span className="category-bubble">{singleproduct.category}</span>
                      <h3 style={{ color: "#2D3E40", fontSize: "1.25rem", fontWeight: "600", textAlign: "center" }}>{singleproduct.product_name}</h3>

                      <p style={{ color: "#6B705C", fontSize: "0.9rem", flexGrow: "1", textAlign: "center" }}>{singleproduct.product_description}</p>
                      {cartMessageKey === productKey && (
                        <div className="inline-cart-msg">{cartMessage}</div>
                      )}

                      <b  style={{ color: "#BC6C25", fontSize: "1.1rem", marginBottom: "15px", display: "block", textAlign: "center" }}>Ksh {singleproduct.product_cost}</b>

                      <button
                        className="btn w-100 mb-2 animate-lime add-cart-btn"
                        onClick={()=>onAddCart(singleproduct)}
                        style={{ backgroundColor: "#d8edc9", border: "2px solid #0f3d12", color: "#0f3d12", fontWeight: "600" }}
                      >
                        Add to Cart {itemQty > 0 ? `(${itemQty})` : ""}
                      </button>
                      <button className="btn w-100" onClick={()=>navigate("/makepayment",{state:{singleproduct}})} style={{ backgroundColor: "#001d00", color: "#ffffff" }}>Purchase Now</button>
                  </div>
                      </div>
              </div>
              )})}
              </div>
            )}
            {totalPages > 1 && (
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}><button className="page-link" onClick={() => setPage(page - 1)}>Prev</button></li>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}><button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button></li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}><button className="page-link" onClick={() => setPage(page + 1)}>Next</button></li>
              </ul>
            )}
            {/* footer goes here  */}
            <Footer/>
        </div>
    )
}
export default Getproduct
 