import React from 'react';
import classnames from 'clsx';
import { Link } from 'react-router';
import { getTitle } from './../../../utils';

const Title = (props: {
    type?: string;
    slug?: string;
    className?: string;
    isSingle?: boolean; 
}) => {
    const { type, slug, className } = props;

    // Title
    const title = getTitle(props);

    return (
        <h1 className={classnames('entry__title text-zinc-900', {
            [className]: className !== undefined
        })}>{props.isSingle ?
            <span dangerouslySetInnerHTML={title}></span> :
            <Link to={`/${type}/${slug}/`} dangerouslySetInnerHTML={title} />
            }</h1>
    );
};

export default Title;