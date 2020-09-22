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
          login,
          idcategory:"",
          idpenerima:"",
          password:"",
          slug:"",
          title:"",
          headline:"",
          content:"",
          iduser: sessionStorage.getItem('id'),
          foto: "",
          typefile:"",
          penerimas:[],
          categorys:[],
          posts:[],
          
      }  
     
      }
      
      async componentDidMount() {
        await Api.get('category')
        .then(res => {
          const categorys = res.data['data'];
          this.setState({ categorys });
        })
        await Api.get('api/penerima')
        .then(res => {
          const penerimas = res.data['data'];
          this.setState({ penerimas });
        })

        const slug = this.props.match.params.slug;
        await Api.get('post/'+slug)
           .then(res => {
             const posts = res.data['data'];
             this.setState({ posts });
             console.log(this.state.posts)
             this.setState({ 
              title:this.state.posts.title,
              slug:this.state.posts.slug,
              thumbnail:this.state.posts.thumbnail, 
              idcategory:this.state.posts.id_category,
              idpenerima:this.state.posts.id_penerima,
              headline:this.state.posts.headline,
              idpost:this.state.posts.id_post,
              content:this.state.posts.content
              });
             
           })
           const sampleMarkup = this.state.posts.content   ;
          const blocksFromHTML = htmlToDraft(sampleMarkup);
          const editorState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap,);
          
          this.setState({ editorState: EditorState.createWithContent(editorState), }); 
      }
      
      handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
            slug: this.state.title.toLowerCase().split(' ').join('-')
        })
    }
     
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
          content:draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
        console.log(this.state.content)
      };



    funswal = (status,pesan,style)=>{
      swal(status,pesan, style);
  }

    handleSubmit = (e) => {
      const Datacontent ={
        idcategory:this.state.idcategory,
        idpenerima:this.state.idpenerima,
        slug:this.state.slug,
        title:this.state.title,
        headline:this.state.headline,
        content: this.state.content,
        iduser:this.state.iduser,
        foto:this.state.foto,
        typefile:this.state.typefile
      }
   Api.put('post/update/'+this.state.idpost,Datacontent)
      .then(res => {
        if(res.data.status =="success"){
            this.funswal(res.data.status,res.data.message,"success");
        }else{
            this.funswal(res.data.status, res.data.message, "warning");
        }
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

      

    render() {

        const { editorState, slug, headline,idcategory,idpenerima,thumbnail,title } = this.state;
        
        if (this.state.login === false) {
            return <Redirect to="/admin/login" />
        }
        
        const loopcategory = this.state.categorys.map(category=>{    
        return(
        <option value={category.id_category}>{category.name_category}</option>
        )
        })

        const looppenerima = this.state.penerimas.map(penerima=>{  
          
            return(
            <option value={penerima.id_penerima}>{penerima.nama_penerima}</option>
            )
            })

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
                                                <input name="title"  value={title} placeholder="Titile Post" type="text" onChange={this.handleChange} className="validate[required] form-control" id="title"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-lg-12">
                                                <input name="slug" value={slug} disabled="true" type="text" className="validate[required] form-control" id="slug"/>
                                            </div>
                                        
                                        </div>

                                        <div className="form-group">
                                            <div className="col-lg-12">
                                                <textarea name="headline" value={headline} placeholder="Headline Post" type="text" onChange={this.handleChange} className="validate[required] form-control" id="headline"/>
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
                        <div style={{textAlign:"center"}} className="form-actions no-margin-bottom">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary ">Post</button>
                                <Link style={{marginLeft:"10px"}} className="btn btn-warning" to="/admin/post" >
                                Kembali
                                </Link>
                            </div>
                                        <div className="form-group">
                                        <label className="control-label col-lg-12">Category Post</label>
                                            <div className="col-lg-12">
                                                <select onChange={this.handleChange} value={idcategory} name="idcategory" id="idcategory" className="validate[required] form-control">
                                                    <option value="">Select Category</option>
                                                    {loopcategory}
                                                    
                                                </select>
                                            </div>
                                        
                                        </div>
                                        <div className="form-group">
                                        <label className="control-label col-lg-12">Terkait Penerima Donasi</label>
                                            <div className="col-lg-12">
                                                <select onChange={this.handleChange} value={idpenerima} name="idpenerima" id="idpenerima" className="validate[required] form-control">
                                                    <option value="">Select Penerima</option>
                                                    {looppenerima}
                                                </select>
                                            </div>
                                        
                                        </div>
                                        <div className="form-group">
                        <label className="control-label col-lg-4">Image Upload</label>
                        <div className="col-lg-8">
                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                <div id="thumbnail" className="fileupload-preview thumbnail" style={{width: "200px", height: "150px"}}>
                                    <img src={thumbnail} />
                                </div>
                                <div>
                                    <span className="btn btn-file btn-success"><span className="fileupload-new">Select image</span><span className="fileupload-exists">Change</span><input className="validate[required]" type="file" onChange={this.handleImageChange.bind(this)} /></span>
                                    <a href="#" className="btn btn-danger fileupload-exists" data-dismiss="fileupload">Remove</a>
                                </div>
                            </div>
                        </div>
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