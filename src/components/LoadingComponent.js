import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = ({ isPageLoading, isLoading }) => {
    if (isPageLoading) {            
        return (
            <div className='col-12'>
                <div className="sk-wave sk-center">
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                    <div className="sk-wave-rect"></div>
                </div>
                <span className='d-block text-center text-primary pt-3 pb-0'>
                    {
                        window.innerWidth >= 768
                        ?
                        'Please wait while I am collecting data from the Stock Exchanges'
                        :
                        'Collecting data from the US Stock Exchanges'
                    }
                </span>
            </div>
        );
    }
    else if (isLoading) {
        return (
            <div className='col-12'>
                <Spinner 
                    style={
                        { 
                            width: '2rem', 
                            height: '2rem', 
                            animationDuration: '1.25s' 
                        }
                    } 
                    type='grow' 
                    color='primary' 
                />
            </div>
        );
    }
    else return null;
};