import React, { Component } from 'react';
import Navbar from '../navbar';
import Menu from '../menu';
import {Redirect, Link} from 'react-router-dom';
import Api from '../../../services/sevices';
import swal from 'sweetalert';
import "./profile.css";
class profile extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            users :[],
            nama:"",
            email:"",
            password:"",
            oldpassword:"",
            level:"",
            foto: "",
            typefile:"",
            fotolama:"",
            login
        }    
      }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {
        const id = sessionStorage.getItem('id');
        Api.get('user/'+id)
           .then(res => {
             const users = res.data['data'];
             this.setState({ users });
             this.setState({ 
                nama:this.state.users.nama_user,
                email:this.state.users.email_user,
                level:this.state.users.level,
                fotolama: this.state.users.foto_user
              });
             
           })
       }
    
       handleImageChange = (e) => {
        e.preventDefault();
        var file = e.target.files[0];
        var Typefile = file.type
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if(Typefile == "image/jpeg"){
                var base64Data = reader.result;
                var Foto = base64Data.replace(/^data:image\/jpeg;base64,/, "");
                var type = ".jpg";
            }else if(Typefile == "image/png"){
                var base64Data = reader.result;
                var Foto = base64Data.replace(/^data:image\/png;base64,/, "");
                var type = ".png";
            }
            this.setState({
                foto: Foto,
                typefile: type
              });

        };
      }
      funswal = (status,pesan,style)=>{
        swal(status,pesan, style);
    }
    
      handleSubmit = (e) => {
          const Datauser ={
            nama: this.state.nama,
            email:this.state.email,
            level:this.state.level,
            foto: this.state.foto,
            typefile:this.state.typefile,
            fotolama: this.state.fotolama

          }
        const id = sessionStorage.getItem('id');
        Api.put('user/update/'+id,Datauser)
          .then(res => {
            if(res.data.status =="success"){
                this.funswal(res.data.status,res.data.message,"success");
            }else{
                this.funswal(res.data.status, res.data.message, "warning");
            }
          })   
          
      }

    handleChangepassword = (e) =>{
        const DataPassword = {
            id : sessionStorage.getItem('id'),
            old : this.state.oldpassword,
            new : this.state.password

        }
        Api.post('auth/gantipassword',DataPassword)
          .then(res => {
            if(res.data.status =="success"){
                this.funswal(res.data.status,res.data.message,"success");
            }else{
                this.funswal(res.data.status, res.data.message, "warning");
            }
            console.log(res.data);
          })   
       
    }

    render() {
        if (this.state.login === false) {
            return <Redirect to="/admin/login" />
        }
        const {nama,email,level} = this.state;

        
        return (
            <div>
            <Navbar/>
            <Menu/>
            <div id="content">
            <div className="inner" >
                <div className="row">
                    <div className="col-lg-6">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Profile
                        </div>
                        <div className="panel-body">
                        <form style={{padding:"0px"}} className="form-horizontal popup-validation">
                        <div className="form-group">
                                            <label className="control-label col-lg-4">Name</label>
                                            <div className="col-lg-6">
                                                <input name="nama" value={nama} type="text" onChange={this.handleChange} className="validate[required] form-control" id="nama"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">E-mail</label>
                                            <div className=" col-lg-6">
                                                <input name="email" value={email} onChange={this.handleChange} className="validate[required,custom[email]] form-control" type="text" id="email" />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                        <label className="control-label col-lg-4">Image Upload</label>
                        <div className="col-lg-8">
                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                <div id="thumbnail" className="fileupload-preview thumbnail" style={{width: "200px", height: "150px"}}>
                                    <img src={this.state.users.foto_user} />
                                </div>
                                <div>
                                    <span className="btn btn-file btn-success"><span className="fileupload-new">Select image</span><span className="fileupload-exists">Change</span><input className="validate[required]" type="file" onChange={this.handleImageChange.bind(this)} /></span>
                                    <a href="#" className="btn btn-danger fileupload-exists" data-dismiss="fileupload">Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                            <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary ">Update</button>
                            </div>
                        </form>
                           
                        </div>
                    </div> 


                    </div>
                    <div className="col-lg-6">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                           Ganti Password
                        </div>
                        <div className="panel-body">
                        <form style={{padding:"0px"}} className="form-horizontal popup-validation">
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Old Password</label>

                                            <div className=" col-lg-6">
                                                <input className="validate[required] form-control" onChange={this.handleChange} type="password" name="oldpassword" id="oldpassword" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">New Password</label>

                                            <div className=" col-lg-6">
                                                <input className="validate[required] form-control" onChange={this.handleChange} type="password" name="password" id="password" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Confirm Password</label>

                                            <div className=" col-lg-6">
                                                <input className="validate[required,equals[password]] form-control" type="password" name="pass2"
                                                    id="pass2" />
                                            </div>
                                        </div>
                                        
                            <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleChangepassword} type="button" className="btn btn-primary ">Update</button>
                            </div>
                        </form>
                           
                        </div>
                    </div> 


                    </div>
                </div>
                <hr />
            </div>
        </div>        
            </div>
        );
    }
}

export default profile;