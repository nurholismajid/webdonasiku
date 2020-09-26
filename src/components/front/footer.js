import React, { Component } from 'react';
import './navbar.css';
import swal from 'sweetalert';
import {Redirect, Link } from 'react-router-dom';
import {connect} from 'react-redux';


class Footer extends Component  {

  constructor(props) {
    super(props);
  
  }

  render(){
    return(
      <footer className="footer-classic-dark bg-extra-dark-gray ">
      <div className="footer-widget-area ">
          <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="logo-footer">
                    <img src={this.props.option.logoweb} />
                  </div>
                  <p className="description-footer">
                  {this.props.option.descriptionweb}
                   </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <h1 className="title footer">Hubngi Kami</h1>
                  <div className="drive"></div>
                  <p className="description-footer">
                  {this.props.option.addressweb} 
                  </p>
                  <p className="description-footer">
                    <b>Email</b> : {this.props.option.emailweb} 
                  </p>
                  <p className="description-footer">
                    <b>Ponsel</b> : {this.props.option.phoneweb} 
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
                    <a target="_blank" className="nav-link" href={this.props.option.facebook}><i className="icon-facebook"></i> Facebook</a>
                  </li>
                  <li className="nav-item">
                    <a target="_blank" className="nav-link" href={this.props.option.instagram}><i className="icon-instagram"></i> Instagram</a>
                  </li>
                  <li className="nav-item">
                    <a target="_blank" className="nav-link" href={this.props.option.youtube}><i className="icon-youtube-play"></i> Youtube</a>
                  </li>
                </ul>
                </div>
              </div>
          </div>

      </div>
  </footer>
    )
  }
}

const mapStatetoprops=(state)=>{
  return{
    option:state.dataoption
  }
}

export default connect(mapStatetoprops)(Footer);