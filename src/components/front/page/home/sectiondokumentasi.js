import React, { Component } from 'react';
import Slider from "react-slick";
import ModalVideo from 'react-modal-video';
import {Redirect, Link } from 'react-router-dom';

class sliderdokumentasi extends Component{

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }
 
  openModal (idvideo) {
    this.setState({isOpen: true,idvideo:idvideo})
  }
  
  render(){
  
        const styleprofile ={background:"url(https://images.unsplash.com/photo-1551210306-00bba9a1120b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=700&q=60)",}
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
          var artikels = {
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1
          };

        return (
            
            <section className="wow fadeIn bg-light-gray subartikel animated">            
            <div className="container">
            <h1 className="big-title">Dokumentasi</h1>
            <Slider {...artikels}>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}>
        
          <button className="btnplay" onClick={()=>this.openModal('L61p2uyiMSo')}>
            <center><i className="icon-play-circle"></i></center>
          </button>
      </div>
      <div className="text-box">
        <h3 className="titlevideo">Title 1</h3>
        <p className="descriptionvideo">
          <span><i className="icon-youtube"></i> olismix</span> <span><i className="icon-calendar"></i> 10 feb 2020</span>
        </p>
      </div>
                                
    </div>
    <div className="card-profile">
      <div className="foto-profil" style={styleprofile}>
        
          <button className="btnplay" onClick={()=>this.openModal('L61p2uyiMSo')}>
            <center><i className="icon-play-circle"></i></center>
          </button>
      </div>
      <div className="text-box">
        <h3 className="titlevideo">Title 1</h3>
        <p className="descriptionvideo">
          <span><i className="icon-youtube"></i> olismix</span> <span><i className="icon-calendar"></i> 10 feb 2020</span>
        </p>
      </div>
                                
    </div><div className="card-profile">
      <div className="foto-profil" style={styleprofile}>
        
          <button className="btnplay" onClick={()=>this.openModal('L61p2uyiMSo')}>
            <center><i className="icon-play-circle"></i></center>
          </button>
      </div>
      <div className="text-box">
        <h3 className="titlevideo">Title 1</h3>
        <p className="descriptionvideo">
          <span><i className="icon-youtube"></i> olismix</span> <span><i className="icon-calendar"></i> 10 feb 2020</span>
        </p>
      </div>
                                
    </div><div className="card-profile">
      <div className="foto-profil" style={styleprofile}>
        
          <button className="btnplay" onClick={()=>this.openModal('L61p2uyiMSo')}>
            <center><i className="icon-play-circle"></i></center>
          </button>
      </div>
      <div className="text-box">
        <h3 className="titlevideo">Title 1</h3>
        <p className="descriptionvideo">
          <span><i className="icon-youtube"></i> olismix</span> <span><i className="icon-calendar"></i> 10 feb 2020</span>
        </p>
      </div>
                                
    </div><div className="card-profile">
      <div className="foto-profil" style={styleprofile}>
        
          <button className="btnplay" onClick={()=>this.openModal('L61p2uyiMSo')}>
            <center><i className="icon-play-circle"></i></center>
          </button>
      </div>
      <div className="text-box">
        <h3 className="titlevideo">Title 1</h3>
        <p className="descriptionvideo">
          <span><i className="icon-youtube"></i> olismix</span> <span><i className="icon-calendar"></i> 10 feb 2020</span>
        </p>
      </div>
                                
    </div>
    
    
    </Slider>

    <center><Link to="/penerimadonasi" className="btn btn-primary">Selengkapnya</Link></center>
      <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.idvideo} onClose={() => this.setState({isOpen: false})} />
            </div>

            </section>
        );
    }}
    

export default sliderdokumentasi;

