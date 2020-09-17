import React, { useImperativeHandle } from 'react';
import './navbar.css';
import swal from 'sweetalert';
import {Redirect, Link } from 'react-router-dom';


function Navbar(){

    
    return(
        <div id="top">
        <title>{sessionStorage.getItem('nameweb')}</title>

        <nav className="navbar navbar-inverse navbar-fixed-top " >
        <button id="menu-toggle" data-tooltip="tooltip" className="accordion-toggle btn btn-primary btn-sm visible-xs" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" >
            <i className="icon-align-justify"></i>
        </button>
        <header className="navbar-header">

            <Link to="/" className="navbar-brand">
            <img src={sessionStorage.getItem('logoweb')} alt="" /></Link>
        </header>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
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

      <li className="nav-item">
        <Link className="nav-link" to="/donatur/loginregister">Masuk / Daftar</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/donatur/profile">Profil</Link>
      </li>
    </ul>
  </div>

    </nav>
    

        </div>
    )
}

export default Navbar;