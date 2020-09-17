import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./penerima.css";
class penerima extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            penerimas :[],
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
        await Api.get('penerima')
        .then(res => {
          const penerimas = res.data['data'];
          this.setState({ penerimas });
        })
      }

      publish (id,status){
        const data={publish: status}
        Api.put('penerima/publish/'+id,data)
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
            Api.delete('penerima/delete/'+id)
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

        const filterid = this.state.penerimas.filter(
          (datatemp) => {
              return datatemp.id_penerima.indexOf(this.state.search) !== -1;
          }
         )
        
        const filternama = this.state.penerimas.filter(
          (datatemp) => {
              return datatemp.nama_penerima.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )
      

      const filternohp = this.state.penerimas.filter(
        (datatemp) => {
            return datatemp.nohp_penerima.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      const filteralamat = this.state.penerimas.filter(
        (datatemp) => {
            return datatemp.alamat_penerima.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

      var datapenerima =[];
      if(filterid.length > 0){
        datapenerima = filterid; 
      }
      else if(filternama.length > 0){
           datapenerima = filternama; 
      }
       else if(filternohp.length > 0)
      {
          datapenerima = filternohp;
       }

       else if(filteralamat.length > 0)
      {
          datapenerima = filteralamat;
       }
       const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
       var danadibutuhkan = 0;
        const loopdata = datapenerima.map(penerima=>{

            if(penerima.publish == "publish"){
              var hidepublish ={display:"none"}
              danadibutuhkan += penerima.kebutuhan_biaya;
            }else{
              var hideunpublish ={display:"none"}
            }
       
            return({
                id : penerima.id_penerima,
                nama : penerima.nama_penerima,
                nohp : penerima.nohp_penerima,
                alamat :penerima.alamat_penerima,
                biaya : "Rp. "+priceSplitter(penerima.kebutuhan_biaya)+",00",
                rincian :penerima.rincian_kebutuhan,
                publish :[<button onClick={()=>this.publish(penerima.id_penerima,"publish")} style={hidepublish} className="btn btn-success">Publish</button>,<button onClick={()=>this.publish(penerima.id_penerima,"draf")} style={hideunpublish} className="btn btn-danger">Batal Publish</button>],
                foto : <img width="100px" style={{margin :"auto", padding:"20px"}} src={penerima.foto_penerima} />,
                action : [<Link to={"/admin/penerima/edit/"+ penerima.id_penerima } className="btn-edit"><i className="icon-edit"></i></Link >,<a href="#" onClick={()=>this.deletedata(penerima.id_penerima)} className="btn-delete"><i className="icon-trash"></i></a>] })
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
                name: 'Dana Dibutuhkan',
                selector: 'biaya',
                sortable: true,
              },
              {
                name: 'Rincian Kebutuhan',
                selector: 'rincian',
                sortable: true,
              },
              
              {
                name: 'Foto',
                selector: 'foto',
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
                            Data penerima
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                            <Link className="btn-tambah" to="/admin/penerima/add" >
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
                            <p className="biaya"><b>Total dana Dibutuhkan : {"Rp. "+priceSplitter(danadibutuhkan)+",00"}</b></p>             
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

export default penerima;