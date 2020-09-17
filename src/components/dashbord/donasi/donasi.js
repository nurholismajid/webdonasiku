import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./donasi.css";
class donasi extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            donasis :[],
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
        await Api.get('donasi')
        .then(res => {
          const donasis = res.data['data'];
          this.setState({ donasis });
        })
      }

      publish (id,status){
        const data={status: status}
        Api.put('donasi/status/'+id,data)
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
            Api.delete('donasi/delete/'+id)
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

        const filterid = this.state.donasis.filter(
          (datatemp) => {
              return datatemp.id_donasi.indexOf(this.state.search) !== -1;
          }
         )
        
        const filternamadonatur = this.state.donasis.filter(
          (datatemp) => {
              return datatemp.nama_donatur.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )

      const filternamapenerima = this.state.donasis.filter(
        (datatemp) => {
            return datatemp.nama_penerima.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
    )
      

      var datadonasi =[];
      if(filterid.length > 0){
        datadonasi = filterid; 
      }
      else if(filternamadonatur.length > 0){
           datadonasi = filternamadonatur; 
      }
       else if(filternamapenerima.length > 0)
      {
          datadonasi = filternamapenerima;
       }

       const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var danamasuk = 0;
        var danadisalurkan = 0;
        const loopdata = datadonasi.map(donasi=>{

            if(donasi.status == "Sudah Dikonfirmasi"){
              var hidepublish ={display:"none"}
              danadisalurkan += donasi.nominal_donasi;
            }else{
              var hideunpublish ={display:"none"}
            }

            danamasuk += donasi.nominal_donasi;
            
            return({
                id : donasi.id_donasi,
                namadonatur : donasi.nama_donatur,
                namapenerima : donasi.nama_penerima,
                nominal : "Rp. "+priceSplitter(donasi.nominal_donasi)+",00",
                tanggal :donasi.tanggal_transfer,
                status :[<button onClick={()=>this.publish(donasi.id_donasi,"Sudah Dikonfirmasi")} style={hidepublish} className="btn btn-success">Konfirmasi</button>,<button onClick={()=>this.publish(donasi.id_donasi,"Menunggu Konfirmasi")} style={hideunpublish} className="btn btn-danger">Batal Konfirmasi</button>],
                bukti : <img width="100px" style={{margin :"auto", padding:"20px"}} src={donasi.bukti_transfer} />,
                action : [<a href="#" onClick={()=>this.deletedata(donasi.id_donasi)} className="btn-delete"><i className="icon-trash"></i></a>] })
              })
     
        const data = loopdata;
          const columns = [
            {
              name: 'Id',
              selector: 'id',
              sortable: true,
            },
            {
              name: 'Nama Donatur',
              selector: 'namadonatur',
              sortable: true,
            },
            {
                name: 'Nama Penerima',
                selector: 'namapenerima',
                sortable: true,
              },
              {
                name: 'Nominal Donasi',
                selector: 'nominal',
                sortable: true,
              },
              {
                name: 'Tanggal Transfer',
                selector: 'tanggal',
                sortable: true,
              },
              {
                name: 'Bukti Transfer',
                selector: 'bukti',
                sortable: true,
              },
              {
                name: 'Status',
                selector: 'status',
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
                            Data donasi
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
        <p className="biaya"><b>Total dana masuk : {"Rp. "+priceSplitter(danamasuk)+",00"}</b></p>
        <p className="biaya"><b>Total dana masuk : {"Rp. "+priceSplitter(danadisalurkan)+",00"}</b></p>                  
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

export default donasi;