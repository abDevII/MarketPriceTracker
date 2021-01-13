import React from 'react';
import { Jumbotron } from 'reactstrap';

function Header(props) {
    return (
        <Jumbotron>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12">
                        <h1>US Stock Price Tracker</h1>
                    </div>
                </div>
            </div>
        </Jumbotron>
    );        
}

export default Header;