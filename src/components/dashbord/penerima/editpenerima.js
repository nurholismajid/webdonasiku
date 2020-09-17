import React, { Component } from 'react';
import Navbar from '../navbar';
import Menu from '../menu';
import {Redirect, Link} from 'react-router-dom';
import Api from '../../../services/sevices';
import swal from 'sweetalert';
import "./penerima.css";
class editpenerima extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            penerimas :[],
            nama:"",
            nohp:"",
            alamat:"",
            biaya:"",
            rincianbiaya:"",
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
        Api.get('penerima/'+id)
           .then(res => {
             const penerimas = res.data['data'];
             this.setState({ penerimas });
             this.setState({ 
                nama:this.state.penerimas.nama_penerima,
                email:this.state.penerimas.email_penerima,
                nohp:this.state.penerimas.nohp_penerima,
                alamat:this.state.penerimas.alamat_penerima,
                biaya:this.state.penerimas.kebutuhan_biaya,
                rincianbiaya:this.state.penerimas.rincian_kebutuhan,
                fotolama: this.state.penerimas.foto_penerima
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
          const Datapenerima ={
            nama: this.state.nama,
            email:this.state.email,
            nohp:this.state.nohp,
            alamat:this.state.alamat,
            biaya:this.state.biaya,
            rincianbiaya:this.state.rincianbiaya,
            foto: this.state.foto,
            typefile:this.state.typefile,
            fotolama: this.state.fotolama

          }
        const id = this.props.match.params.id;
        Api.put('penerima/update/'+id,Datapenerima)
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
        const {nama,nohp,alamat,biaya,rincianbiaya} = this.state;

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
                            Add penerima
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
                                            <label className="control-label col-lg-4">Dana Dibutuhkan</label>
                                            <div className=" col-lg-4">
                                                <input name="biaya" value={biaya} onChange={this.handleChange} className="validate[required] form-control" type="number" id="biaya" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Rincian Kebutuhan</label>
                                            <div className=" col-lg-4">
                                                <textarea name="rincianbiaya" value={rincianbiaya} onChange={this.handleChange} className="validate[required] form-control" id="rincianbiaya" ></textarea>
                                            </div>
                                        </div>
                                        
                                        
                                        <div className="form-group">
                        <label className="control-label col-lg-4">Image Upload</label>
                        <div className="col-lg-8">
                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                <div id="thumbnail" className="fileupload-preview thumbnail" style={{width: "200px", height: "150px"}}>
                                    <img src={this.state.penerimas.foto_penerima} />
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
                                <Link style={{marginLeft:"10px"}} className="btn btn-warning" to="/admin/penerima" >
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

export default editpenerima;