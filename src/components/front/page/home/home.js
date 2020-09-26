import React, { Component } from 'react';
import Navbar from "../../navbar";
import Footer from "../../footer";
import Content from "../../content";
import Slider from "../../slider";
import Sectionangka from "./sectionangka";
import Api from '../../../../services/sevices';
import './home.css';
import {connect} from 'react-redux';
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliders : [],
        }
        
        }
    
        async componentDidMount() {
            await Api.get('slider/Home')
            .then(res => {
              const sliders = res.data['data'];
              this.setState({ sliders });
            })
            await Api.get('content/Home')
        .then(res => {
          const contents = res.data['data'];
          this.setState({ content: contents[0].content, }); 
        })
          }
    render() {
        
        return (
            <div>
            <Navbar />
            <Slider sliders = {this.state.sliders}/>
            <Content  content = {this.state.content} />
            <Sectionangka penerimas = {this.props.penerimas} donasis = {this.props.donasis}  />
            <Footer />
            </div>
        );
    }
}

const mapStatetoprops=(state)=>{
    return{
      penerimas:state.datapenerimas,
      donasis:state.datadonasis
    }
  }
  
  export default connect(mapStatetoprops)(home);
  