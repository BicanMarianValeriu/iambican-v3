import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const Social = () =>
    <ul className="footer__social social social--footer flex gap-2">
        <li className="social__item align-middle">
            <a href="https://www.facebook.com/mvbican/" rel="noopener noreferrer" target="_blank" aria-label="Bican's Facebook profile">
                <FaFacebook />
            </a>
        </li>
        <li className="social__item align-middle">
            <a href="https://www.linkedin.com/in/mvbican/" rel="noopener noreferrer" target="_blank" aria-label="Bican's LinkedIn profile">
                <FaLinkedin />
            </a>
        </li>
    </ul>;

export default Social;
