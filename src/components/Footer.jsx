import React from 'react'

const Footer = () => {
  return (
    <div>
         <section className="row p-4 footer-themed">
            {/* <!-- child1  --> */}
            <div className="col-md-4">
                <h2 className="text-center text-white">About Us</h2>
                <p className="text-white">Fresh groceries and home essentials in one place. Check back often for new offers.</p>
            </div>
            {/* <!-- child2  --> */}
            <div className="col-md-4">
                <h2 className="text-center text-white">Contact Us</h2>
                <form action="">
                    <input type="email" placeholder="Enter your email" className="form-control" />
                    <br /><br />
                    <textarea name="" id="" cols="30" rows="10" className="form-control"
                        placeholder="Leave a comment"></textarea>
                    <br /><br />
                    <input type="submit" value="Send Message" className="btn btn-outline-light" />
                </form>
            </div>
            {/* <!-- child3  --> */}
            <div className="col-md-4">
                <h2 className="text-white text-center">Stay connected</h2>
                <a href="https://facebook.com">
                    <img src="images/fb.png" alt="Facebook"/>
                </a>
                <a href="https://instagram.com">
                    <img src="images/in.png" alt="Instagram"/>
                </a>
                <a href="https://twitter.com">
                    <img src="images/x.png" alt="Twitter"/>
                </a>
                <p className="text-light">Reach us on these platforms and be the first to get updates.</p>

            </div>
        </section>
    </div>
  )
}

export default Footer