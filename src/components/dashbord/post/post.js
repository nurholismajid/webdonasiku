import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./post.css";
class post extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            posts :[],
            search:'',
            login
        }    
      }
    
    
    updatefilter(event){
        this.setState({
            search: event.target.value.substr(0,20)
        })
    }
    async componentDidMount() {
        await Api.get('post')
        .then(res => {
          const posts = res.data['data'];
          this.setState({ posts });
        })
      }

      publish (id,status){
        const data={publish: status}
        Api.put('post/publish/'+id,data)
        .then(res => {
          this.componentDidMount();         
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
            Api.delete('post/delete/'+id)
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
        if (this.state.login === false ) {
            return <Redirect to="/admin/login" />
        }

        const filterid = this.state.posts.filter(
          (datatemp) => {
              return datatemp.id_post.indexOf(this.state.search) !== -1;
          }
         )
        
        const filtertitle = this.state.posts.filter(
          (datatemp) => {
              return datatemp.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )
      

      const filternamacategory = this.state.posts.filter(
        (datatemp) => {
            return datatemp.name_category.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      const filternamauser = this.state.posts.filter(
        (datatemp) => {
            return datatemp.nama_user.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      var datapost =[];
      if(filterid.length > 0){
        datapost = filterid; 
      }
      else if(filtertitle.length > 0){
           datapost = filtertitle; 
      }
       else if(filternamacategory.length > 0)
      {
          datapost = filternamacategory;
       }

       else if(filternamauser.length > 0)
      {
          datapost = filternamauser;
       }
        const loopdata = datapost.map(post=>{

            if(post.publish == "publish"){
              var hidepublish ={display:"none"}
            }else{
              var hideunpublish ={display:"none"}
            }
       
            return({
                id : post.id_post,
                category : post.name_category,
                penerima : post.nama_penerima,
                title :post.title,
                date :post.create_at.substr(0,10),
                autor :post.nama_user,
                publish :[<button onClick={()=>this.publish(post.id_post,"publish")} style={hidepublish} className="btn btn-success">Publish</button>,<button onClick={()=>this.publish(post.id_post,"draf")} style={hideunpublish} className="btn btn-danger">Batal Publish</button>],
                thumbnail : <img width="100px" style={{margin :"auto", padding:"20px"}} src={post.thumbnail} />,
                action : [<Link target="_blank" style={hideunpublish} to={"/post/"+ post.slug } className="btn-edit"><i className="icon-desktop"></i></Link >,<Link to={"/admin/post/edit/"+ post.id_post } className="btn-edit"><i className="icon-edit"></i></Link >,<a href="#" onClick={()=>this.deletedata(post.id_post)} className="btn-delete"><i className="icon-trash"></i></a>] })
        })
     
        const data = loopdata;
          const columns = [
            {
              name: 'Id',
              selector: 'id',
              sortable: true,
            },
            {
              name: 'Title Post',
              selector: 'title',
              sortable: true,
            },
            {
                name: 'Category',
                selector: 'category',
                sortable: true,
              },
              {
                name: 'Terkait Penerima',
                selector: 'penerima',
                sortable: true,
              },
              {
                name: 'Tanggal Pembuatan',
                selector: 'date',
                sortable: true,
              },
              {
                name: 'Autor',
                selector: 'autor',
                sortable: true,
              },
              
              {
                name: 'Thumbnail',
                selector: 'thumbnail',
                sortable: true,
              },
              {
                name: 'Status Publish',
                selector: 'publish',
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
                    <div className="col-lg-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Data post
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                            <Link className="btn-tambah" to="/admin/post/add" >
                            <i className="icon-plus"></i>
                            </Link>
                            <div className="form-group input-group" style={{maxWidth:"300px", float:"right"}}>
                                            <input type="text" placeholder="Search" value={this.state.search} onChange={this.updatefilter.bind(this)} className="form-control"/>
                                        </div> 
                            <DataTable
        title="Arnold Movies"
        columns={columns}
        data={data}
        pagination
      />
                            </div>      
                            <br />
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

export default post;