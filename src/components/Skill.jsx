import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHtml5,
    faCss3Alt,
    faJs,
    faPython,
    faFigma,
    faGitAlt,
    faGithub,
    faReact,
    faNodeJs,
    faPhp,
} from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightDots, faCode } from '@fortawesome/free-solid-svg-icons';
import '../css/Skill.css';

const skills = [
    { name: 'HTML', type: 'MARKUP', level: '90%', icon: faHtml5, color: 'skill-orange' },
    { name: 'CSS', type: 'STYLING', level: '70%', icon: faCss3Alt, color: 'skill-blue' },
    { name: 'JavaScript', type: 'LANGUAGE', level: '65%', icon: faJs, color: 'skill-yellow' },
    { name: 'Python', type: 'LANGUAGE', level: '55%', icon: faPython, color: 'skill-cyan' },
    { name: 'VS Code', type: 'WORKFLOW', level: '85%', icon: faCode, color: 'skill-white' },
    { name: 'Figma', type: 'DESIGN', level: '85%', icon: faFigma, color: 'skill-pink' },
    { name: 'Git', type: 'VERSION CONTROL', level: '70%', icon: faGitAlt, color: 'skill-orange' },
    { name: 'GitHub', type: 'COLLABORATION', level: '74%', icon: faGithub, color: 'skill-blue' },
    { name: 'React', type: 'FRONTEND', level: '67%', icon: faReact, color: 'skill-cyan' },
    { name: 'Node.js', type: 'BACKEND', level: '70%', icon: faNodeJs, color: 'skill-yellow' },
    { name: 'PHP', type: 'BACKEND', level: '60%', icon: faPhp, color: 'skill-pink' },
];

function Skill() {
    return (
        <section className="skill-section" id="skills">
            <div className="skill-container">
                {/* BAGIAN KIRI: Ini yang akan STICKY (diam di tempat) */}
                <div className="skill-intro">
                    <span className="skill-kicker">/ 04 — TOOLBOX</span>
                    <h2>Tools for <span>good work.</span></h2>
                    <p>
                        The tools I use to turn raw ideas into digital products that feel
                        fast, clear, and enjoyable.
                    </p>
                    <div className="skill-stamp">
                        <FontAwesomeIcon icon={faArrowUpRightDots} />
                        <span>ALWAYS<br />LEARNING</span>
                    </div>
                </div>

                {/* BAGIAN KANAN: Ini yang akan bisa di-scroll normal */}
                <div className="skill-list">
                    {skills.map((skill, index) => (
                        <article className={`skill-card ${skill.color}`} key={skill.name}>
                            <div className="skill-card-icon">
                                <FontAwesomeIcon icon={skill.icon} />
                            </div>
                            <div className="skill-card-copy">
                                <div className="skill-card-meta">
                                    <span>0{index + 1} / {skill.type}</span>
                                    <strong>{skill.level}</strong>
                                </div>
                                <h3>{skill.name}</h3>
                                <div className="skill-progress" aria-label={`${skill.name} proficiency ${skill.level}`}>
                                    <span className="skill-progress-fill" data-level={skill.level}></span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skill;