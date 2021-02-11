import React from 'react';
import { Loading } from './LoadingComponent';
import NumberFormat from 'react-number-format';
import { Percentage } from './PercentageComponent';

export const StockLoader = ({isLoading, isInputFocused, isSearching, description, quote, quoteColor, percentage}) => {
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
                        'hide' 
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
                    'hide' 
                    : 
                    ''
                }
            `}>
                <p className='text-primary title-size'> {description} </p>
                <NumberFormat 
                    value={quote} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    className={`${quoteColor} quote-size `}
                />
                <Percentage percentage={percentage} />
            </div>
        </div>
    );
}
