import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCode, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../css/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <section className="navbar-section">
      <div className="navbar-container brutal-shadow">
        <div className="nav-logo">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faCode} />
          </div>
          <div className="nav-brand-copy">
            <h1>Allzxxo.</h1>
            <span>Creative Developer</span>
          </div>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
          <li><a href="#journey" onClick={closeMenu}>Journey</a></li>
          <li><a href="#music" onClick={closeMenu}>Music</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        <a className="nav-cta brutal-shadow" href="mailto:allzxxott@gmail.com">
          Let's Talk <FontAwesomeIcon icon={faPaperPlane} />
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </button>
      </div>
    </section>
  );
};

export default Navbar;