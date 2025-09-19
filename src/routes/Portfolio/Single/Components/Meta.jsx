import React from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';

const ClientDisplay = ({ client = {}, className = 'font-bold' }) => {
	const { name = 'N/A' } = client;

	return <span className={className}>{name}</span>;
};

const DateDisplay = ({ date, className = 'font-bold', options = { year: 'numeric', month: 'long' } }) => {
	const dateDisp = new Date(date).toLocaleDateString('ro-RO', options);

	return <time dateTime={date} className={className}>{dateDisp}</time>;
};

const CostDisplay = ({ meta = {}, className = 'font-bold' }) => {
	const count = meta ? parseInt(meta.cost) : 0;

	return (
		<span className={className}>
			{count === 0 ? 'Priceless' : Array.from({ length: count }, (_, index) => (
				<span key={index} className="inline-block me-2">
					<HiCurrencyDollar key={index} className="size-4 text-slate-500" />
				</span>
			))}
		</span>
	);
};

const WebsiteDisplay = ({ meta = {}, className = 'font-bold' }) => {
	const { website = '' } = meta;

	const props = {
		className: 'text-blue-500 hover:text-blue-600',
		rel: 'noopener noreferrer',
		href: website,
		title: website,
		target: '_blank'
	};

	return (
		<span className={className}>{website === '' ? 'N/A' : <a {...props}>Vezi site</a>}</span>
	);
};

const Component = ({ client, date_gmt: date, acf }) => {
	const { meta } = acf;

	return (
		<div className="portfolio__meta portfolio-meta">
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
				<div className="portfolio-meta__item">
					<span className="font-light text-sm uppercase" title="Client">Client</span>
					<hr className="my-2 text-slate-200" />
					<ClientDisplay client={client} />
				</div>
				<div className="portfolio-meta__item">
					<span className="font-light text-sm uppercase" title="Cost Range">Cost</span>
					<hr className="my-2 text-slate-200" />
					<CostDisplay meta={meta} />
				</div>
				<div className="portfolio-meta__item">
					<span className="font-light text-sm uppercase" title="Went Live">Data</span>
					<hr className="my-2 text-slate-200" />
					<DateDisplay date={date} />
				</div>
				<div className="portfolio-meta__item">
					<span className="font-light text-sm uppercase" title="Live URL">Link</span>
					<hr className="my-2 text-slate-200" />
					<WebsiteDisplay meta={meta} />
				</div>
			</div>
		</div>
	);
};

export default Component;
