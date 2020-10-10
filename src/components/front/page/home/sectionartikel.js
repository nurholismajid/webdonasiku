import React from 'react';
import Slider from "react-slick";

import {Redirect, Link } from 'react-router-dom';
    const sliderartikel = ({penerimas}) =>{
       const styleprofile ={background:"url(http://placehold.it/350x300?text=1)",}
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
          var artikels = {
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1
          };
        return (
            <section className="wow fadeIn bg-light-gray subartikel animated">            
            <div className="container">
            <h1 className="big-title">Artikel</h1>
            <Slider {...artikels}>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <div className="row">
            <div className="col col-lg-6"><h4>NUrholis Majid</h4></div>
            <div className="col col-lg-6"><p style={{textAlign:"right",paddingTop:"10px"}}>12-12-2020</p></div>
          </div>
          <p>Loream ipsum</p>
      </div>
    </div>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <div className="row">
            <div className="col col-lg-6"><h4>NUrholis Majid</h4></div>
            <div className="col col-lg-6"><p style={{textAlign:"right",paddingTop:"10px"}}>12-12-2020</p></div>
          </div>
          <p>Loream ipsum</p>
      </div>
    </div>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <div className="row">
            <div className="col col-lg-6"><h4>NUrholis Majid</h4></div>
            <div className="col col-lg-6"><p style={{textAlign:"right",paddingTop:"10px"}}>12-12-2020</p></div>
          </div>
          <p>Loream ipsum</p>
      </div>
    </div>
    
    
    
    </Slider>

    <center><Link to="/penerimadonasi" className="btn btn-primary">Selengkapnya</Link></center>

            </div>

            </section>
        );
    }
    

export default sliderartikel;

