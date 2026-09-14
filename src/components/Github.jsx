import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faUsers, faUserPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../css/Github.css';

function Github() {
    const username = 'allzxxopemula';
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        
        // Fetch data dengan pencegahan browser caching
        fetch(`https://api.github.com/users/${username}?t=${new Date().getTime()}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setProfileData({
                        avatar: data.avatar_url,
                        name: data.name || data.login,
                        bio: data.bio || 'Software Engineering Student',
                        repos: data.public_repos ?? 0,
                        followers: data.followers ?? 0,
                        following: data.following ?? 0,
                        htmlUrl: data.html_url || `https://github.com/${username}`
                    });
                }
            })
            .catch((err) => {
                console.error('Error fetching Github data:', err);
                if (isMounted) {
                    // Fallback jika API ter-rate limit
                    setProfileData({
                        avatar: `https://github.com/${username}.png`,
                        name: username,
                        bio: 'Software Engineering Student',
                        repos: 67,
                        followers: 67,
                        following: 67,
                        htmlUrl: `https://github.com/${username}`
                    });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [username]);

    return (
        <section className="github-section" id="github">
            {/* OVERLAY BARS UNTUK GITHUB */}
<div className="github-bars-overlay">
  {[...Array(8)].map((_, i) => (
    <div key={i} className="gh-bar"></div>
  ))}
</div>

            <div className="github-container">
                <header className="github-header">
                    <div>
                        <span className="github-kicker">/ 06 — COMMIT PATTERN</span>
                        <h2>
                            GitHub <span>Activity.</span>
                        </h2>
                    </div>
                    <p>
                        Tracking my open-source journey, daily commits, and continuous software engineering progress in real-time.
                    </p>
                </header>

                <div className="github-main-card">
                    {/* Floating Marker Badge */}
                    <div className="github-badge-tag">
                        <span>LIVE DATA</span>
                    </div>

                    {/* Left Profile Details */}
                    <div className="github-profile-wrapper">
                        <div className="github-avatar-box">
                            <img 
                                src={profileData?.avatar || `https://github.com/${username}.png`} 
                                alt={profileData?.name || username} 
                                className="github-avatar" 
                            />
                        </div>
                        <div className="github-profile-details">
                            <span className="github-label">OPEN SOURCE</span>
                            <h3>{profileData?.name || username}</h3>
                            <p>{profileData?.bio || 'Software Engineering Student'}</p>

                            <div className="github-stats-grid">
                                <div className="stat-chip">
                                    <FontAwesomeIcon icon={faBookBookmark} className="stat-icon" />
                                    <span>{profileData?.repos ?? 0} REPOS</span>
                                </div>
                                <div className="stat-chip">
                                    <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                                    <span>{profileData?.followers ?? 0} FOLLOWERS</span>
                                </div>
                                <div className="stat-chip">
                                    <FontAwesomeIcon icon={faUserPlus} className="stat-icon" />
                                    <span>{profileData?.following ?? 0} FOLLOWING</span>
                                </div>
                            </div>

                            <a
                                href={profileData?.htmlUrl || `https://github.com/${username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-profile-link"
                            >
                                Visit GitHub Profile <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>
                    </div>

                    {/* Right Contribution Calendar */}
                    <div className="github-calendar-wrapper">
                        <div className="calendar-scroll-box">
                            <GitHubCalendar
                                username={username}
                                blockSize={13}
                                blockMargin={4}
                                fontSize={12}
                                colorScheme="light"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Github;