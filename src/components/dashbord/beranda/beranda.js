import React, { Component } from 'react';
import {Redirect, Link } from 'react-router-dom';
import Navbar from '../navbar';
import Menu from '../menu';
class beranda extends Component {
    constructor(props) {
        super(props)
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false
        }
        this.state = {
            login
        }    
      }
    
    render() {
        if (this.state.login === false) {
            return <Redirect to="/admin/login" />
        }
        return (
            <div>
            <Navbar/>
            <Menu />
            <div id="content">
            <div className="inner" >
                <div className="row">
                    <div className="col-lg-12">

                    <h1>Dashbord</h1>
                        


                    </div>
                </div>
                <hr />
            </div>
        </div>
        </div>
        );
    }
}

export default beranda;