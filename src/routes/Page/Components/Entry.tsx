import React from 'react';
import classnames from 'clsx';

import { Title, Content } from '.';

export default function Article(props: {
	type: string;
	isSingle: boolean;
}) {
	const getClasses = () => {
		const { type, isSingle } = props;

		return classnames('entry', `entry--${type}`, `entry--${isSingle ? 'single' : 'archive'}`);
	}

	return (
		<article className={getClasses()}>
			{!props.isSingle && <Title {...props} />}
			<Content className="text-zinc-500" {...props} />
		</article>
	);
};
