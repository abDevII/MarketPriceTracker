import React from 'react';
import { SearchEngine } from './SearchEngineComponent';

export const LoadedPage = ({isRequestSuccessful, isPageLoading, stockExchangeData}) => {
    return (
        isRequestSuccessful 
        && 
        !isPageLoading
        ?
        <div className='row row-content'>
            <SearchEngine stockExchangeData={stockExchangeData} />
        </div>
        :
        null
    );
}
