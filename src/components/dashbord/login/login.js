import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import Api from '../../../services/sevices';
import swal from 'sweetalert';
import "./login.css";

class login extends Component {
    constructor(props) {
        const token = sessionStorage.getItem('token');
        let login = false;
        if (token!=null) {
            login = true
        }
        super(props)
        this.state = {
            email:"",
            password:"",
            login
        }    
      }

      handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    funswal = (status,pesan,style)=>{
        swal(status,pesan, style);
    } 

    
      handleLogin = (e) => {
        Api.post('auth',this.state)
          .then(res => {
            if(res.data.status =="success"){
                this.funswal(res.data.status,res.data.message,"success");
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('id', res.data.data.id_user);
                sessionStorage.setItem('nama', res.data.data.nama_user);
                sessionStorage.setItem('email', res.data.data.email_user);
                sessionStorage.setItem('role', res.data.data.level);
                sessionStorage.setItem('foto', res.data.data.foto_user);
                this.setState({
                    login:true
                })
            }else{
                this.funswal(res.data.status, res.data.message, "warning");
            }
          })   
          
      }

      
    render() {

        if (this.state.login === true) {
            return <Redirect to="/admin" />
        }

        return (
            <div>
            <title>{sessionStorage.getItem('nameweb')}</title>
                <div className="text-center">
        <img src={sessionStorage.getItem('logoweb')} id="logoimg" alt=" Logo" />
    </div>
    <div className="tab-content">
        <div id="login" className="tab-pane active">
            <form className="form-signin popup-validation">
                <input type="email" onChange={this.handleChange} name="email" placeholder="Your E-mail" className="form-control validate[required,custom[email]]" />
                <input type="password" onChange={this.handleChange} name="password" placeholder="Password" className="form-control validate[required]" />
                <button onClick={this.handleLogin} className="btn text-muted text-center btn-danger" type="button">Sign in</button>
            </form>
        </div>
        <div id="forgot" className="tab-pane popup-validation">
            <form  className="form-signin">
                <input type="email" name="emailrecover"  required="required" placeholder="Your E-mail"  className="form-control validate[required,custom[email]]" />
                <br />
                <button className="btn text-muted text-center btn-success" type="button">Recover Password</button>
            </form>
        </div>
    </div>
    <div className="text-center">
        <ul className="list-inline">
            <li><a className="text-muted" href="#login" data-toggle="tab">Login</a></li>
            <li><a className="text-muted" href="#forgot" data-toggle="tab">Forgot Password</a></li>
        </ul>
    </div>

            </div>
        );
    }
}

export default login;