import React, { Component } from 'react';
import Navbar from '../navbar';
import Menu from '../menu';
import {Redirect, Link} from 'react-router-dom';
import Api from '../../../services/sevices';
import swal from 'sweetalert';
import "./home.css";
class addslider extends Component {
    constructor(props) {
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        super(props);
        this.state = {
            title:"",
            description:"",
            url:"",
            category:"Home",
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
        Api.post('slider/create',this.state)
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
                            Add Slider Home
                        </div>
                        <div className="panel-body">
                        <form className="form-horizontal popup-validation">
                        <div className="form-group">
                                            <label className="control-label col-lg-4">Title Slider</label>
                                            <div className="col-lg-4">
                                                <input name="title" type="text" onChange={this.handleChange} className="validate[required] form-control" id="title"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Description Slider</label>
                                            <div className="col-lg-4">
                                                <textarea name="description" onChange={this.handleChange} className="validate[required] form-control" id="description"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-4">Url Slider</label>

                                            <div className=" col-lg-4">
                                                <input className="validate[required] form-control" onChange={this.handleChange} type="text" name="url" id="url" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                        <label className="control-label col-lg-4">Cover Slider</label>
                        <div className="col-lg-8">
                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                <div className="fileupload-preview thumbnail" style={{width: "200px", height: "150px"}}></div>
                                <div>
                                    <span className="btn btn-file btn-success"><span className="fileupload-new">Select image</span><span className="fileupload-exists">Change</span><input className="validate[required]" type="file" onChange={this.handleImageChange.bind(this)} /></span>
                                    <a href="#" className="btn btn-danger fileupload-exists" data-dismiss="fileupload">Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                            <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary ">Submit</button>
                                <Link style={{marginLeft:"10px"}} className="btn btn-warning" to="/admin/page-home" >
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

export default addslider;