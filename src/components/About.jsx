import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCode, faPalette, faBolt } from '@fortawesome/free-solid-svg-icons';
import '../css/About.css';

const strengths = [
	{
		icon: faCode,
		number: '01',
		title: 'Clean Code',
		text: 'Clean, maintainable code built to grow with every project.',
		className: 'about-card-blue',
	},
	{
		icon: faPalette,
		number: '02',
		title: 'Bold Design',
		text: 'Bold, functional visuals that stay clear and comfortable to use.',
		className: 'about-card-pink',
	},
	{
		icon: faBolt,
		number: '03',
		title: 'Fast Build',
		text: 'Turning ideas into fast, reliable, and polished web experiences.',
		className: 'about-card-yellow',
	},
];

function About() {
	return (
		<section className="about-section" id="about">
			<div className="about-container">
				<div className="about-heading">
					<span className="about-kicker">/ 01 — ABOUT ME</span>
					<h2>
						Design with <span className="about-heading-accent">purpose.</span>
					</h2>
<p className="about-lead">
    I&apos;m <span className="about-highlight">Aldo Rendy</span>, a{' '}
    <span className="about-highlight">frontend developer</span> and{' '}
    <span className="about-highlight">UI/UX designer</span> who loves
    building websites that feel alive, clear, and full of character.
</p>
					<a className="about-link brutal-shadow-sm" href="#projects">
						See how I work
						<FontAwesomeIcon icon={faArrowRight} />
					</a>
				</div>

				<div className="about-note brutal-shadow">
					<span className="about-note-mark">“</span>
					<p>
						Small details are more than decoration. They are how a product shows
						that it was made with care.
					</p>
					<span className="about-note-signature">— Allzxxo</span>
				</div>

				<div className="about-cards" aria-label="Core strengths">
					{strengths.map((strength) => (
						<article className={`about-card ${strength.className}`} key={strength.number}>
							<div className="about-card-topline">
								<span>{strength.number}</span>
								<FontAwesomeIcon icon={strength.icon} />
							</div>
							<h3>{strength.title}</h3>
							<p>{strength.text}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

export default About;
