import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./post.css";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Media from '../media';

class about extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            sliders :[],
            search:'',
            login,
        }  
        
     
      }
      
      
    
     
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
          content:draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
        console.log(this.state.content)
      };


    updatefilter(event){
        this.setState({
            search: event.target.value.substr(0,20)
        })
    }

    funswal = (status,pesan,style)=>{
      swal(status,pesan, style);
  }

    handleSubmit = (e) => {
      const Datacontent ={
        content: this.state.content,
      }
      console.log(Datacontent)
   Api.put('content/update/About',Datacontent)
      .then(res => {
        if(res.data.status =="success"){
            this.funswal(res.data.status,res.data.message,"success");
        }else{
            this.funswal(res.data.status, res.data.message, "warning");
        }
      })   
      
  }

    

      

      

    render() {

        const { editorState } = this.state;
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
                <div className="col-lg-8">
                    
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Content
                        </div>
                        <div className="panel-body">
                        <form className="form-horizontal popup-validation">
                        <div className="form-group">
                                            <div className="col-lg-12">
                                                <input name="nama" placeholder="Titile Post" type="text" onChange={this.handleChange} className="validate[required] form-control" id="nama"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-lg-12">
                                                <input name="slug" disabled="true" placeholder="Titile Post" type="text" onChange={this.handleChange} className="validate[required] form-control" id="slug"/>
                                            </div>
                                        
                                        </div>

                                        <div className="form-group">
                                            <div className="col-lg-12">
                                                <textarea name="headline" placeholder="Headline Post" type="text" onChange={this.handleChange} className="validate[required] form-control" id="headline"/>
                                            </div>
                                        
                                        </div>
                        
                        <div className="form-group">
                          
                          <div className="col-lg-12">
                          <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
                          </div>
                        </div>               
                        
                            <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary ">Submit</button>
                            </div>
                        </form>
                           
                        </div>
                    </div> 


                    </div>
                    <div className="col-lg-4">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Additional
                        </div>
                        <div className="panel-body">
                            
                           
                        </div>
                    </div> 


                    </div>
                    <Media />
                </div>
                <hr />
            </div>
        </div>
        </div>
        );
    }

}

export default about;