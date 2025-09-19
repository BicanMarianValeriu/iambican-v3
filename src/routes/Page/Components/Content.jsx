import React from 'react';
import classnames from 'clsx';

import { getExcerpt, getContent } from '../../../utils/wordpress';

const Content = (props) => {
    const content = props.isSingle ? getContent(props) : getExcerpt(props);

    return (
        <div className={classnames(['entry__content is-layout-flow', props?.className, {
            [`entry__content--excerpt`]: !props.isSingle,
        }])} dangerouslySetInnerHTML={content} />
    );
}

export default Content;