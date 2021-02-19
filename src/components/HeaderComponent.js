import React from 'react';
import { Jumbotron } from 'reactstrap';

export const Header = () => {
    return (
        <Jumbotron>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h1 className='font-header_1'>STOCK TRACKER</h1>
                        <h6 className='font-header_2'>REAL-TIME PRICES FROM THE STOCK EXCHANGES</h6>
                    </div>
                </div>
            </div>
        </Jumbotron>
    );        
}