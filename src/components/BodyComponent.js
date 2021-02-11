import React, { Component } from 'react';
import { Error } from './ErrorComponent';
import { LoadingPage } from './LoadingPageComponent';
import { LoadedPage } from './LoadedPageComponent';

///////////////////////////////////
// Requirements to use Finnhub API 
// Finnhub API allows us to get real-time quote data for US stocks
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// Hide the API key
api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

export class Body extends Component {
     
    constructor(props) {
        super(props);
    
        this.state = {
            isPageLoading: true,
            stockExchangeData: [],
            isRequestSuccessful: true,
            dots: 1
        };

        this.updateStockExchangeData = this.updateStockExchangeData.bind(this);
    }
 
    updateStockExchangeData() {
        finnhubClient.stockSymbols('US', (error, data, response) => {
            if (response.statusCode === 429) { 
                this.setState({
                    isRequestSuccessful: false,
                    isPageLoading: false
                });
            }
            else {
                this.setState({
                    stockExchangeData: data,
                    isPageLoading: false
                });
            }
        });
    }
    
    componentDidMount() {
        // Get the US Stock Exchange data as soon as everything else have been loaded
        this.updateStockExchangeData();

        // Add up to 3 dots to the message while loading Stock Exchange data
        this.intervalId = setInterval(() => {
            this.setState({ dots: this.state.dots === 3 ? 0 : this.state.dots + 1 });
        }, 300);
    }    
                     
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {          
        
        let dotsAnimation = this.state.dots === 0 ? '' : ' .'.repeat(this.state.dots);

        return (
            <div className='container'>
                <Error 
                    isRequestSuccessful={this.state.isRequestSuccessful}
                    isLoading={this.state.isPageLoading}
                    stockExchangeData={this.state.stockExchangeData}
                />
                <LoadingPage 
                    isRequestSuccessful={this.state.isRequestSuccessful}
                    isPageLoading={this.state.isPageLoading}
                    dotsAnimation={dotsAnimation} 
                />
                <LoadedPage 
                    isRequestSuccessful={this.state.isRequestSuccessful}
                    isPageLoading={this.state.isPageLoading}
                    stockExchangeData={this.state.stockExchangeData}
                /> 
            </div>
        );
    }
}