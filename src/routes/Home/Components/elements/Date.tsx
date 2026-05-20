"use client";

import React from 'react';
import { humanDuration } from './../../../../utils';
import { ClientOnly } from './../../../../components/layout/ClientOnly';
import { Skeleton } from './../../../../components/ui/skeleton';

const Component = ({ from, to, className = 'mb-5 text-[10px] text-white text-opacity-70 uppercase' }: {
    from: any;
    to: any;
    className: string;
}) => (
    <p className={className}>(<ClientOnly fallback={<Skeleton className="w-16 h-4 rounded-md"/>}>
    {humanDuration({ from, to })}    
    </ClientOnly>)</p>
);

export default Component;