import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='row'>             
                    <div className='col-12'>
                        <div className='col-3 d-inline-block text-center'>
                            <a 
                                className='btn btn-social-icon btn-github-square btn-primary btn-third-dimension' 
                                href='https://github.com/abDevII' 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                <FontAwesomeIcon icon={faGithubSquare} />
                            </a>
                        </div>
                        <div className='col-3 d-inline-block text-center'>
                            <a 
                                className='btn btn-social-icon btn-linkedin btn-third-dimension' 
                                href='https://www.linkedin.com/in/arthur-j-barbey/' 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                        <div className='col-3 d-inline-block text-center'>
                            <a 
                                className='btn btn-social-icon btn-twitter btn-third-dimension' 
                                href='https://twitter.com/BarbeyArthur' 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                <FontAwesomeIcon icon={faTwitterSquare} />
                            </a>
                        </div>
                        <div className='col-3 d-inline-block text-center'>
                            <a 
                                className='btn btn-social-icon btn-primary btn-third-dimension' 
                                href='mailto:barbey.arthur@gmail.com' 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                <FontAwesomeIcon icon={faEnvelopeSquare} />
                            </a>       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}