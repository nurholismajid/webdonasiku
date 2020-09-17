import React, { useImperativeHandle } from 'react';
import './navbar.css';
import swal from 'sweetalert';
import {Redirect, Link } from 'react-router-dom';

function Handlelogout (){
    swal("", {
        title: 'Kamu yakin ingin keluar?',
        icon: 'warning',
        buttons: ["Cancel", "Yes!"],
      }).then(function(value) {
        if (value) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('id');
                sessionStorage.removeItem('nama');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('foto');
            window.location.reload();
        }
    });

}
function Navbar(){

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
        <div id="top">
        <title>{sessionStorage.getItem('nameweb')}</title>


    <nav className="navbar navbar-inverse navbar-fixed-top " >
        <a data-original-title="Show/Hide Menu" data-placement="bottom" data-tooltip="tooltip" className="accordion-toggle btn btn-primary btn-sm visible-xs" data-toggle="collapse" href="#menu" id="menu-toggle">
            <i className="icon-align-justify"></i>
        </a>
        <header className="navbar-header">

        <Link to="/" className="navbar-brand">
            <img src={sessionStorage.getItem('logoweb')} alt="" /></Link>
        </header>
        <ul className="nav navbar-top-links navbar-right">
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="icon-user "></i>&nbsp; <i className="icon-chevron-down "></i>
                </a>

                <ul className="dropdown-menu dropdown-user">
                    <li><Link to="/admin/profile" ><i className="icon-user"></i> User Profile </Link>
                    </li>
                    <li style={hiddenmenu} ><Link to="/admin/setting" ><i className="icon-gear"></i> Settings </Link>
                    </li>
                    <li className="divider"></li>
                    <li><a onClick={()=>Handlelogout()} href="#"><i className="icon-signout"></i> Logout </a>
                    </li>
                </ul>

            </li>
        </ul>

    </nav>

</div>
    )
}

export default Navbar;