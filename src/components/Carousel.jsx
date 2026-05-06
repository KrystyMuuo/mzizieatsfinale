import React from 'react'

const Carousel = () => {
  return (
    <section className="row">
            <div className="col-md-12">
                {/* <!-- a division containing carousel content  --> */}
                <div className="carousel slide" id="mycarousel" data-bs-ride="carousel">
                    {/* <!-- division containing images  --> */}
                    <div className="carousel-inner">
                        {/* <!-- div w image 1  --> */}
                        <div className="carousel-item">
                            <img src="images/1.png" alt="slide1" style={{ height: '500px', width:'100%'}}/>
                        </div>
                        {/* <!-- div w image 2  --> */}
                        <div className="carousel-item">
                            <img src="images/2.png" alt="slide2" style={{ height: '500px',width:'100%', objectFit: 'cover'}}/>
                        </div>
                        {/* <!-- div w image 3 --> */}
                        <div className="carousel-item ">
                            <img src="images/3.png" alt="slide3" style={{ height: '500px',width:'100%', objectFit: 'cover'}}/>
                        </div>
                        {/* <!-- div w image 4  --> */}
                        <div className="carousel-item active">
                            <img src="images/4.png" alt="slide4" style={{ height: '500px', width:'100%', objectFit: 'contain', backgroundColor: '#001d00'}}/>
                        </div>
                    </div>
                    {/* <!-- previous control  --> */}
                    <a href="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark"></span>
                    </a>
                    {/* <!-- next control  --> */}
                    <a href="#mycarousel" className="carousel-control-next" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark"></span>
                    </a>
                </div>
            </div>
        </section>
  )
}

export default Carousel