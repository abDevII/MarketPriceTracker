import React, { Component } from 'react';
import { Header } from './HeaderComponent';
import { Body } from './BodyComponent';
import { Footer } from './FooterComponent';

export class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Body />
                <Footer />
            </React.Fragment>
        );
    }
}