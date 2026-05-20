import React, { useEffect } from 'react';
import About from './Components/About';
import Experience from './Components/Experience';
import Skills from './Components/Skills';

const Home = () => {
	useEffect(() => window.scrollTo(0, 0));

	return (
		<div className="content" id="content">
			<About />
			<Experience />
			<Skills />
		</div>
	);
}

export default Home;