import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faRocket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../css/Journey.css';

const milestones = [
    {
        year: '2025',
        label: 'THE BEGINNING',
        title: 'Grade 10 — Software Engineering',
        text: 'Started vocational school in Software Engineering and built a foundation in HTML, CSS, and JavaScript.',
        icon: faGraduationCap,
    },
    {
        year: '2026',
        label: 'CURRENTLY LEARNING',
        title: 'Grade 11 — Going deeper',
        text: 'Still studying Software Engineering while moving from web fundamentals into frameworks, UI/UX, and frontend development.',
        icon: faGraduationCap,
    },
    {
        year: 'NEXT',
        label: 'STILL GROWING',
        title: 'Mastering more, one step at a time',
        text: 'The journey continues. I want to master more tools, explore new technologies, and keep improving through every project.',
        icon: faRocket,
    },
];

function Journey() {
    return (
        <section className="journey-section" id="journey">
            


            <div className="journey-container">
                <header className="journey-header">
                    <div>
                        <span className="journey-kicker">/ 05 — THE JOURNEY</span>
                        <h2>Still <span>in motion.</span></h2>
                    </div>
                    <p>
                        From starting Software Engineering in 2025 to learning in Grade 11
                        in 2026, this journey is still growing.
                    </p>
                </header>

<div className="journey-timeline">
    <div className="journey-progress-track" aria-hidden="true" />
    <div className="journey-progress-fill" aria-hidden="true" />

    {milestones.map((milestone, index) => (
        <article className="journey-item" key={milestone.year}>
            <div className="journey-marker">
                <span>{milestone.year}</span>
                <div className="journey-icon">
                    <FontAwesomeIcon icon={milestone.icon} />
                </div>
            </div>

            <div className="journey-card">
                <span className="journey-label">{milestone.label}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>

                {index === milestones.length - 1 && (
                    <a href="#contact">
                        Let&apos;s create{' '}
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                )}
            </div>
        </article>
    ))}
</div>
            </div>
        </section>
    );
}

export default Journey;