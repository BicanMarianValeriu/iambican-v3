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
    XShareButton,
    WhatsappShareButton,
} from 'react-share';

export const Sharing = (props: {
    link: string;
}) => {
    const { pathname = '/' } = useLocation();

    const createUrl = () => {
        let url = `https://www.mvbican.com`;
        const { link = '' } = props;
        url = url + pathname;
        // Fallback to hardcoded just in case
        return link !== '' ? link : url;
    }

    const socialUrl = createUrl();

    const className = "rounded-full! bg-accent! hover:bg-primary!";

    return (
        <div className="portfolio__sharing absolute top-0 h-full right-[calc(100%-30px)] xl:right-[calc(100%+20px)]">
            <div className="portfolio-sharing sticky top-[80px]" >
                <FacebookShareButton url={socialUrl} className={className}><FaFacebook /></FacebookShareButton>
                <LinkedinShareButton url={socialUrl} className={className}><FaLinkedin /></LinkedinShareButton>
                <XShareButton url={socialUrl} className={className}><FaTwitter /></XShareButton>
                <WhatsappShareButton url={socialUrl} className={className}><FaWhatsapp /></WhatsappShareButton>
            </div>
        </div>
    );
};

export default Sharing;