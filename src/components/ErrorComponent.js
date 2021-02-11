import React from 'react';

export const Error = ({isRequestSuccessful, isLoading, stockExchangeData}) => {
    if (!isRequestSuccessful && !isLoading) {
        return (
            stockExchangeData.length === 0
            ?
            <div className= 'row row-content d-flex align-items-center'>
                <div className='col-12 text-center text-primary'>
                    I am sorry, something went wrong, there are maybe too much users, please refresh the page or come back later . . .
                </div>
            </div>
            :
            <div className='col-12 text-center text-primary'>
                I am sorry, something went wrong, there are maybe too much users, please refresh the page or come back later . . .
            </div>
        );
    }
    else return null;
}