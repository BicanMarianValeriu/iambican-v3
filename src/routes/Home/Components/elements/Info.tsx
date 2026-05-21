import React, { useEffect, useRef, useState } from 'react';

const AboutContent = () => {
    const [willOpen, setWillOpen] = useState(true);
    const descriptionRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const buttonEl = btnRef.current;

        const toggleDescription = () => {
            if (willOpen) {
                descriptionRef.current.classList.add('about-me__content-text--opened');
                btnRef.current.innerHTML = btnRef.current.getAttribute('data-less');
                setWillOpen(false);
            } else {
                descriptionRef.current.classList.remove('about-me__content-text--opened');
                btnRef.current.innerHTML = btnRef.current.getAttribute('data-more');
                setWillOpen(true);
            }
        };

        buttonEl.addEventListener('click', toggleDescription);

        return () => {
            buttonEl.removeEventListener('click', toggleDescription);
        };
    }, [willOpen]);

    return (
        <div className="about-me__content bg-white text-slate-500 py-10 lg:pt-24">
            <div className="container">
                <div className="w-full lg:w-1/2 p-5 mb-10 lg:ms-10 lg:p-10 lg:float-right rounded shadow-md relative z-[10]">
                    <p className="font-bold text-gray-900 mb-3">Detalii personale</p>
                    <div className="flex flex-col md:flex-row text-sm">
                        <div className="md:w-1/3">
                            <ul className="list-unstyled uppercase mb-0">
                                <li><span>Născut:</span> 02-08-1993</li>
                                <li><span>Naționalitate:</span> Roman</li>
                            </ul>
                        </div>
                        <div className="md:w-2/3">
                            <ul className="list-unstyled uppercase mb-0">
                                <li><span>Telefon:</span> <a className="text-blue-500" href="tel:+40761176106">+40761176106</a></li>
                                <li><span>eMail:</span> <a className="text-blue-500" href="mailto:marianvaleriubican@gmail.com">mvbican@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-5 text-gray-900 uppercase">Despre Mine</h2>
                <div className="about-me__content-text relative pb-10" ref={descriptionRef}>
                    <p className="mb-5">Sunt Bican Marian Valeriu, un dezvoltator web full stack din Târgu Jiu, România, cu peste opt ani de experiență în crearea de soluții digitale eficiente și inovatoare. Expertiza mea acoperă întregul ecosistem web, lucrând predominant cu JavaScript, CSS3, HTML5 și PHP (WordPress).</p>
                    <p className="mb-5">Sunt pasionat de tehnologiile web moderne și open source, urmărind constant tendințele din industrie și explorând noi modalități de optimizare și inovație. Îmi place să împărtășesc cunoștințele acumulate prin proiectele la care lucrez, precum și prin articole și tutoriale menite să ajute comunitatea de dezvoltatori.</p>
                    <p className="mb-5">Deși am absolvit Facultatea de Drept și Filologie (Engleză) la Universitatea UCB din Târgu Jiu, pasiunea mea pentru tehnologie m-a determinat să urmez o carieră în dezvoltarea web. În 2024, am decis să îmi aprofundez cunoștințele tehnice printr-un nou program de studii la Facultatea de Inginerie – Automatică & Informatică din cadrul Universității din Târgu Jiu.</p>
                    <p className="mb-5">Îmi place să construiesc soluții web scalabile și optimizate, iar fiecare proiect este pentru mine o oportunitate de a îmbina creativitatea cu tehnologia. Sunt mereu deschis la noi provocări și colaborări care să ducă la crearea unor produse digitale de impact.</p>
                </div>
                <button className="font-bold hover:text-blue-500" data-less="mai puțin" data-more="mai mult" ref={btnRef}>mai mult</button>
            </div>
        </div>
    );
};

export default AboutContent;
