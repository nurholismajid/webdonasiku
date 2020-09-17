import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./post.css";
class category extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            categorys :[],
            search:'',
            login,
            btnupdate:{display:"none"},
            btnsubmit:{display:"block"},
            id_category:"",
            nama:"",
            slug:"",
        }    
      }
    
      handleChange = (e) =>{
        this.setState({
            nama: e.target.value,
            slug: e.target.value.toLowerCase().split(' ').join('-')
        })
    }
    updatefilter(event){
        this.setState({
            search: event.target.value.substr(0,20)
        })
    }
    async componentDidMount() {
        await Api.get('category')
        .then(res => {
          const categorys = res.data['data'];
          this.setState({ categorys });
        })
      }
      funswal = (status,pesan,style)=>{
        swal(status,pesan, style);
    } 
      handleedit(id){
        Api.get('category/'+id)
           .then(res => {
             const categorys = res.data['data'];
             this.setState({ 
                id_category:categorys.id_category,
                nama:categorys.name_category,
                slug:categorys.slug,
                btnupdate:{display:"block"},
                btnsubmit:{display:"none"}
              });
             
           })

      }

      handleupdate = (e) => {
        const Datacategory ={
          nama: this.state.nama,
          slug:this.state.slug,
          
        }
      const id = this.state.id_category;
      Api.put('category/update/'+id,Datacategory)
        .then(res => {
          if(res.data.status =="success"){
              this.funswal(res.data.status,res.data.message,"success");
              this.setState({ 
                btnupdate:{display:"none"},
                btnsubmit:{display:"block"},
                nama:"",
                slug:""
                })
                this.componentDidMount();          
          }else{
              this.funswal(res.data.status, res.data.message, "warning");
          }
        })   
        
        
      }
      handleSubmit = (e) => {
        const data = {
          nama:this.state.nama,
          slug:this.state.slug
        }
        Api.post('category/create',data)
          .then(res => {
            if(res.data.status =="success"){
                this.funswal(res.data.status,res.data.message,"success");
                this.setState({
                  nama:"",
                  slug:""
                })
                this.componentDidMount();             
            }else{
                this.funswal(res.data.status, res.data.message, "warning");
            }
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
            Api.delete('category/delete/'+id)
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

        const filterid = this.state.categorys.filter(
          (datatemp) => {
              return datatemp.id_category.indexOf(this.state.search) !== -1;
          }
         )
        
        const filternama = this.state.categorys.filter(
          (datatemp) => {
              return datatemp.name_category.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )
      

      const filterslug = this.state.categorys.filter(
        (datatemp) => {
            return datatemp.slug.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      
      var datacategory =[];
      if(filterid.length > 0){
        datacategory = filterid; 
      }
      else if(filternama.length > 0){
           datacategory = filternama; 
      }
       else if(filterslug.length > 0)
      {
          datacategory = filterslug;
       }

       
        const loopdata = datacategory.map(category=>{  
          
          return({
                id : category.id_category,
                nama : category.name_category,
                slug : category.slug,
                action : [<a onClick={()=>this.handleedit(category.id_category)} href="#" className="btn-edit"><i className="icon-edit"></i></a >,<a href="#" onClick={()=>this.deletedata(category.id_category)} className="btn-delete"><i className="icon-trash"></i></a>] })
        })
     
        const data = loopdata;
          const columns = [
            {
              name: 'Id',
              selector: 'id',
              sortable: true,
            },
            {
              name: 'Name Category',
              selector: 'nama',
              sortable: true,
            },
            {
                name: 'Slug',
                selector: 'slug',
                sortable: true,
              },
              {
                name: 'Action',
                selector: 'action',
                sortable: true,
              },
          ];

          const {nama,slug} = this.state;
        
        return (
            <div>
            <Navbar/>
            <Menu />
            <div id="content">
            <div className="inner" >
                <div className="row">
                <div className="col-lg-6">

<div className="panel panel-default">
    <div className="panel-heading">
        Form Category
    </div>
    <div className="panel-body">
    <form className="form-horizontal popup-validation">
                    <div className="form-group">
                        <label className="control-label col-lg-4">Name Category</label>
                        <div className="col-lg-4">
                            <input name="nama" value={nama} type="text" onChange={this.handleChange} className="validate[required] form-control" id="nama"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-lg-4">Slug</label>
                        <div className="col-lg-4">
                            <input disabled="ture" name="slug" value={slug} type="text" onChange={this.handleChange} className="validate[required] form-control" id="slug"/>
                        </div>
                    </div>
                    
        <div className="form-actions no-margin-bottom">
            <button style={this.state.btnsubmit} className="btn btn-primary" type="button" onClick={this.handleSubmit}>Submit</button>
            <button style={this.state.btnupdate} className="btn btn-warning" type="button" onClick={this.handleupdate} >Update</button>
        </div>
    </form>
       
    </div>
</div> 


</div>

                    <div className="col-lg-6">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Data category
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
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

export default category;