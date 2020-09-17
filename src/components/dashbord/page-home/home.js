import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./home.css";
class home extends Component {
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
            login
        }    
      }
    
    
    updatefilter(event){
        this.setState({
            search: event.target.value.substr(0,20)
        })
    }
    async componentDidMount() {
        await Api.get('slider/Home')
        .then(res => {
          const sliders = res.data['data'];
          this.setState({ sliders });
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
                    <div className="col-lg-6">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Data Slider
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                            <Link className="btn-tambah" to="/admin/page-home/addslider" >
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
                </div>
                <hr />
            </div>
        </div>
        </div>
        );
    }

}

export default home;