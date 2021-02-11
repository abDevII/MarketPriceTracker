import React from 'react';
import { Jumbotron } from 'reactstrap';

export const Header = () => {
    return (
        <Jumbotron>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h1 className='font-header'>US Stock Price Tracker</h1>
                    </div>
                </div>
            </div>
        </Jumbotron>
    );        
}