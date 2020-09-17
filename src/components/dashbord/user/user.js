import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../services/sevices';
import {Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar';
import Menu from '../menu'; 
import "./user.css";
class user extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        let login = true;
        if (token==null) {
            login = false;
        }
        this.state = {
            users :[],
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
        await Api.get('user')
        .then(res => {
          const users = res.data['data'];
          this.setState({ users });
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
            Api.delete('user/delete/'+id)
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
        if (this.state.login === false || sessionStorage.getItem('role') > 1) {
            return <Redirect to="/admin/login" />
        }
        const filterid = this.state.users.filter(
          (datatemp) => {
              return datatemp.id_user.indexOf(this.state.search) !== -1;
          }
         )
        const filternama = this.state.users.filter(
            (datatemp) => {
                return datatemp.nama_user.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        )
        
        const filteremail = this.state.users.filter(
            (datatemp) => {
                return datatemp.email_user.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        )

        var datauser =[];
        if(filterid.length > 0){
          datauser = filterid; 
        }
        else if(filternama.length > 0){
             datauser = filternama; 
        }
        else if(filteremail.length > 0)
        {
            datauser = filteremail;
         }

        const loopdata = datauser.map(user=>{
            var Role ="";
            if(user.level == 1){
                Role = "Administrator";
            }else{
                 Role = "Editor";
            }
            return({
                id : user.id_user,
                nama : user.nama_user,
                email: user.email_user,
                role : Role,
                foto : <img width="100px" style={{margin :"auto", padding:"20px"}} src={user.foto_user} />,
                action : [<Link to={"/admin/user/edit/"+ user.id_user } className="btn-edit"><i className="icon-edit"></i></Link >,<Link onClick={()=>this.deletedata(user.id_user)} className="btn-delete"><i className="icon-trash"></i></Link>] })
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
                name: 'Role',
                selector: 'role',
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
                            Data User
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                            <Link className="btn-tambah" to="/admin/user/add" >
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

export default user;