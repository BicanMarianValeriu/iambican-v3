import React from 'react';
import { Link } from 'react-router';
import { HiArrowRight } from 'react-icons/hi';

import { Title, Content } from '../../../Page/Components';
import Media from '../../../../components/General/Media';

const Item = (props) => {
    const { featured_media, slug } = props;

    return (
        <article className="entry entry--portfolio portfolio relative flex flex-col h-full">
            <Link to={`/portfolio/${slug}/`}>
                <Media mediaId={featured_media} />
            </Link>
            <div className="portfolio__content transition-all ease-in-out flex flex-col items-center grow p-3 lg:p-2 xl:p-5">
                <Title className="portfolio__title text-sm md:text-xl text-center font-bold mb-3" {...props} />
                <Content className="portfolio__description hidden md:block mb-5 text-center text-zinc-500" {...props} />
                <Link to={`/portfolio/${slug}/`} className="portfolio__more flex items-center font-bold text-xs text-primary uppercase mt-auto">
                    <span className="me-2">Mai mult</span>
                    <HiArrowRight className="size-4" />
                </Link>
            </div>
        </article>
    );
}

export default Item;
