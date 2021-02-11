import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { StockLoader } from './StockLoaderComponent';
import { Error } from './ErrorComponent';

///////////////////////////////////
// Requirements to use Finnhub API 
// Finnhub API allows us to get real-time quote data for US stocks
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// Hide the API key
api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

export class SearchEngine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRequestSuccessful: true,
            isInputFocused: false,
            isSearching: false,
            activeResult: 0,
            maxResults: 3,
            filteredResults: [],
            stock: '',
            isLoading: false,
            description: '',
            percentage: null,
            initialQuote: null,
            quote: null,
            quoteColor: 'text-primary',
        };

        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.renderStockQuote = this.renderStockQuote.bind(this);
    }    

    handleOnFocus(event) {
        event.target.placeholder = '';
        this.setState({ isInputFocused: true });
    }

    handleOnBlur(event) {  
        if (!event.currentTarget.contains(event.relatedTarget)) {
            if (this.state.isInputFocused) {  
                this.setState({
                    isInputFocused: false,
                    isSearching: false,
                    activeResult: 0
                });
            }
        }
    }

    handleOnSearch(string, results) {
        this.setState({
            isSearching: true,
            filteredResults: [...results]
        });
    }
        
    handleOnKeyDown(event) {        
        if (this.state.isSearching) {
            if (event.keyCode === 40) {
                if (this.state.activeResult < this.state.maxResults - 1) this.setState({ activeResult: this.state.activeResult + 1 });
                if (this.state.activeResult === 0) {
                    document.querySelector(`[title='${this.state.filteredResults[this.state.activeResult].description}']`).parentNode.classList.add('my-style');
                }
                else {
                    document.querySelector(`[title='${this.state.filteredResults[this.state.activeResult].description}']`).parentNode.classList.add('my-style');
                    document.querySelector(`[title='${this.state.filteredResults[this.state.activeResult - 1].description}']`).parentNode.classList.remove('my-style');
                }
            }
            else if (event.keyCode === 38) {
                if (this.state.activeResult === 0) {
                    document.querySelector(`[title='${this.state.filteredResults[this.state.activeResult].description}']`).parentNode.classList.remove('my-style');
                }
                else {
                    this.setState({ activeResult: this.state.activeResult - 1 });
                    document.querySelector(`[title='${this.state.filteredResults[this.state.activeResult - 1].description}']`).parentNode.classList.add('my-style');
                    document.querySelector(`[title='${this.state.filteredResults[this.state.activeResult].description}']`).parentNode.classList.remove('my-style');
                }
            }
            else if (event.keyCode === 13) { 
                event.target.blur();
                this.setState({
                    stock: this.state.activeResult > 0 ? this.state.filteredResults[this.state.activeResult - 1].symbol : this.state.filteredResults[this.state.activeResult].symbol,
                    isLoading: true,
                    description: this.state.activeResult > 0 ? this.state.filteredResults[this.state.activeResult - 1].description : this.state.filteredResults[this.state.activeResult].description,
                    percentage: null,
                    initialQuote: null,
                    quote: null,
                    quoteColor: 'text-primary',
                    isInputFocused: false,
                    isSearching: false,
                    activeResult: 0
                });
            }
        }
    }

    handleOnSelect(item) {
        this.setState({
            stock: item.symbol,
            isLoading: true,
            description: item.description,
            percentage: null,
            initialQuote: null,
            quote: null,
            quoteColor: 'text-primary',
            isInputFocused: false,
            isSearching: false,
            activeResult: 0
        })
    }

    renderStockQuote(stock, quote) {
        if (stock !== '') {
            finnhubClient.quote(stock, (error, data, response) => { 
                if (response.statusCode === 429) {
                    this.setState({
                        isRequestSuccessful: false,
                        isLoading: false,
                        description: ''
                    });
                }
                else if (quote === null) {
                    this.setState({
                        initialQuote: data.c,
                        quote: data.c,
                        isLoading: false
                    }); 
                }
                else {
                    // If price rises, the quote color turns to green
                    if (data.c > quote) {
                        this.setState({
                            quote: data.c,
                            quoteColor: 'text-success'
                        }); 
                    }
                    // If price falls, the quote color turns to red
                    else if (data.c < quote) {
                        this.setState({
                            quote: data.c,
                            quoteColor: 'text-danger'
                        }); 
                    }
                    // Compute percentage change of current quote from the initial quote
                    this.setState({ percentage: ((data.c - quote) / quote).toFixed(2) });
                }
            });  
        }
    }

    componentDidMount() {
        // Get the real-time stock quote every 5 seconds
        this.intervalId = setInterval(() => {
            this.renderStockQuote(this.state.stock, this.state.quote);
        }, 5000);
        this.renderStockQuote(this.state.stock, this.state.quote);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return ( 
            <React.Fragment>
                <div  
                    className='col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 searchbox-position'
                    onFocus={(event) => this.handleOnFocus(event)}
                    onKeyDown={(event) => this.handleOnKeyDown(event)}
                    onBlur={(event) => this.handleOnBlur(event)}
                >
                    <ReactSearchAutocomplete 
                        items={this.props.stockExchangeData}  
                        fuseOptions={{
                            keys: [
                                'description',
                                'symbol'
                            ]          
                        }}
                        resultStringKeyName='description'
                        onSearch={(string, results) => this.handleOnSearch(string, results)}
                        onSelect={(item) => this.handleOnSelect(item)}
                        maxResults={this.state.maxResults}
                        placeholder={
                            window.innerWidth >= 768
                            ?
                            `Get the real-time US stock price you desire amongst the ${this.props.stockExchangeData.length.toLocaleString('en-US')} available`
                            :
                            `Get one of the ${this.props.stockExchangeData.length.toLocaleString('en-US')} real-time US stock prices available`
                        }
                        styling={
                            {
                                boxShadow: '#5350ffcc 0px 1px 6px 0px',
                                iconColor: '#5350ffcc',
                                fontSize: '1rem',
                                fontFamily: 'Calibri'
                            }
                        }
                    />
                </div>
                <StockLoader 
                    isLoading={this.state.isLoading} 
                    isInputFocused={this.state.isInputFocused}
                    isSearching={this.state.isSearching}
                    description={this.state.description}
                    quote={this.state.quote}
                    quoteColor={this.state.quoteColor} 
                    percentage={this.state.percentage}
                />
                <Error 
                    isRequestSuccessful={this.state.isRequestSuccessful}
                    isLoading={this.state.isLoading}
                    stockExchangeData={this.props.stockExchangeData}
                />
            </React.Fragment>
        );
    }
}