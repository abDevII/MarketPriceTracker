import React from 'react';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container">
                <div className="row">             
                    <div className="col-12">
                        <div className="col-3 d-inline-block text-center">
                            <a className="btn btn-social-icon btn-github-square btn-primary" href="https://github.com/abDevII"><i className="fa fa-github-square"></i></a>
                        </div>
                        <div className="col-3 d-inline-block text-center">
                            <a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/arthur-j-barbey/"><i className="fa fa-linkedin"></i></a>
                        </div>
                        <div className="col-3 d-inline-block text-center">
                            <a className="btn btn-social-icon btn-twitter" href="https://twitter.com/BarbeyArthur"><i className="fa fa-twitter"></i></a>
                        </div>
                        <div className="col-3 d-inline-block text-center">
                            <a className="btn btn-social-icon btn-primary" href="mailto:barbey.arthur@gmail.com"><i className="fa fa-envelope-square"></i></a>       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
