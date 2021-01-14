import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = ({ isPageLoading, dotsAnimation, isLoading }) => {

    if (isPageLoading) {            
        return(
            <div className="col-12 text-primary">
                <div className="col-12 text-center">
                    <Spinner color="primary" />
                </div>
                <div className="col-12 pt-3">
                    <span className="col-8 d-inline-block text-right ml-4 pr-0">Please wait while I am collecting data from the US Stock Exchanges</span><span>{dotsAnimation}</span>
                </div>
            </div>
        );
    }
    else if (isLoading) {
        return(
            <div className="col-12">
                <Spinner style={{ width: '2rem', height: '2rem', animationDuration: '1.25s' }} type="grow" color="primary" />
            </div>
        );
    }
    else {
        return null;
    }
};