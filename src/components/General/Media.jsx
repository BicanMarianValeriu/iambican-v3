"use client";

import React from 'react';
import { useImage } from 'react-image';
import classNames from 'clsx';
import Loader from './Loader';
import placeholder from './../../static/images/placeholder-bold.png';
import { requestApi } from '../../utils/wordpress';
import { useQuery } from 'react-query';

function useMedia(mediaId) {
    return useQuery({
        queryKey: ['media', mediaId],
        queryFn: () => getMediaById(mediaId),
        enabled: !!mediaId,
        staleTime: 60000,
    });
}

const getMediaById = async (mediaId) => {
    const { data } = await requestApi.get(`wp/v2/media/${mediaId}`);

    return data;
}

const Image = ({ image }) => {
    const {
        alt_text,
        media_details: {
            sizes: {
                thumbnail: { source_url: lowRes = '' } = {},
                medium_large: { source_url: highRes = '' } = {}
            } = {}
        } = {}
    } = image || {};

    const { src, isLoading } = useImage({
        srcList: [highRes, lowRes, placeholder],
        useSuspense: false
    });

    return (
        <img
            className={classNames(
                'wp-media__src',
                { 'wp-media__src--loading': isLoading },
                { 'wp-media__src--holder': src === placeholder },
                ...['absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'w-full', 'min-h-full', 'object-cover']
            )}
            src={src}
            alt={alt_text}
        />
    );
}

const Media = ({ mediaId }) => {
    const { data, isLoading } = useMedia(mediaId);

    const className = classNames(
        'wp-media',
        { 'wp-media--loading': isLoading },
        ...[
            'relative', 'overflow-hidden', 'before:absolute', 'before:z-[5]',
            'before:top-[13px]', 'before:left-[13px]', ' before:right-[13px]', 'before:bottom-[-10px]', 'sm:before:bottom-[-15px]',
            'before:border-[10px]', 'md:before:border-[15px]', 'before:border-white/50', 'md:before:border-white'
        ]
    );

    return (
        <div className={className}>
            <div className="wp-media__ratio bg-accent before:relative before:block before:h-0 before:pb-[56.15%] transition-[inherit]">
                {isLoading ? <Loader /> : <Image image={data} />}
            </div>
        </div>
    );
}

export default Media;