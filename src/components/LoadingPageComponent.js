import React from 'react';
import { Loading } from './LoadingComponent';

export const LoadingPage = ({isRequestSuccessful, isPageLoading}) => {
    return (
        isRequestSuccessful
        && 
        isPageLoading
        ?
        <div className='row row-content d-flex align-items-center'>
            <Loading isPageLoading={isPageLoading}/>
        </div>
        :
        null
    );
}