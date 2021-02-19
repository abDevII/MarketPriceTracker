import React from 'react';
import { Loading } from './LoadingComponent';
import NumberFormat from 'react-number-format';
import { PriceStats } from './PriceStatsComponent';

export const StockLoader = ({isLoading, isInputFocused, isSearching, description, quote, quoteColor, delta, percentage}) => {
    return (
        <div className='col-12 text-center'>
            <Loading 
                isLoading={isLoading} 
                className={`
                    ${
                        isLoading 
                        && 
                        isSearching 
                        ? 
                        'd-none' 
                        : 
                        ''
                    }
                `}
            />
            
            <div className={`
                ${
                    isLoading 
                    || 
                    description === '' 
                    || 
                    (isInputFocused && isSearching) 
                    ? 
                    'd-none' 
                    : 
                    ''
                }
            `}>
                <p className='text-primary title'> {description} </p>

                <NumberFormat 
                    value={quote} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    decimalScale={2}
                    prefix={'$'} 
                    className={`${quoteColor} quote-size`}
                />

                <PriceStats
                    delta={delta} 
                    percentage={percentage} 
                />
            </div>
        </div>
    );
}
