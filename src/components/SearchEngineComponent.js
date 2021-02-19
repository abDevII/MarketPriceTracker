import React, { Component } from 'react';
import { finnhubClient } from '../FinnhubAPI';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { onKeyDown, onKeyUp } from '../utilities/utilities.js'
import { StockLoader } from './StockLoaderComponent';
import { Error } from './ErrorComponent';

export class SearchEngine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeResult: 0,
            delta: null,
            description: '',
            filteredResults: [],
            initialQuote: null,
            isInputFocused: false,
            isLoading: false,
            isRequestSuccessful: true,
            isSearching: false,
            maxResults: 3,
            percentage: null,
            quote: null,
            quoteColor: 'text-primary',
            stock: ''  
        };

        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.renderStockQuote = this.renderStockQuote.bind(this);
    }    

    handleOnFocus() {
        this.setState({ isInputFocused: true });

        document.getElementsByTagName('input')[0].classList.add('placeholder-color');
    }

    handleOnBlur(event) {          
        let input = document.getElementsByTagName('input')[0];

        if (!event.currentTarget.contains(event.relatedTarget)) {
            if (this.state.isInputFocused) {  
                this.setState({
                    isInputFocused: false,
                    isSearching: false,
                    activeResult: 0
                });
                if (input.value === '') input.classList.remove('placeholder-color');
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
                onKeyDown(this.state.activeResult, this.state.filteredResults);
            }         
            else if (event.keyCode === 38) {
                if (this.state.activeResult !== 0) this.setState({ activeResult: this.state.activeResult - 1 });
                onKeyUp(this.state.activeResult, this.state.filteredResults);               
            }
            else if (event.keyCode === 13) { 
                event.target.blur();
                this.setState({
                    stock: this.state.activeResult > 0 ? this.state.filteredResults[this.state.activeResult - 1].symbol : this.state.filteredResults[this.state.activeResult].symbol,
                    isLoading: true,
                    description: this.state.activeResult > 0 ? this.state.filteredResults[this.state.activeResult - 1].description : this.state.filteredResults[this.state.activeResult].description,
                    delta: null,
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
            delta: null,
            percentage: null,
            initialQuote: null,
            quote: null,
            quoteColor: 'text-primary',
            isInputFocused: false,
            isSearching: false,
            activeResult: 0
        })
    }

    renderStockQuote(stock, initialQuote, quote) {
        if (stock !== '') {
            finnhubClient.quote(stock, (error, data, response) => { 
                if (response.statusCode !== 200) {
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
                    ///////////
                    // Compute and round to at most 2 decimal places
                    // - delta between current quote and the initial quote
                    // - percentage change of current quote from the initial quote
                    this.setState({ 
                        delta: Math.round(((data.c - initialQuote) + Number.EPSILON) * 100) / 100,
                        percentage: Math.round((((data.c - initialQuote) / initialQuote) + Number.EPSILON) * 100) / 100
                    });
                }
            });  
        }
    }

    componentDidMount() {
        // Get the real-time stock quote every 5 seconds
        this.intervalId = setInterval(() => {
            this.renderStockQuote(this.state.stock, this.state.initialQuote, this.state.quote);
        }, 5000);
        this.renderStockQuote(this.state.stock, this.state.initialQuote, this.state.quote);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {    
        return ( 
            <React.Fragment>
                <div  
                    className='col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 searchbox-position'
                    onFocus={this.handleOnFocus}
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
                            window.innerWidth >= 500
                            ?
                            `Get real-time US stock prices amongst the ${this.props.stockExchangeData.length.toLocaleString('en-US')} available`
                            :
                            `${this.props.stockExchangeData.length.toLocaleString('en-US')} stock prices`
                        }
                        styling={
                            {
                                boxShadow: '#5350ffcc 0px 1px 6px 0px',
                                iconColor: '#5350ffcc',
                                fontSize: '1rem',
                                fontFamily: "'Lato', sans-serif"
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
                    delta={this.state.delta}
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