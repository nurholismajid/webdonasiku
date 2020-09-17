import React, { Component } from 'react';
import Navbar from '../navbar';
import Menu from '../menu';
import {Redirect} from 'react-router-dom';
import Api from '../../../services/sevices';
import swal from 'sweetalert';
import "./setting.css";
class Settingweb extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            namaweb:"",
            logoweb:"",
            nama:"",
            foto: "",
            typefile:"",
            login
        }    
      }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {
        Api.get('option')
           .then(res => {
             const settings = res.data['data'];
             this.setState({ 
                 namaweb: settings[0].name_web,
                 logoweb: settings[0].logo_web,
                 deskripsiweb: settings[0].description_web,
                 alamatweb: settings[0].address_web,
                 emailweb: settings[0].email_web, 
                 phoneweb: settings[0].phone_web,
                 facebookweb: settings[0].facebook,
                 instagramweb: settings[0].instagram,
                 youtubeweb: settings[0].youtube,
                });
             this.setState({ 
                nama:this.state.namaweb,
                deskripsi:this.state.deskripsiweb,
                alamat:this.state.alamatweb,
                email:this.state.emailweb,
                nohp:this.state.phoneweb,
                facebook:this.state.facebookweb,
                instagram:this.state.instagramweb,
                youtube:this.state.youtubeweb,
                fotolama: this.state.logoweb
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
          const Datasetting ={
            nama: this.state.nama,
            deskripsi: this.state.deskripsi,
            alamat: this.state.alamat,
            email: this.state.email,
            nohp: this.state.nohp,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            youtube: this.state.youtube,
            foto: this.state.foto,
            typefile:this.state.typefile,
            fotolama: this.state.fotolama

          }
          console.log(Datasetting);
        const id = 1;
        Api.put('option/update/'+id,Datasetting)
          .then(res => {
            if(res.data.status =="success"){
                this.funswal(res.data.status,res.data.message,"success");
                window.location.reload();
            }else{
                this.funswal(res.data.status, res.data.message, "warning");
            }
          })   
          
      }

    

    render() {
        if (this.state.login === false || sessionStorage.getItem('role') > 1) {
            return <Redirect to="/admin/login" />
        }
        const {nama , deskripsi, alamat, email , nohp, facebook, instagram, youtube} = this.state;

        return (
            <div>
            <Navbar/>
            <Menu/>
            <div id="content">
            <div className="inner" >
                <div className="row">
                    <div className="col-lg-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Setting Web
                        </div>
                        <div className="panel-body">
                        <form className="form-horizontal popup-validation">
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Name Website</label>
                                            <div className="col-lg-4">
                                                <input name="nama" value={nama} type="text" onChange={this.handleChange} className="validate[required] form-control" id="nama"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                        <label className="control-label col-lg-4">Logo Website</label>
                        <div className="col-lg-8">
                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                <div id="thumbnail" className="fileupload-preview thumbnail" style={{width: "200px", height: "150px"}}>
                                    <img src={this.state.logoweb} />
                                </div>
                                <div>
                                    <span className="btn btn-file btn-success"><span className="fileupload-new">Select image</span><span className="fileupload-exists">Change</span><input className="validate[required]" type="file" onChange={this.handleImageChange.bind(this)} /></span>
                                    <a href="#" className="btn btn-danger fileupload-exists" data-dismiss="fileupload">Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                                            <label className="control-label col-lg-4">Deskripsi Footer</label>
                                            <div className="col-lg-4">
                                                <textarea name="deskripsi" value={deskripsi} onChange={this.handleChange} className="validate[required] form-control" id="deskripsi"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Alamat Web</label>
                                            <div className="col-lg-4">
                                                <textarea name="alamat" value={alamat} onChange={this.handleChange} className="validate[required] form-control" id="alamat"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">E-mail</label>
                                            <div className=" col-lg-4">
                                                <input name="email" value={email} onChange={this.handleChange} className="validate[required,custom[email]] form-control" type="text" id="email" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Nomor Handphone</label>
                                            <div className="col-lg-4">
                                                <input name="nohp" value={nohp} type="number" onChange={this.handleChange} className="validate[required] form-control" id="nohp"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">URL Facebook</label>
                                            <div className="col-lg-4">
                                                <input name="facebook" value={facebook} type="text" onChange={this.handleChange} className="validate[required] form-control" id="facebook"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">URL Instagram</label>
                                            <div className="col-lg-4">
                                                <input name="instagram" value={instagram} type="text" onChange={this.handleChange} className="validate[required] form-control" id="instagram"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">URL Youtube</label>
                                            <div className="col-lg-4">
                                                <input name="youtube" value={youtube} type="text" onChange={this.handleChange} className="validate[required] form-control" id="youtube"/>
                                            </div>
                                        </div>
                    

                            <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary ">Update</button>
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

export default Settingweb;