import React from 'react';
import {link, Link} from 'react-router-dom';


function Menu(){
    if(sessionStorage.getItem('role') == 1){
        var hiddenmenu = {
            display : "block"
        }
    }else{
        var hiddenmenu = {
            display : "none"
        }
    }    
    return(
<div id="left">
    <div className="media user-media well-small">
        <Link to="/admin/profile" className="user-link" >
            <img className="media-object img-thumbnail user-img" alt="User Picture" src={sessionStorage.getItem('foto')} />
        </Link>
        <br />
        <div className="media-body">
            <h5 className="media-heading"> {sessionStorage.getItem('nama')}</h5>
        </div>
        <br />
    </div>

    <ul id="menu" className="collapse">

        
        <li className="panel">
            <Link to="/admin/beranda" >
                <i className="icon-home"></i> Beranda               
            </Link>                   
        </li>
        <li style={hiddenmenu} className="panel">
            <Link to="/admin/user" >
                <i className="icon-user"></i> Data User              
            </Link>                   
        </li>
        <li className="panel">
            <Link to="/admin/donatur" >
                <i className="icon-user"></i> Data Donatur              
            </Link>                   
        </li>
        <li className="panel">
            <Link to="/admin/penerima" >
                <i className="icon-user"></i> Data Penerima              
            </Link>                   
        </li>
        <li className="panel">
            <Link to="/admin/donasi" >
                <i className="icon-user"></i> Data donasi              
            </Link>                   
        </li>
        <li className="panel">
            <a href="#" data-parent="#menu" data-toggle="collapse" className="accordion-toggle" data-target="#DDL-nav">
                <i className=" icon-sitemap"></i> Page
                    <span className="pull-right">
                        <i className="icon-angle-left"></i>
                    </span>
            </a>
            <ul className="collapse" id="DDL-nav">
                <li><Link to="/admin/page-home"><i className=" icon-desktop"></i> Page Home </Link></li>
                <li><Link to="/admin/page-about"><i className=" icon-desktop"></i> Page About </Link></li>
            </ul>
        </li>
        <li className="panel">
            <a href="#" data-parent="#menu" data-toggle="collapse" className="accordion-toggle" data-target="#artikel-nav">
                <i className="icon-file-text-alt"></i> Artikel
                    <span className="pull-right">
                        <i className="icon-angle-left"></i>
                    </span>
            </a>
            <ul className="collapse" id="artikel-nav">
                <li><Link to="/admin/category"><i className=" icon-desktop"></i> Category </Link></li>
                <li><Link to="/admin/post"><i className=" icon-desktop"></i> All Post </Link></li>
            </ul>
        </li>
    </ul>

</div>        
    )
}

export default Menu;