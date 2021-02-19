import React, { Component } from 'react';
import { finnhubClient } from '../FinnhubAPI.js';
import { Error } from './ErrorComponent';
import { LoadingPage } from './LoadingPageComponent';
import { LoadedPage } from './LoadedPageComponent';

export class Body extends Component {
     
    constructor(props) {
        super(props);
    
        this.state = {
            isPageLoading: true,
            stockExchangeData: [],
            isRequestSuccessful: true
        };

        this.updateStockExchangeData = this.updateStockExchangeData.bind(this);
    }
 
    updateStockExchangeData() {
        finnhubClient.stockSymbols('US', (error, data, response) => {
            console.log(response);
            if (response.statusCode !== 200) { 
                this.setState({
                    isRequestSuccessful: false,
                    isPageLoading: false
                });
            }
            else {
                const dataWithIds = data.map((item, idx) => ({
                    ...item,
                    id: item.description
                  }))
                this.setState({
                    stockExchangeData: dataWithIds,
                    isPageLoading: false
                });
            }
        });
    }
    
    componentDidMount() {
        // Get the US Stock Exchange data as soon as everything else have been loaded
        this.updateStockExchangeData();
    }    
                     
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {          
        return (
            <div className='container main'>
                <Error 
                    isRequestSuccessful={this.state.isRequestSuccessful}
                    isLoading={this.state.isPageLoading}
                    stockExchangeData={this.state.stockExchangeData}
                />
                <LoadingPage 
                    isRequestSuccessful={this.state.isRequestSuccessful}
                    isPageLoading={this.state.isPageLoading}
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