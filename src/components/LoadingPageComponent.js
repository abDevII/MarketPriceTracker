import React from 'react';
import { Loading } from './LoadingComponent';

export const LoadingPage = ({isRequestSuccessful, isPageLoading, dotsAnimation}) => {
    return (
        isRequestSuccessful
        && 
        isPageLoading
        ?
        <div className='row row-content d-flex align-items-center'>
            <Loading isPageLoading={isPageLoading} dotsAnimation={dotsAnimation}/>
        </div>
        :
        null
    );
}