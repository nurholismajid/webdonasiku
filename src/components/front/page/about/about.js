import React, { Component } from 'react';
import Navbar from '../../navbar';
import Footer from "../../footer";
import Slider from "../../slider";
import Content from "../../content";
import Api from '../../../../services/sevices';
class about extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliders : [],
            content:""
        }
        
        }
    
        async componentDidMount() {
            await Api.get('slider/About')
            .then(res => {
              const sliders = res.data['data'];
              this.setState({ sliders });
            })

            await Api.get('content/About')
        .then(res => {
          const contents = res.data['data'];
          this.setState({ content: contents[0].content, }); 
        })
          }
    render() {
        return (
            <div>
                <Navbar />
                <Slider  sliders = {this.state.sliders} />
                <Content content = {this.state.content} />
                <Footer />
            </div>
        );
    }
}

export default about;