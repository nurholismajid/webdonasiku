import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./donatur.css";
class donatur extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            donaturs :[],
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
        await Api.get('donatur')
        .then(res => {
          const donaturs = res.data['data'];
          this.setState({ donaturs });
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
            Api.delete('donatur/delete/'+id)
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
        const filterid = this.state.donaturs.filter(
          (datatemp) => {
              return datatemp.id_donatur.indexOf(this.state.search) !== -1;
          }
         )
        const filternama = this.state.donaturs.filter(
          (datatemp) => {
              return datatemp.nama_donatur.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )
      
      const filteremail = this.state.donaturs.filter(
          (datatemp) => {
              return datatemp.email_donatur.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )

      const filternohp = this.state.donaturs.filter(
        (datatemp) => {
            return datatemp.nohp_donatur.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      const filteralamat = this.state.donaturs.filter(
        (datatemp) => {
            return datatemp.alamat_donatur.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      var datadonatur =[];
      if(filterid.length > 0){
        datadonatur = filterid; 
      }
      else if(filternama.length > 0){
           datadonatur = filternama; 
      }
      else if(filteremail.length > 0)
      {
          datadonatur = filteremail;
       }

       else if(filternohp.length > 0)
      {
          datadonatur = filternohp;
       }

       else if(filteralamat.length > 0)
      {
          datadonatur = filteralamat;
       }


        const loopdata = datadonatur.map(donatur=>{
            
            return({
                id : donatur.id_donatur,
                nama : donatur.nama_donatur,
                email: donatur.email_donatur,
                nohp : donatur.nohp_donatur,
                alamat :donatur.alamat_donatur,
                foto : <img width="100px" style={{margin :"auto", padding:"20px"}} src={donatur.foto_donatur} />,
                action : [<Link to={"/admin/donatur/edit/"+ donatur.id_donatur } className="btn-edit"><i className="icon-edit"></i></Link >,<a href="#" onClick={()=>this.deletedata(donatur.id_donatur)} className="btn-delete"><i className="icon-trash"></i></a>] })
        })
     
        const data = loopdata;
          const columns = [
            {
              name: 'Id',
              selector: 'id',
              sortable: true,
            },
            {
              name: 'Name',
              selector: 'nama',
              sortable: true,
            },
            {
              name: 'E-mail',
              selector: 'email',
              sortable: true,
            },
            {
                name: 'Nomor Handphone',
                selector: 'nohp',
                sortable: true,
              },
              {
                name: 'Alamat',
                selector: 'alamat',
                sortable: true,
              },
              {
                name: 'Foto',
                selector: 'foto',
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
                            Data donatur
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                            <Link className="btn-tambah" to="/admin/donatur/add" >
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

export default donatur;