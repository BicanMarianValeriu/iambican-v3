import React from 'react';
import { Link } from 'react-router';
import scrollToElement from 'scroll-to-element';
import { PiGraduationCap } from 'react-icons/pi';
import { HiOutlineBriefcase, HiOutlineEnvelope } from 'react-icons/hi2';

const Component = () => (
    <div className="about-me__links relative bg-white">
        <div className="container px-0 lg:px-5">
            <div className="flex lg:justify-end">
                <div className="w-full lg:w-3/4 lg:ms-auto flex lg:ps-10 border-b">
                    <div className="w-1/3 text-center">
                        <a href="#about-experience" className="block p-5 text-blue-500" onClick={() => scrollToElement('#about-experience', {
                            offset: -55,
                        })} title="Mergi la Experiență">
                            <PiGraduationCap className="inline-block size-5 md:me-3" />
                            <span className="hidden md:inline-block">Experiență</span>
                        </a>
                    </div>
                    <div className="w-1/3 text-center border-x">
                        <Link to="/contact/" className="block p-5 text-blue-500" title="Mergi la Contact">
                            <HiOutlineEnvelope className="inline-block size-5 md:me-3" />
                            <span className="hidden md:inline-block">Contact</span>
                        </Link>
                    </div>
                    <div className="w-1/3 text-center lg:border-e">
                        <Link to="/portfolio/" className="block p-5 text-blue-500" title="Vezi Portfoliu">
                            <HiOutlineBriefcase className="inline-block size-5 md:me-3" />
                            <span className="hidden md:inline-block">Vezi Portfoliu</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Component;