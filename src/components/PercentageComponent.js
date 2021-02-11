import React from 'react';

export const Percentage = ({ percentage }) => {
    if (percentage >= 0.01) {            
        return <p className='text-success percentage-size'> &#8599; {percentage}% </p>;
    }
    else if (percentage <= -0.01) {
        return <p className='text-danger percentage-size'> &#8600; {-percentage}% </p>;
    }
    else return null;
};