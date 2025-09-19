"use client";

import React from 'react';
import { useLocation } from 'react-router';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp
} from 'react-icons/fa6';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';

const Sharing = (props) => {
    const { pathname = '/' } = useLocation();

    const createUrl = () => {
        let url = `https://www.mvbican.com`;
        const { link = '' } = props;
        url = url + pathname;
        // Fallback to hardcoded just in case
        return link !== '' ? link : url;
    }

    const socialUrl = createUrl();

    return (
        <div className="portfolio__sharing absolute top-0 h-full right-[calc(100%_-_30px)] xl:right-[calc(100%_+_20px)]">
            <div className="portfolio-sharing sticky top-[80px]" >
                <FacebookShareButton url={socialUrl} ><FaFacebook /></FacebookShareButton>
                <LinkedinShareButton url={socialUrl} ><FaLinkedin /></LinkedinShareButton>
                <TwitterShareButton url={socialUrl} ><FaTwitter /></TwitterShareButton>
                <WhatsappShareButton url={socialUrl} ><FaWhatsapp /></WhatsappShareButton>
            </div>
        </div>
    );
};

export default Sharing;