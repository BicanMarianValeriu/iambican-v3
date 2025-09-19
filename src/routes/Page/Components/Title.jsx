import React from 'react';
import classnames from 'clsx';
import { Link } from 'react-router';
import { getTitle } from '../../../utils/wordpress';

const Title = props => {
    const { type, slug, className } = props;

    // Title
    const title = getTitle(props);

    // Class   
    const headingClass = classnames('entry__title text-zinc-900', {
        [className]: className !== undefined
    });

    return (
        <h1 className={headingClass}>{props.isSingle ?
            <span dangerouslySetInnerHTML={title}></span> :
            <Link to={`/${type}/${slug}/`} dangerouslySetInnerHTML={title} />
        }</h1>
    );
};

export default Title;