import React from 'react';
import Meta from './Meta'; 
import Sharing from './Sharing';
import Questions from './Questions';
import { Title, Content } from './../../../Page/Components';

const Article = (props) => {
	return (
		<article className="entry entry--single entry--portfolio portfolio">
			<div className="portfolio__header bg-slate-100">
				<div className="container py-5 lg:py-10">
					<Title className="text-2xl sm:text-3xl font-bold text-center mb-5" isSingle={true} {...props} />
					<p className="text-center mb-5 lg:mb-10">Un proiect uimitor dezvoltat cu dragoste.</p>
					<Meta {...props} />
				</div>
			</div>
			<div className="portfolio__content">
				<div className="container">
					<div className="flex flex-wrap lg:flex-nowrap gap-5 py-5 md:py-10">
						<div className="w-full lg:w-3/5 relative">
							<Sharing {...props} />
							<Content {...{ ...props, className: 'ps-10 xl:ps-0', isSingle: true }} />
						</div>
						<div className="w-full lg:w-2/5 grow mt-3 lg:mt-0 flex flex-col gap-5 lg:gap-8">
							<Questions {...props} />
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default Article;
