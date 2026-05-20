import React from 'react';

// Components
import AboutMeIntro from './elements/Intro';
import AboutMeInfo from './elements/Info';
import AboutMeLinks from './elements/Links';

const Component = () => {
	return (
		<section id="about-me" className="about-me relative bg-blue-600 text-white lg:pt-24">
			<AboutMeIntro />
			<AboutMeLinks />
			<AboutMeInfo />
		</section>
	);
}

export default Component;
