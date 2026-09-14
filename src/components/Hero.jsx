import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbtack, faUser, faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Typewriter from 'typewriter-effect';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-container">
        
        {/* Bagian Kiri: Konten Utama */}
        <div className="hero-content">
          <div className="hero-badge brutal-shadow-sm">
            <FontAwesomeIcon icon={faStar} className="icon-spin-hover" /> Welcome to My World
          </div>
          
          {/* PASTI 1 BARIS KARENA CSS white-space: nowrap */}
          <h1 className="hero-title">
            Hi, I&apos;m <span className="highlight-box highlight-blue">Allzxxo.</span>
          </h1>
          
          <h2 className="hero-subtitle">
            I&apos;m a{' '}
            <span className="highlight-box highlight-cyan">
              <Typewriter
                options={{
                  strings: ['Frontend Developer', 'Vibe Coder', 'UI/UX Designer'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h2>
          
          <div className="hero-description brutal-shadow">
            <p>
              My real name is <strong>Aldo Rendy</strong>. I'm deeply passionate about coding, 
              web engineering, and crafting aesthetic UI/UX designs that users love to interact with. 
              Always ready to build something awesome.
            </p>
          </div>

          <div className="hero-actions">
            <a className="btn-primary brutal-shadow" href="#projects">
              View Projects <FontAwesomeIcon icon={faThumbtack} />
            </a>
            <a className="btn-secondary brutal-shadow" href="#about">
              About Me <FontAwesomeIcon icon={faUser} />
            </a>
            
            <div className="social-links">
              <a href="#" className="social-icon brutal-shadow-sm"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="social-icon pink-bg brutal-shadow-sm"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
        </div>

        {/* Bagian Kanan: Visual/Avatar */}
        <div className="hero-image-wrapper">
          <div className="hero-image-box brutal-shadow">
            <div className="box-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            {/* JANGAN LUPA GANTI SRC GAMBARNYA YAA BIAR GA MUNCUL ICON BROKEN DI BROWSER */}
            <img src="https://allzxxosite.vercel.app/alz-logo/alz.png" alt="Allzxxo Avatar" className="avatar-img" />
            
            <div className="floating-badge brutal-shadow">
              <FontAwesomeIcon icon={faCode} /> Full-Stack Ready
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;