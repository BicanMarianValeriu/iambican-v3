import React, { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import Date from './elements/Date';

// Components
const AboutExperience = () => {
	const [position, setPosition] = useState({ top: 0, bottom: 0 });
	const { width } = useWindowSize();
	const timelineBoxes = useRef(null);
	const timelineBar = useRef(null);

	const experience = [
		{
			jobTitle: "WordPress/Frontend Developer",
			company: "AM2 Studio / myZone",
			description: `Contactat de Andrej - CEO AM2Studio, pe Facebook, am stabilit un interviu și am avut un proiect simplu de realizat.
			În timp ce am fost ghidat de un dezvoltator front end senior și mi-au fost prezentate câteva instrumente noi (BEM, SCSS, GIT și altele), 
			am finalizat proiectul într-o perioadă de pregătire de aproximativ 3 săptămâni. După aceea, primul meu site dezvoltat a fost live -
			SolidEvents (nu mai este întreținut) - și am fost angajat.`,
			location: "Remote / Acasă",
			duration: {
				from: "5 May 2017",
				to: undefined,
			}
		},
		{
			jobTitle: "Freelancer",
			company: "Individual",
			description: `Lucrez în dezvoltarea web de când eram în liceu, dar am început să învăț cu adevărat
			mai multe despre asta din 2015, când am început să dezvolt propria mea temă WordPress, numită
			<a class="text-blue-500" href="https://www.wecodeart.com/" target="_blank">WeCodeArt Framework</a>. Ideea era simplă 
			- să construiesc ceva rapid și fără tone de caracteristici pe care nu le vei folosi niciodată.`,
			location: "Acasă",
			duration: {
				from: "Sep 2015",
				to: "5 May 2017",
			}
		}
	];

	useEffect(() => {
		const adjustHeight = () => {
			const firstBox = timelineBoxes.current.querySelector(`#timeline-box-1`);
			const lastBox = timelineBoxes.current.querySelector(`#timeline-box-${experience.length}`);

			let top, bottom;
			top = firstBox.offsetHeight / 2;
			bottom = lastBox.offsetHeight / 2;

			setPosition({ top, bottom });
		};

		adjustHeight();
		// eslint-disable-next-line
	}, [width, timelineBar, timelineBoxes]);


	return (
		<section id="about-experience" className="about-experience relative bg-slate-50 py-10">
			<div className="container pb-10">
				<h2 className="text-3xl font-bold uppercase mb-10">Experiență</h2>
				<div className="about-experience__timeline timeline relative ms-10">
					<div className="timeline__bar absolute inset-y-[110px] w-[3px] -ms-[32px] z-0 bg-slate-200" style={position}>
						<div className="bg-slate-900 h-full"></div>
					</div>
					<div className="timeline__boxes" ref={timelineBoxes}>{
						experience.map((item, index) => {
							const { from, to } = item.duration;
							const idPrefix = "timeline-box-";

							return (
								<article
									id={idPrefix.concat(index + 1)}
									className="timeline-boxes__item timeline-box timeline-box--animated relative mb-10 before:absolute before:top-2/4 before:-left-[30px] before:origin-center before:-translate-y-2/4 before:block before:bg-slate-200 before:w-[8px] before:h-[8px] before:-ms-[4px] before:rounded-full before:transition-all before:duration-300 before:ease-in-out"
									key={index}
								>
									<div className="timeline-box__animation drop-shadow-[0px_12px_90px_-10px_rgba(171,191,216,0.6)]">
										<div className="flex flex-wrap">
											<div className="w-full md:w-4/12 lg:w-3/12 bg-blue-600 p-5 lg:p-8">
												<div className="flex justify-between">
													<span className="text-sm">
														<span className="block text-[10px] text-white text-opacity-50 uppercase">De la:</span>
														<span className="block text-white font-medium">{from}</span>
													</span>
													<span className="text-sm">
														<span className="block text-[10px] text-white text-opacity-50 uppercase">Până la:</span>
														<span className="block text-white font-medium">{to ?? 'Prezent'}</span>
													</span>
												</div>
												<Date from={from} to={to} />
												<div className="flex flex-row md:flex-col justify-between items-center md:items-start">
													<p className="font-bold text-white">{item.company}</p>
													<span className="text-[10px] text-white text-opacity-50">{item.location}</span>
												</div>
											</div>
											<div className="w-full md:w-8/12 lg:w-9/12 bg-white p-5 lg:p-8">
												<p className="font-bold text-base md:text-xl md:mb-3">{item.jobTitle}</p>
												<p className="text-sm leading-relaxed text-slate-500 hidden md:block mb-0" dangerouslySetInnerHTML={{ __html: item.description }} />
											</div>
										</div>
									</div>
								</article>
							);
						})
					}</div>
				</div>
			</div>
		</section >
	);
}


export default AboutExperience;