import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Beranda from '../components/dashbord/beranda/beranda';
import User from '../components/dashbord/user/user';
import Adduser from '../components/dashbord/user/adduser';
import Edituser from '../components/dashbord/user/edituser';
import Adminprofile from '../components/dashbord/user/profile';
import Donatur from '../components/dashbord/donatur/donatur';
import Donasi from '../components/dashbord/donasi/donasi';
import Adddonatur from '../components/dashbord/donatur/adddonatur';
import Editdonatur from '../components/dashbord/donatur/editdonatur';
import Penerima from '../components/dashbord/penerima/penerima';
import Addpenerima from '../components/dashbord/penerima/addpenerima';
import Editpenerima from '../components/dashbord/penerima/editpenerima';
import Login from '../components/dashbord/login/login';
import Home from '../components/front/page/home/home';
import About from '../components/front/page/about/about';
import Recipient from '../components/front/page/recipient/recipient';
import Article from '../components/front/page/article/article';
import Documentation from '../components/front/page/documentation/documentation';
import Contactus from '../components/front/page/contactus/contactus';
import Loginregister from '../components/front/donatur/Loginregister/loginregister';
import Donaturprofile from '../components/front/donatur/profile/profile';
import Donaturdonasi from '../components/front/donatur/donasi/donasi';
import pagehome from '../components/dashbord/page-home/home';
import pageabout from '../components/dashbord/page-about/about';
import addsliderhome from '../components/dashbord/page-home/addslider';
import addsliderabout from '../components/dashbord/page-about/addslider';
import categorypost from '../components/dashbord/post/category';
import post from '../components/dashbord/post/post';
import addpost from '../components/dashbord/post/addpost';

import Setting from '../components/dashbord/Setting/setting';

function Mainrouter(){
    return(
        <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/beranda" exact component={Home} />
        <Route path="/tentangkami" exact component={About} />
        <Route path="/penerimadonasi" exact component={Recipient} />
        <Route path="/artikel" exact component={Article} />
        <Route path="/dokumentasi" exact component={Documentation} />
        <Route path="/Hubungikami" exact component={Contactus} />

        <Route path="/donatur/loginregister" exact component={Loginregister} />
        <Route path="/donatur/Profile" exact component={Donaturprofile} />
        <Route path="/donatur/donasi" exact component={Donaturdonasi} />

        <Route path="/admin" exact component={Beranda} />
        <Route path="/admin/beranda" exact  component={Beranda} />
        <Route path="/admin/user" exact  component={User} />
        <Route path="/admin/user/add"  component={Adduser} />
        <Route path="/admin/user/edit/:id"  component={Edituser} />
        <Route path="/admin/profile"  component={Adminprofile} />
        <Route path="/admin/donatur" exact  component={Donatur} />
        <Route path="/admin/donatur/add"  component={Adddonatur} />
        <Route path="/admin/donatur/edit/:id"  component={Editdonatur} />
        <Route path="/admin/penerima" exact  component={Penerima} />
        <Route path="/admin/penerima/add"  component={Addpenerima} />
        <Route path="/admin/penerima/edit/:id"  component={Editpenerima} />
        <Route path="/admin/donasi" exact  component={Donasi} />
        <Route path="/admin/login"  component={Login} />
        <Route path="/admin/category"  component={categorypost} />
        <Route path="/admin/post" exact component={post} />
        <Route path="/admin/post/add"  component={addpost} />
        
        <Route path="/admin/setting"  component={Setting} />
        <Route path="/admin/page-home" exact  component={pagehome} />
        <Route path="/admin/page-home/addslider"  component={addsliderhome} />
        <Route path="/admin/page-about" exact  component={pageabout} />
        <Route path="/admin/page-about/addslider"  component={addsliderabout} />
        </BrowserRouter>
    )
}

export default Mainrouter;