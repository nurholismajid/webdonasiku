import React from 'react';
import Slider from "react-slick";

import {Redirect, Link } from 'react-router-dom';
    const sliderpenerima = ({penerimas}) =>{
       const styleprofile ={background:"url(http://placehold.it/350x300?text=1)",}
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
          };
          
        return (
            <section className="wow fadeIn bg-light-gray subartikel animated">
            <div className="container">
            <h1 className="big-title">Yang harus kita dibantu</h1>
            <Slider {...settings}>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <h4>NUrholis Majid</h4>
          <p>Loream ipsum</p>
          <div>
            <p>
                <strong>Donasi</strong>
                <span className="pull-right text-muted">40%</span>
            </p>
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                    <span className="sr-only">40%</span>
                </div>
            </div>
          </div>
      </div>
    </div>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <h4>NUrholis Majid</h4>
          <p>Loream ipsum</p>
          <div>
            <p>
                <strong>Donasi</strong>
                <span className="pull-right text-muted">40%</span>
            </p>
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                    <span className="sr-only">40%</span>
                </div>
            </div>
          </div>
      </div>
    </div>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <h4>NUrholis Majid</h4>
          <p>Loream ipsum</p>
          <div>
            <p>
                <strong>Donasi</strong>
                <span className="pull-right text-muted">40%</span>
            </p>
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                    <span className="sr-only">40%</span>
                </div>
            </div>
          </div>
      </div>
    </div>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}></div>
      <div className="text-box">
          <h4>NUrholis Majid</h4>
          <p>Loream ipsum</p>
          <div>
            <p>
                <strong>Donasi</strong>
                <span className="pull-right text-muted">40%</span>
            </p>
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                    <span className="sr-only">40%</span>
                </div>
            </div>
          </div>
      </div>
    </div>
    
    </Slider>

    <center><Link to="/penerimadonasi" className="btn btn-primary">Selengkapnya</Link></center>

            </div>
            </section>
        );
    }
    

export default sliderpenerima;

