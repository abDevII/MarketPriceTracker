import React from 'react';

export const PriceStats = ({ delta, percentage }) => {
    if (delta > 0) {
        return (
            <div className='text-success stats-size'>
                <span> &#8599; {delta} </span>
                <span>
                    {
                        percentage >= 0.01 
                        ? 
                        `(${percentage})%` 
                        : 
                        null
                    } 
                </span>
            </div>    
        );
    }
    else if (delta < 0) {
        return (
            <div className='text-danger stats-size'>
                <span> &#8600; {-delta} </span>
                <span>
                    {
                        percentage <= -0.01 
                        ? 
                        `(${-percentage})%` 
                        : 
                        null
                    } 
                </span>
            </div> 
        );
    }   
    else return <div style={{opacity: 0}}>0</div>;
};