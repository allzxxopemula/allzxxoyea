import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../css/Contact.css';

function Contact() {
	return (
		<section className="contact-section" id="contact">
			<div className="contact-container">
				<div className="contact-main">
					<div className="contact-copy">
						<span className="contact-kicker">/ 07 — CONTACT</span>
						<h2>
							Have an idea? <span>Let&apos;s build.</span>
						</h2>
						<p>
							Whether it&apos;s a fresh website, a bold interface, or just a good
							idea worth exploring, I&apos;d love to hear about it.
						</p>
					</div>

					<div className="contact-panel brutal-shadow">
					<div className="contact-panel-topline">
						<span className="contact-status"><i /> AVAILABLE FOR A CHAT</span>
						<span>ALLZXXO / 2026</span>
					</div>
					<h3>Let&apos;s connect.</h3>
					<div className="contact-contact-icons">
						<div className="contact-contact-icon contact-email-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
						<a
							className="contact-contact-icon contact-whatsapp"
							href="https://wa.me/6285878528337"
							target="_blank"
							rel="noreferrer"
							aria-label="Chat on WhatsApp"
							title="Chat on WhatsApp"
						>
							<FontAwesomeIcon icon={faWhatsapp} />
						</a>
					</div>
					<span className="contact-label">DROP A LINE</span>
					<div className="contact-direct-links">
						<a className="contact-email" href="mailto:allzxxott@gmail.com">
							allzxxott@gmail.com
						</a>
					</div>
					<a className="contact-button" href="mailto:allzxxott@gmail.com?subject=Let%27s%20work%20together">
						Start a conversation <FontAwesomeIcon icon={faPaperPlane} />
					</a>
					<a className="contact-github" href="https://github.com/allzxxopemula" target="_blank" rel="noreferrer">
						<FontAwesomeIcon icon={faGithub} /> Visit my GitHub <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
					</a>
					</div>
				</div>

				<div className="contact-bottom">
					<span>MADE WITH CODE, MUSIC &amp; CURIOSITY</span>
					<div className="contact-socials">
						<a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
							<FontAwesomeIcon icon={faGithub} />
						</a>
						<a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a href="#home" aria-label="Back to home">
							<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
						</a>
					</div>
					<span>© 2026 ALLZXXO</span>
				</div>
			</div>
		</section>
	);
}

export default Contact;
