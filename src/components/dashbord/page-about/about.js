import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./about.css";
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
    
    async componentDidMount() {
        await Api.get('slider/About')
        .then(res => {
          const sliders = res.data['data'];
          this.setState({ sliders });
        })

        await Api.get('content/About')
        .then(res => {
          const contents = res.data['data'];
          const sampleMarkup = contents[0].content;
          const blocksFromHTML = htmlToDraft(sampleMarkup);
          const editorState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap,);
          
          this.setState({ editorState: EditorState.createWithContent(editorState), }); 
        })

        

      }

    

      deletedata(id) {
        swal({
          title: "Anda yakin?",
          text: "Data yang anda pilih akan terhapus jika anda setuju tekan OK!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            Api.delete('slider/delete/'+id)
            .then(res => {
              swal("Data telah terhapus!", {
                icon: "success",
              });
               this.componentDidMount();              
            })   
            
           
          } else {
            swal("Data telah aman dan tidak jadi di hapus!");
          }
        });
        
      }

      

    render() {


        const { editorState } = this.state;
        if (this.state.login === false) {
            return <Redirect to="/admin/login" />
        }
        

        const loopdata = this.state.sliders.map(slider=>{
            return({
                title : slider.title,
                description: slider.description,
                url : slider.url,
                cover : <img width="100px" style={{margin :"auto", padding:"20px"}} src={slider.cover} />,
                action : [<Link onClick={()=>this.deletedata(slider.id)} className="btn-delete"><i className="icon-trash"></i></Link>] })
        })
     
        const data = loopdata;
          const columns = [
            {
              name: 'Title Slider',
              selector: 'title',
              sortable: true,
            },
            {
              name: 'Description',
              selector: 'description',
              sortable: true,
            },
            {
              name: 'Url Slider',
              selector: 'url',
              sortable: true,
            },
              {
                name: 'Cover Slider',
                selector: 'cover',
                sortable: true,
              },
              {
                name: 'Action',
                selector: 'action',
                sortable: true,
              },
          ];

        
        
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
                            Data Slider
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                            <Link className="btn-tambah" to="/admin/page-about/addslider" >
                            <i className="icon-plus"></i>
                            </Link>
                            <DataTable
        title="Arnold Movies"
        columns={columns}
        data={data}
        pagination
      />

                            </div>
                           
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