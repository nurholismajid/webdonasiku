import React, { Component } from 'react';
import Navbar from "../../navbar";
import Footer from "../../footer";
class article extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>Article Front</h1>
                <Footer />
            </div>
        );
    }
}

export default article;