import React, { useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Skill from './components/Skill';
import Journey from './components/Journey';
import Music from './components/Music';
import Contact from './components/Contact';
import Github from './components/Github';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// FIX BUG 1: Mencegah GSAP me-refresh layout saat address bar HP muncul/hilang
// Ini adalah kunci utama agar animasi pin tidak lompat/teleport di Android
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const appRef = useRef(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      // =========================================================
      // 1. ANIMASI UTAMA
      // =========================================================
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
        });

        intro
          .from('.navbar-container', {
            y: -40,
            autoAlpha: 0,
            duration: 1.1,
          })

          .from(
            '.hero-badge',
            {
              y: -90,
              autoAlpha: 0,
              duration: 1.2,
              ease: 'bounce.out',
            },
            '-=0.55'
          )

          .from(
            '.hero-title',
            {
              y: -65,
              autoAlpha: 0,
              duration: 1.25,
              ease: 'power3.out',
            },
            '-=0.45'
          )

          .from(
            '.hero-subtitle',
            {
              y: 28,
              autoAlpha: 0,
              duration: 0.95,
            },
            '-=0.45'
          )

          .fromTo(
            '.hero-description, .hero-actions',
            {
              y: 28,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.25,
              duration: 1.05,
            },
            '-=0.35'
          )

          .from(
            '.hero-image-box',
            {
              x: 80,
              rotate: 3,
              autoAlpha: 0,
              duration: 1.25,
              ease: 'back.out(1.4)',
            },
            '-=0.65'
          );

        // =========================================================
        // 2. SECTION HEADING + COPY + CARDS
        // =========================================================
        gsap
          .utils
          .toArray(
            '.about-section, .project-section, .skill-section, .github-section, .journey-section, .music-section, .contact-section'
          )
          .forEach((section) => {
            const heading = section.querySelector('h2');

            const copy = section.querySelectorAll(
              'p, .about-link, .skill-stamp, .contact-email, .github-kicker'
            );

            const cards = section.querySelectorAll(
              '.project-row, .journey-item, .music-player, .music-playlist-panel, .contact-panel, .github-main-card'
            );

            // -----------------------------------------------------
            // SECTION HEADING
            // -----------------------------------------------------
            if (heading) {
              gsap.fromTo(
                heading,
                {
                  color: '#94a3b8',
                  clipPath: 'inset(0 100% 0 0)',
                },
                {
                  color: '#0f172a',
                  clipPath: 'inset(0 0% 0 0)',
                  duration: 2.8,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    end: 'top 30%',
                    scrub: 1.8,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }

            // -----------------------------------------------------
            // COPY
            // -----------------------------------------------------
            if (copy.length) {
              gsap.from(copy, {
                y: 24,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 1.1,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: section,
                  start: 'top 80%',
                  once: true,
                },
              });
            }

            // -----------------------------------------------------
            // CARDS
            // -----------------------------------------------------
            if (cards.length) {
              gsap.from(cards, {
                x: 42,
                autoAlpha: 0,
                stagger: 0.12,
                duration: 1.15,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: section,
                  start: 'top 76%',
                  once: true,
                },
              });
            }
          });

        // =========================================================
        // 3. PROJECT PARALLAX
        // =========================================================
        gsap.utils.toArray('.project-row').forEach((row) => {
          const projectInfo = row.querySelector('.project-info');

          if (!projectInfo) return;

          gsap.to(projectInfo, {
            y: -16,
            ease: 'none',

            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          [
            { selector: 'h3', y: -28 },
            { selector: 'p', y: -18 },
            { selector: '.project-tags', y: -10 },
            { selector: '.project-link', y: -5 },
          ].forEach(({ selector, y }) => {
            const element = projectInfo.querySelector(selector);

            if (!element) return;

            gsap.to(element, {
              y,
              ease: 'none',

              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.8,
              },
            });
          });
        });

        // =========================================================
        // 4. SKILLS PROGRESS BAR
        // =========================================================
        const skillSection = appRef.current?.querySelector('.skill-section');

        if (skillSection) {
          const skillFills = skillSection.querySelectorAll(
            '.skill-progress-fill'
          );

          gsap.set(skillFills, {
            width: '0%',
          });

          gsap.to(skillFills, {
            width: (index, element) => element.dataset.level,
            stagger: 0.08,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: skillSection,
              start: 'top 78%',
              end: 'bottom 48%',
              scrub: 1.2,
            },
          });
        }

        // =========================================================
        // 5. ABOUT SECTION PIN (FIX BUG TELEPORT/BLINK)
        // =========================================================
        const aboutSection = appRef.current?.querySelector('.about-section');
        const projectSection = appRef.current?.querySelector('.project-section');

        if (aboutSection) {
          gsap.set(aboutSection, {
            zIndex: 1,
          });

          gsap.set('.project-section', {
            position: 'relative',
            zIndex: 2,
          });

          // FIX BUG: Hitung end pin berdasarkan tinggi project-section
          // Biar lepasnya pas banget saat project section selesai menutupi about
          const aboutPinEnd = () => {
             return projectSection 
               ? `+=${projectSection.offsetHeight}` 
               : `+=${aboutSection.offsetHeight}`;
          };

          ScrollTrigger.create({
            trigger: aboutSection,
            start: 'bottom bottom',
            end: aboutPinEnd,
            pin: true,
            pinSpacing: false,
            // anticipatePin: 1 dihapus karena memicu salah kalkulasi di Android
            invalidateOnRefresh: true,
          });

          const aboutParallaxTargets = [
            { selector: '.about-kicker', y: -30 },
            { selector: '.about-heading h2', y: -60 },
            { selector: '.about-lead', y: -90 },
            { selector: '.about-link', y: -50 },
            { selector: '.about-note', y: -70 },
            { selector: '.about-card-blue', y: -40 },
            { selector: '.about-card-pink', y: -65 },
            { selector: '.about-card-yellow', y: -90 },
          ];

          aboutParallaxTargets.forEach(({ selector, y }) => {
            const elements = aboutSection.querySelectorAll(selector);

            if (!elements.length) return;

            gsap.to(elements, {
              y,
              ease: 'none',

              scrollTrigger: {
                trigger: aboutSection,
                start: 'bottom bottom',
                end: aboutPinEnd,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });
        }

        // =========================================================
        // 6. ABOUT TEXT HIGHLIGHT
        // =========================================================
        const aboutHighlights =
          appRef.current?.querySelectorAll('.about-highlight');

        if (aboutHighlights?.length) {
          gsap.fromTo(
            aboutHighlights,
            {
              '--marker-scale': 0,
            },
            {
              '--marker-scale': 1,
              stagger: 0.12,
              ease: 'none',

              scrollTrigger: {
                trigger: '.about-lead',
                start: 'top 82%',
                end: 'top 42%',
                scrub: 1.2,
              },
            }
          );
        }
      });

      // =========================================================
      // 7. GITHUB BARS OVERLAY (FIX BUG MUNCUL KECEPETAN)
      // =========================================================
      media.add('(min-width: 1px)', () => {
        const githubTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.github-section',
            // FIX BUG: Ubah dari 95% ke 75% agar animasi mulai saat section 
            // github mau habis, bukan saat baru muncul dari bawah.
            start: 'bottom 75%', 
            end: 'bottom 0%',
            scrub: 1,
          },
        });

        githubTl.to(
          '.gh-bar',
          {
            scaleY: 1,
            stagger: {
              each: 0.15,
              from: 'start',
              ease: 'none',
            },
            duration: 1,
            ease: 'power2.out',
          },
          0
        );
      });

      // =========================================================
      // 8. JOURNEY PROGRESS LINE
      // =========================================================
      const journeySection =
        appRef.current?.querySelector('.journey-section');

      const journeyProgress =
        appRef.current?.querySelector('.journey-progress-fill');

      if (journeySection && journeyProgress) {
        gsap.fromTo(
          journeyProgress,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            ease: 'none',

            scrollTrigger: {
              trigger: journeySection,
              start: 'top 20%',
              end: 'bottom 20%',
              scrub: 5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      return () => {
        media.revert();
      };
    },
    {
      scope: appRef,
    }
  );

  return (
    <div className="app-wrapper" ref={appRef}>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Project />
        <Skill />
        <Journey />
        <Github />
        <Music />
        <Contact />
      </main>
    </div>
  );
}

export default App;