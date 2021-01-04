import React, { Component } from 'react';
import Header from './HeaderComponent';
import Body from './BodyComponent';
import Footer from './FooterComponent';

class Main extends Component {

    render() {

        return (
            <div className="view">
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default Main;