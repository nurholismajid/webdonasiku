import React, { useImperativeHandle } from 'react';
import './navbar.css';
import swal from 'sweetalert';
import {Redirect, Link } from 'react-router-dom';


function Navbar(){

    
    return(
      <footer className="footer-classic-dark bg-extra-dark-gray ">
      <div className="footer-widget-area ">
          <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="logo-footer">
                    <img src={sessionStorage.getItem('logoweb')} />
                  </div>
                  <p className="description-footer">
                  {sessionStorage.getItem('deskripsiweb')}
                   </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <h1 className="title footer">Hubngi Kami</h1>
                  <div className="drive"></div>
                  <p className="description-footer">
                  {sessionStorage.getItem('addressweb')} 
                  </p>
                  <p className="description-footer">
                    <b>Email</b> : {sessionStorage.getItem('emailweb')} 
                  </p>
                  <p className="description-footer">
                    <b>Ponsel</b> : {sessionStorage.getItem('phoneweb')} 
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                <h1 className="title footer">Menu</h1>
                  <div className="drive"></div>
                <ul className="menu-footer">
                <li className="nav-item">
        <Link className="nav-link" to="/beranda">Beranda</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/tentangkami">Tentang Kami</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/penerimadonasi">Penerima Donasi</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/artikel">Artikel</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dokumentasi">Dokumentasi</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/hubungikami">Hubungi Kami</Link>
      </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                <h1 className="title footer">Media Sosial</h1>
                  <div className="drive"></div>
                <ul className="sosmed-footer">
                  <li className="nav-item">
                    <a target="_blank" className="nav-link" href={sessionStorage.getItem('facebook')}><i className="icon-facebook"></i> Facebook</a>
                  </li>
                  <li className="nav-item">
                    <a target="_blank" className="nav-link" href={sessionStorage.getItem('instagram')}><i className="icon-instagram"></i> Instagram</a>
                  </li>
                  <li className="nav-item">
                    <a target="_blank" className="nav-link" href={sessionStorage.getItem('youtube')}><i className="icon-youtube-play"></i> Youtube</a>
                  </li>
                </ul>
                </div>
              </div>
          </div>

      </div>
  </footer>
    )
}

export default Navbar;