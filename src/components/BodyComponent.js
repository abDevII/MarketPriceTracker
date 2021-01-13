import React, { useState, useEffect } from 'react';
import { Loading } from './LoadingComponent';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import NumberFormat from 'react-number-format';

///////////////////////////////////
// Requirements to use Finnhub API 
// Finnhub API allows us to get real-time quote data for US stocks
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// Hide the API key
api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

const Body = () => {

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [stockExchangeData, setStockExchangeData] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [stock, setStock] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [quote, setQuote] = useState(null);
    const [color, setColor] = useState('text-primary');
    
    const updateStockExchangeData = () => {
        finnhubClient.stockSymbols('US', (error, data, response) => {
            if (error) { 
                console.error(error); 
            }
            else {
                setStockExchangeData(data);
                setIsPageLoading(false);
            }
        });
    }

    const handleOnFocus = (event) => {
        event.target.placeholder = "";
        setIsInputFocused(true);
    }

    const handleOnBlur = (event) => {  
        if (!event.currentTarget.contains(event.relatedTarget)) {
            if (isInputFocused) {                
                setIsInputFocused(false);
                setIsSearching(false);
            }
        }
    }

    const handleOnSearch = () => {
        setIsSearching(true);   
    }
    
    const handleOnSelect = (item) => {
        setStock(item.symbol);
        setIsLoading(true);
        setQuote(null);
        setColor('text-primary');
    }

    const renderStockQuote = (stock) => {

        if (stock !== '') {

            finnhubClient.quote(stock, (error, data, response) => { 
                if (error) { 
                    console.error(error); 
                }
                else if (quote === null) {
                    setQuote(data.c);
                    setIsLoading(false);
                    setIsSearching(false);
                }
                else {
                    // If price rises, the quote color turns to green
                    if (data.c > quote) {
                        setQuote(data.c);
                        setColor('text-success');
                    }
                    // If price falls, the quote color turns to red
                    else if (data.c < quote) {
                        setQuote(data.c);
                        setColor('text-danger');
                    }
                }
            });
        }
    }

    useEffect(() => {    
        // Get the US Stock Exchange data as soon as everything else have been loaded
        updateStockExchangeData();
    }, []);

    useEffect(() => {    
        // Get the real-time stock quote every 3 seconds
        const intervalId = setInterval(() => {
            renderStockQuote(stock);
        }, 3000);
        renderStockQuote(stock);

        return () => {
            clearInterval(intervalId);
        };
    }, [stock, renderStockQuote]);
    
    return (
        <div className="container">
            <div className={`row row-content ${isPageLoading ? 'd-flex align-items-center' : 'hide'}`}>
                <Loading isPageLoading={isPageLoading} />
            </div>
            <div className={`row row-content ${isPageLoading ? 'hide' : ''}`}>
                <div  
                    className="col-8 offset-2 searchbox-position"
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                >
                    <ReactSearchAutocomplete 
                        items={stockExchangeData}  
                        fuseOptions={{
                            keys: [
                                "description",
                                "symbol"
                            ]          
                        }}
                        resultStringKeyName="description"
                        onSearch={handleOnSearch}
                        onSelect={(item) => handleOnSelect(item)}
                        maxResults={7}
                        placeholder={`Get the real-time US stock price you desire amongst the ${stockExchangeData.length.toLocaleString('en-US')} available`}
                        styling={{
                            boxShadow: "#5350ffcc 0px 1px 6px 0px",
                            iconColor: "#5350ffcc",
                            fontSize: "1rem",
                            fontFamily: "Calibri"
                        }}
                    />
                </div>
                <div className={`col-12 text-center ${color}`}>
                    <Loading isLoading={isLoading} />
                    <NumberFormat 
                        value={quote} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'} 
                        className={`
                            quote-size 
                            ${
                                isLoading ||
                                (!isLoading && isSearching) || 
                                (isInputFocused && isSearching) || 
                                (!isInputFocused && isSearching) 
                                ? 'hide' : ''
                            }
                        `}
                    />
                </div>
            </div>
        </div>
    );
}

export default Body;