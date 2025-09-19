import React from 'react';
import ContentLoader from 'react-content-loader';

const Rect = ({ className = 'rounded-md', width = 100, height = 10, ...props }) => (
    <ContentLoader className={className} viewBox={`0 0 ${parseInt(width)} ${parseInt(height)}`} width={width} height={height} {...props} preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
)

export default Rect;