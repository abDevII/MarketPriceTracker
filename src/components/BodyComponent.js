import React, { Component } from 'react';
import { InputGroup, Input, Button, Form } from 'reactstrap';
import { Loading } from './LoadingComponent';
import NumberFormat from 'react-number-format';

///////////////////////////////////
// Requirements to use Finnhub API 
// Finnhub API allows us to get real-time quote data for US stocks
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// Hide the API key
api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

class Body extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            stock: '',
            quote: null,
            color: 'text-primary',
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderStockQuote = this.renderStockQuote.bind(this);
    }

    handleSubmit(event) {
        this.setState({
            stock: this.stock.value,
            quote: null,
            isLoading: true
        });
        event.preventDefault();
    }

    renderStockQuote(stock) {
        if (stock !== '') {
            finnhubClient.quote(stock, (error, data, response) => {
                if (error) { 
                    return console.log(error); 
                }
                else if (this.state.quote === null) {
                    this.setState({
                        quote: data.c,
                        isLoading: false
                    });
                }
                else {
                    // If price rises, the quote color turns to green
                    if (data.c > this.state.quote) {
                        this.setState({
                            quote: data.c,
                            color: 'text-success'
                        });
                    }
                    // If price falls, the quote color turns to red
                    else if (data.c < this.state.quote) {
                        this.setState({
                            quote: data.c,
                            color: 'text-danger'
                        });
                    }
                }
            });
        }
    }

    // Get the stock quote every 3 seconds
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.renderStockQuote(this.state.stock)
        }, 3000);
        this.renderStockQuote(this.state.stock);
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    
    render() {

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit}>
                            <InputGroup>
                                <Input placeholder="Enter Stock's symbol (e.g. 'FB' for Facebook)" innerRef={(input) => this.stock = input} />
                                <Button type="submit" value="submit" color="primary">Enter</Button>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className= {`col-12 text-center ${this.state.color}`}>
                        <Loading isLoading={this.state.isLoading} />
                        <NumberFormat value={this.state.quote} displayType={'text'} thousandSeparator={true} prefix={'$'} className="figure-size"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;