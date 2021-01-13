import React from 'react';
import { Spinner } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'

export const Loading = (props) => {

    if (props.isPageLoading) {

        const pageLoadingHTMLMessage = '<p>Please wait while I am collecting data from the US Stock Exchanges . . .</p>'
            
        return(
            <div className="col-12 text-center text-primary">
                <div className="col-12 text-center">
                    <Spinner color="primary" />
                </div>
                <div className="col-12 text-center pt-3">
                    { ReactHtmlParser(pageLoadingHTMLMessage) }
                </div>
            </div>
        );
    }
    else if (props.isLoading) {
        return(
            <div className="col-12 text-center">
                <Spinner style={{ width: '2rem', height: '2rem', animationDuration: '1.25s' }} type="grow" color="primary" />
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
};