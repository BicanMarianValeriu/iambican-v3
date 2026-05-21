import React from 'react';
import { HiPhoto } from 'react-icons/hi2';

const AboutSkills = () => {

    const skills = [
        {
            title: "React JS",
            description: `Unul dintre motivele (după ES6+) pentru am început să iubesc atât de mult Javascript și pentru că poți face SPA-uri super rapide.`,
        },
        {
            title: "WordPress",
            description: `Cele mai bune lucruri din viață sunt <strong class="text-font--cursive">gratuite</strong>, iar WordPress este unul dintre ele. După cum spune Automatic: "Code is poetry".`,
        },
        {
            title: "WooCommerce",
            description: `Acesta este pluginul meu preferat WP pentru construirea de magazine uimitoare. Îmi place pentru că este foarte personalizabil.`,
        },
        {
            title: "CSS3/SCSS/BEM",
            description: `Nu ești un dezvoltator web bun fără CSS3. Folosesc SASS/SCSS și BEM pentru cod minunat/lizibil.`,
        },
        {
            title: "GIT/Bitbucket",
            description: `Două dintre serviciile mele preferate pentru controlul versiunilor. Le folosesc cu Bitbucket Desktop APP pentru a-mi gestiona depozitele.`,
        },
        {
            title: "GULP/WEBPACK",
            description: `Sunt familiarizat cu ambele pachete de coduri. Inițial am folosit Gulp, dar mai târziu am trecut la Webpack.`,
        },
        {
            title: "PHP",
            description: `One of the must-have skills of every full-stack developer. Average with it, I've learned it following WP coding standards.`,
        },
        {
            title: "Javascript (ES6+)",
            description: `Una dintre abilitățile obligatorii ale fiecărui dezvoltator full-stack. L-am învățat urmând standardele de codare WP.`,
        },
        {
            title: "HTML5",
            description: `Abilitatea obligatorie a fiecărui dezvoltator. Acesta este ceea ce am învățat mai întâi când am început dezvoltarea web.`,
        }, // ... (same skills array as in your class component)
    ];

    return (
        <section id="about-skills" className="about-skills">
            <div className="container">
                <div className="bg-white rounded relative px-6 py-10 md:p-10 lg:p-20 drop-shadow-[0_-25px_35px_rgba(0,0,0,0.10)] mb-10 lg:mb-20 -mt-16">
                    <div className="text-center mb-8 lg:mb-10">
                        <span className="font-bold font-cursive uppercase text-blue-500">Doar cateva dintre</span>
                        <h2 className="text-3xl font-bold uppercase mb-3">Abilitățile Mele</h2>
                        <p className="text-lg text-slate-500 mb-5">...în plus, sunt mereu deschis spre a învăța lucruri și tehnologii noi.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5">{
                        skills.map((item, index) => {
                            return (
                                <div key={index} className="mb-5">
                                    <h3 className="text-md font-bold uppercase flex items-center mb-2">
                                        <div className="me-3 text-blue-500">
                                            <HiPhoto className="size-5" />
                                        </div>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-500" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                </div>
                            );
                        })
                    }</div>
                </div>
            </div>
        </section>
    );
};

export default AboutSkills;