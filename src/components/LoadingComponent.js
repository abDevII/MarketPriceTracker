import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = (props) => {
    if (props.isLoading) {
        return(
            <div className="col-12 text-center">
                <Spinner type="grow" color="primary" />
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
};