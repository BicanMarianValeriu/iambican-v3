import React from 'react';
import ContentLoader from 'react-content-loader';

const Content = props => (
    <ContentLoader viewBox="0 0 400 260" width="100%" {...props}>
        <rect x="0" y="0" rx="4" ry="4" width="300" height="15" />
        <rect x="0" y="20" rx="4" ry="4" width="100" height="10" />
        <rect x="0" y="45" rx="4" ry="4" width="350" height="10" />
        <rect x="0" y="60" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="75" rx="4" ry="4" width="100" height="10" />
        <rect x="0" y="100" rx="5" ry="5" width="400" height="160" />
    </ContentLoader>
)

export default Content;