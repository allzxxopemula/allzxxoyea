import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import '../css/Project.css';

const projects = [
    {
        number: '01',
        category: 'FINANCE APP / WEB DEVELOPMENT',
        title: 'Allzxxo Finance',
        description:
            'A finance application built with PHP, CSS, and JavaScript to help users manage financial information through a clear and practical interface.',
        image:
            'https://allzxxosite.vercel.app/imgproject/alzf.png',
        alt: 'Allzxxo Finance application interface',
        color: 'project-blue',
        tags: ['PHP', 'CSS', 'JavaScript'],
        link: 'https://allzxxofinance.page.gd',
    },
    {
        number: '02',
        category: 'IMAGE TOOL / PYTHON APP',
        title: 'AlzRemoveBG',
        description:
            'A background removal application built with React, and CSS that helps users create clean cutouts quickly and simply.',
        image:
            '/rmvbg.png',
        alt: 'AlzRemoveBG background removal application',
        color: 'project-pink',
        tags: ['React', 'CSS', 'API'],
        link: 'https://alzremovebg.vercel.app',
    },
    {
        number: '03',
        category: 'COLOR TOOL / FRONTEND APP',
        title: 'HexSplashAlz',
        description:
            'A color utility that generates random CSS colors and lets users copy the selected color directly to their clipboard.',
        image:
            '/hexsplsh.png',
        alt: 'HexSplashAlz random CSS color generator',
        color: 'project-yellow',
        tags: ['React', 'CSS'],
        link: 'https://hexsplashalz.vercel.app', 
    },
];

function Project() {
    return (
        <section className="project-section" id="projects">
            <div className="project-container">
                <header className="project-header">
                    <div>
                        <span className="project-kicker">/ 02 — SELECTED WORK</span>
                        <h2>Things I&apos;ve <span>built.</span></h2>
                    </div>
                    <p>
                        Selected work shaped by curiosity, bold design, and code made
                        with intention.
                    </p>
                </header>

                <div className="project-list">
                    {projects.map((project, index) => (
                        <article
                            className={`project-row ${project.color} ${index % 2 ? 'project-row--reverse' : ''}`}
                            key={project.number}
                        >
                            <div className="project-info">
                                <div className="project-meta">
                                    <span>{project.number}</span>
                                    <span>{project.category}</span>
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                </div>
                                <a 
                                    className="project-link brutal-shadow-sm" 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Visit Project <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                </a>
                            </div>

                            <div className="project-visual brutal-shadow">
                                <div className="project-window-bar">
                                    <span></span><span></span><span></span>
                                    <FontAwesomeIcon icon={faCodeBranch} />
                                </div>
                                <img src={project.image} alt={project.alt} loading="lazy" />
                                <div className="project-visual-label">ALLZXXO / {project.number}</div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Project;