import React, { Component } from 'react';
import Navbar from "../../navbar";
import Footer from "../../footer";
import Slider from "../../slider";
import Api from '../../../../services/sevices';
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
          }
    render() {
       
        return (
            <div>
            <Navbar />
            <Slider sliders = {this.state.sliders}/>
            <Footer />
            </div>
        );
    }
}

export default home;