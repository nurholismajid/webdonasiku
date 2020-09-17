import React from 'react';
import './App.css';
import Mainrouter from './router/mainrouter';
import Api from './services/sevices';

function componentDidMount() {
  Api.get('option')
  .then(res => {
    const optios = res.data['data'];
    sessionStorage.setItem('nameweb',optios[0].name_web);
    sessionStorage.setItem('logoweb',optios[0].logo_web);
    sessionStorage.setItem('deskripsiweb',optios[0].description_web);
    sessionStorage.setItem('addressweb',optios[0].address_web);
    sessionStorage.setItem('emailweb',optios[0].email_web);
    sessionStorage.setItem('phoneweb',optios[0].phone_web);
    sessionStorage.setItem('facebook',optios[0].facebook);
    sessionStorage.setItem('instagram',optios[0].instagram);
    sessionStorage.setItem('youtube',optios[0].youtube);
  })
 // document.addEventListener("contextmenu", function(e){e.preventDefault();}, false);
}


function App() {
  componentDidMount();
  return (
    <Mainrouter />
  );
}

export default App;
