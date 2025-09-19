import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const DownloadLoader = ({ color = '#08c', size = 35 }) => (
    <div className="download-loader">
        <PuffLoader color={color} loading={true} size={size} aria-label="Loading Spinner" />
    </div>
);

export default DownloadLoader;