import React from 'react';
import classNames from 'clsx';

export const Intro = ({ title = 'Lorem ipsum dolor sit', className }: {
	title: string;
	className: string;
}) => (
	<section className={classNames('page-intro bg-primary py-16 text-white', className)}>
		<div className="container">
			<h1 className="text-3xl">{title}</h1>
		</div>
	</section>
);

export default Intro;
