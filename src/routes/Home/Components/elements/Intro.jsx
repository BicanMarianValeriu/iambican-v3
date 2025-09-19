import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useWindowSize, useMouseHovered } from 'react-use';

import Bican from './../../../../static/images/bican.jpg';
import BicanCartoon from './../../../../static/images/bican-cartoon.jpg';

const Component = () => {
    const imageRef = useRef(null);
    const { elX, elY } = useMouseHovered(imageRef);
    const { width: windowWidth } = useWindowSize();

    useEffect(() => {
        const images = Array.from(imageRef.current.querySelectorAll('div'));

        if (images.length) {
            setInterval(() => {
                const randomImg = images[Math.floor(Math.random() * images.length)];
                images.forEach((img) => img.classList.remove('shown'));
                randomImg.classList.add('shown');
            }, 5000);
        }
    }, []);

    useEffect(() => {
        const animateImage = (e, scale = 1, rotateX = null, rotateY = null) => {
            const image = e.target.closest('.about-me__profile');
            const getRotation = (a, axis, s) => a * ((axis / s) * 100 - 50);
    
            animate(image, { 
                rotateY: rotateY !== null ? rotateY : getRotation(0.2, elX, image.offsetWidth),
                rotateX: rotateX !== null ? rotateX : getRotation(-0.2, elY, image.offsetHeight),
                scale,
                easing: 'easeOutElastic',
                perspective: 650,
            });
        };

        const imageEl = imageRef.current;
        const onMouseMove = (e) => animateImage(e, 1.05);
        const onMouseLeave = (e) => animateImage(e, 1, 0, 0);

        if (windowWidth > 991) {
            imageEl.addEventListener('mousemove', onMouseMove);
            imageEl.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
            imageEl.removeEventListener('mousemove', onMouseMove);
            imageEl.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [windowWidth, elX, elY]);

    return (
        <div className="about-me__intro overflow-hidden lg:overflow-visible lg:py-10">
            <div className="container py-10">
                <div className="flex flex-wrap items-center lg:items-start">
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-10 md:mb-0">
                        <div className="about-me__image-wrap relative z-10">
                            <div ref={imageRef} className="about-me__profile relative lg:absolute lg:top-[-70px] bg-white w-full block z-10 shadow-[0_1rem_3rem_rgba(0,0,0,0.35)]">
                                <div className="shown" style={{ backgroundImage: `url('${BicanCartoon}')` }} />
                                <div style={{ backgroundImage: `url('${Bican}')` }} />
                                <svg className="about-me__profile-decoration" viewBox="0 0 300 415">
                                    <path d="M20.5,20.5h260v375h-260V20.5z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4 md:ps-5 lg:ps-10 self-end">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-none mb-4 [text-shadow:_0_5px_10px_rgb(0_0_0_/_30%)]">Bican Marian Valeriu</h1>
                        <p className="text-sm lg:text-xl leading-none mb-2 md:mb-3">WordPress/React Developer at myZone/AM2Studio</p>
                        <p className="text-md md:text-xl leading-none mb-1 md:mb-2">Targu Jiu, Gorj, Romania</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component;
