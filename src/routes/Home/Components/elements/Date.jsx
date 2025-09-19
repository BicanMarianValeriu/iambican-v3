"use client";

import React from 'react';
import { humanDuration } from '../../../../utils';

const Component = ({ from, to, className = 'mb-5 text-[10px] text-white text-opacity-70 uppercase' }) => (
    <p className={className}>({humanDuration({ from, to })})</p>
);

export default Component;