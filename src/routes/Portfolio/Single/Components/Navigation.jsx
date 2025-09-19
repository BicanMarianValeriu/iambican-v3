import React from 'react';
import { Link } from 'react-router';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlineBriefcase } from 'react-icons/hi';

const Navigation = ({ navigation = {} } = {}) => {

    const renderLink = (context) => {
        const obj = navigation && navigation[context];

        let classes = ['portfolio-nav__item', 'portfolio-nav__item--' + context, 'relative'];

        if (obj) {
            classes = [...classes, 'text-blue-500'];
        }

        classes = [...classes, 'inline-block'];

        if (!obj) {
            classes = [...classes, 'portfolio-nav__item--disabled', 'text-slate-300', 'pointer-events-none'];
        }

        const label = (context === 'prev') ? 'ANTERIORUL' : 'URMATORUL';

        const link = obj ? `/portfolio/${obj.slug}/` : '/';
        const title = obj ? obj.title : 'Lorem ipsum dolor';

        return (
            <Link className={classes.join(' ')} to={link}>
                <div className="flex items-center">
                    {context === 'prev' && <HiChevronDoubleLeft className="size-5 me-3" />}
                    <div className="hidden sm:block">
                        <span className="text-sm">{label}</span>
                        <h4 className="font-bold mb-0">{title}</h4>
                    </div>
                    {context === 'next' && <HiChevronDoubleRight className="size-5 ms-3" />}
                </div>
            </Link>
        );
    }

    return (
        <div className="portfolio-nav relative bg-white py-5">
            <div className="container max-w-full">
                <div className="flex justify-between items-center">
                    <div className="w-1/3">{renderLink('prev')}</div>
                    <div className="w-1/3 text-center">
                        <ul className="flex justify-center text-sm">
                            <li className="text-blue-500"><Link to="/">Acasă</Link></li>
                            <li><HiChevronDoubleRight className="inline-block size-3 text-slate-500 mx-2" /></li>
                            <li className="text-slate-500">Portofoliu</li>
                        </ul>
                        <Link to="/portfolio/" className="font-bold text-sm text-black hover:text-blue-500 flex justify-center items-center mt-2">
                            <HiOutlineBriefcase className="inline-block size-5 me-2" />
                            <span>VEZI TOT</span>
                        </Link>
                    </div>
                    <div className="w-1/3 text-right">{renderLink('next')}</div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
