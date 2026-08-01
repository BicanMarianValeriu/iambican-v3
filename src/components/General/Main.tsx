import React from 'react';
import classNames from 'clsx';
import { Entry as Article } from '../../routes/Page/Components';
import PortfolioArchive from '../../routes/Portfolio/Archive/Components/Entry';
import PortfolioSingle from '../../routes/Portfolio/Single/Components/Entry';
import type { WP_POST } from '@/utils/types';

export const Main = (props: {
	posts: WP_POST[];
	isSingle: boolean;
	loading: boolean;
	className: string;
}) => {

	const isSingle = () => {
		const { posts, isSingle } = props;
		return (isSingle || 1 === posts.length);
	}

	const getClasses = () => {
		const { loading, className } = props;

		const classes = ['main', isSingle() ? 'main--single' : 'main--archive', {
			'main--is-loading': loading,
			[className]: className !== undefined
		}];

		return classNames(classes);
	}

	const renderPosts = () => {
		const { posts = [], loading } = props;

		return posts.map((post: WP_POST, i: number) => {
			let postType;
			const key = post?.id ? post.id : i;
			switch (post?.type) {
				case 'portfolio': postType = isSingle() ?
					<PortfolioSingle key={post?.id} {...post} loading={loading} /> : <PortfolioArchive key={key} {...post} loading={loading} />;
					break;
				default: postType = <Article key={key} {...post} isSingle={isSingle()} loading={loading} />;
			}
			return postType;
		});
	}

	return (<main id="postsContainer" className={getClasses()}>{renderPosts()}</main>);
}

export default Main;
