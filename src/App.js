import React, { Component } from 'react';
import './App.css';
import Mainrouter from './router/mainrouter';
import Api from './services/sevices';
import {connect} from 'react-redux';

class App extends Component  {

  constructor(props) {
    super(props);
  
  }

  componentDidMount() {
  Api.get('option')
  .then(res => {
    const optios = res.data['data'];
    const data ={
    namaweb: optios[0].name_web,
    logoweb: optios[0].logo_web,
    descriptionweb: optios[0].description_web,
    addressweb: optios[0].address_web,
    emailweb: optios[0].email_web,
    phoneweb:optios[0].phone_web,
    facebook: optios[0].facebook,
    intagram: optios[0].instagram,
    youtube: optios[0].youtube,
    }

    this.props.updateoption(data);
  })
 // document.addEventListener("contextmenu", function(e){e.preventDefault();}, false);
}



  render(){
  console.log(this.props.option)
  return (
    <Mainrouter />
  );

}
}

const mapDipatchToprops = (dispatch) =>{
return{
  updateoption: (data) => dispatch({type:'UPDATEOPTION',data:data}),
}
}

const mapStatetoprops=(state)=>{
  return{
    option:state.dataoption
  }
}

export default connect(mapStatetoprops,mapDipatchToprops)(App);
