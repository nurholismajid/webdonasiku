import React, { Component } from 'react';
import Navbar from '../navbar';
import Menu from '../menu';
import {Redirect, Link} from 'react-router-dom';
import Api from '../../../services/sevices';
import swal from 'sweetalert';
import "./donatur.css";
class editdonatur extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            donaturs :[],
            nama:"",
            email:"",
            password:"",
            nohp:"",
            alamat:"",
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
        const id = this.props.match.params.id;
        Api.get('donatur/'+id)
           .then(res => {
             const donaturs = res.data['data'];
             this.setState({ donaturs });
             this.setState({ 
                nama:this.state.donaturs.nama_donatur,
                email:this.state.donaturs.email_donatur,
                nohp:this.state.donaturs.nohp_donatur,
                alamat:this.state.donaturs.alamat_donatur,
                fotolama: this.state.donaturs.foto_donatur
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
          const Datadonatur ={
            nama: this.state.nama,
            email:this.state.email,
            nohp:this.state.nohp,
            alamat:this.state.alamat,
            foto: this.state.foto,
            typefile:this.state.typefile,
            fotolama: this.state.fotolama

          }
        const id = this.props.match.params.id;
        Api.put('donatur/update/'+id,Datadonatur)
          .then(res => {
            if(res.data.status =="success"){
                this.funswal(res.data.status,res.data.message,"success");
            }else{
                this.funswal(res.data.status, res.data.message, "warning");
            }
          })   
          
      }

    

    render() {
        if (this.state.login === false) {
            return <Redirect to="/admin/login" />
        }
        const {nama,email,nohp,alamat} = this.state;

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
                            Add donatur
                        </div>
                        <div className="panel-body">
                        <form className="form-horizontal popup-validation">
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Name</label>
                                            <div className="col-lg-4">
                                                <input name="nama" value={nama} type="text" onChange={this.handleChange} className="validate[required] form-control" id="nama"/>
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
                                            <label className="control-label col-lg-4">Alamat</label>
                                            <div className="col-lg-4">
                                                <textarea name="alamat" value={alamat} onChange={this.handleChange} className="validate[required] form-control" id="alamat"></textarea>
                                            </div>
                                        </div>

                                        <div className="form-group">
                        <label className="control-label col-lg-4">Image Upload</label>
                        <div className="col-lg-8">
                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                <div id="thumbnail" className="fileupload-preview thumbnail" style={{width: "200px", height: "150px"}}>
                                    <img src={this.state.donaturs.foto_donatur} />
                                </div>
                                <div>
                                    <span className="btn btn-file btn-success"><span className="fileupload-new">Select image</span><span className="fileupload-exists">Change</span><input className="validate[required]" type="file" onChange={this.handleImageChange.bind(this)} /></span>
                                    <a href="#" className="btn btn-danger fileupload-exists" data-dismiss="fileupload">Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                            <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary ">Submit</button>
                                <Link style={{marginLeft:"10px"}} className="btn btn-warning" to="/admin/donatur" >
                                Kembali
                                </Link>
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

export default editdonatur;