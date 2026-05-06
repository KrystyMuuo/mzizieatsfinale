import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout, message } = useAuth();
  return (
    <section className="row">
            <div className="col-md-12">
                {/* <!-- a nav with navbar content  --> */}
                <nav className="navbar navbar-expand-md navbar-improved">
                    <Link to="/" className="navbar-brand text-light brand-spaced" >
                      Mzizi Eats
                    </Link>
                    <button className="navbar-toggler" data-bs-target="#navbarcollapse" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <!-- division containing the links  --> */}
                    <div className="collapse navbar-collapse justify-content-between" id="navbarcollapse">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link text-light">Home</Link>
                            <Link to="/addproduct" className="nav-link text-light">Add Product</Link>
                            <Link to="/cart" className="nav-link text-light">🛒 My Cart</Link>
                        </div>
                        <div className="navbar-nav">
                            {!isAuthenticated ? (
                              <div className="top-auth-group">
                                <Link to="/signin" className="nav-link top-auth-link">Sign in</Link>
                                <Link to="/signup" className="nav-link top-auth-link">Sign Up</Link>
                              </div>
                            ) : (
                              <>
                                <span className="nav-link text-light">Welcome {user?.username}</span>
                                <button className="btn nav-link text-light" onClick={logout}>Logout</button>
                              </>
                            )}
                        </div>
                    </div>
                </nav>
                {message && <div className="welcome-message">{message}</div>}
            </div>
        </section>
  )
}

export default Navbar