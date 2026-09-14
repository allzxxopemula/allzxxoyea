import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faMusic, faPause, faPlay, faPlus, faLink, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import '../css/Music.css';

const tracks = [
	{ title: 'Dream, Ivory - welcome and goodbye', artist: 'Dream, Ivory', audio: '/audio/welcome.mp3', bpm: 96, cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPWl0U5iPZIU6efmoA9eLdtx6yfXwImN5cWgS1OEyPA&s=10' },
	{ title: 'Phoebe Bridgers - Scott Street', artist: 'Phoebe Bridgers', audio: '/audio/scott.mp3', bpm: 110, cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWPmcp776SqVD9Y3E88eeyMKVjv2PYiktBEBUpGAQ8og&s=10' },
	{ title: 'Call Of Silence', artist: 'Gemie', audio: '/audio/call.mp3', bpm: 88, cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jrkN2iNgHyflaKqh4d1UEPrnbOqL_TzTCMiBLPbj1Q&s=10' },
];

const visualizerBars = Array.from({ length: 16 }, (_, index) => index);

function extractYoutubeId(value) {
	const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/);
	if (match) return match[1];
	return /^[\w-]{11}$/.test(value) ? value : '';
}

function formatTime(value) {
	if (!Number.isFinite(value)) return '0:00';
	const minutes = Math.floor(value / 60);
	const seconds = Math.floor(value % 60).toString().padStart(2, '0');
	return `${minutes}:${seconds}`;
}

function Music() {
	const audioRef = useRef(null);
	const youtubeRef = useRef(null);
	const playerRef = useRef(null);
	const playIntentRef = useRef(false);
	const [playlist, setPlaylist] = useState(tracks);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.8);
	const [youtubeReady, setYoutubeReady] = useState(false);
	const [youtubePlayerReady, setYoutubePlayerReady] = useState(false);
	const [youtubeInput, setYoutubeInput] = useState('');
	const [inputError, setInputError] = useState('');

	const currentTrack = playlist[currentTrackIndex] || playlist[0];
	const isNativeTrack = Boolean(currentTrack.audio);

	const stopAllPlayback = () => {
		if (audioRef.current) audioRef.current.pause();
		if (playerRef.current?.pauseVideo) playerRef.current.pauseVideo();
		playIntentRef.current = false;
		setIsPlaying(false);
	};

	useEffect(() => {
		if (window.YT?.Player) {
			setYoutubeReady(true);
			return undefined;
		}
		const script = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
		const previousReady = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			previousReady?.();
			setYoutubeReady(true);
		};
		if (!script) {
			const youtubeScript = document.createElement('script');
			youtubeScript.src = 'https://www.youtube.com/iframe_api';
			document.body.appendChild(youtubeScript);
		}
		return () => { window.onYouTubeIframeAPIReady = previousReady; };
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !isNativeTrack) return undefined;
		if (playerRef.current?.pauseVideo) playerRef.current.pauseVideo();
		setCurrentTime(0);
		setDuration(0);
		audio.load();
		if (playIntentRef.current) {
			const playPromise = audio.play();
			playPromise?.catch(() => setIsPlaying(false));
		}
		return undefined;
	}, [currentTrackIndex, isNativeTrack]);

	useEffect(() => {
		if (isNativeTrack || !youtubeReady || !youtubeRef.current || !window.YT?.Player) return undefined;
		if (audioRef.current) audioRef.current.pause();
		setCurrentTime(0);
		setDuration(0);
		setYoutubePlayerReady(false);
		playerRef.current?.destroy();
		playerRef.current = new window.YT.Player(youtubeRef.current, {
			videoId: extractYoutubeId(currentTrack.youtube),
			playerVars: { autoplay: 0, controls: 0, modestbranding: 1, rel: 0, playsinline: 1, enablejsapi: 1, origin: window.location.origin },
			events: {
				onReady: (event) => {
					setYoutubePlayerReady(true);
					event.target.setVolume(volume * 100);
					setDuration(event.target.getDuration() || 0);
					if (playIntentRef.current) {
						playIntentRef.current = false;
						event.target.playVideo();
					}
				},
				onStateChange: (event) => {
					if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
					if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
					if (event.data === window.YT.PlayerState.ENDED) changeTrack(1);
				},
				onError: (event) => {
					setIsPlaying(false);
					setInputError(event.data === 101 || event.data === 150 ? 'The owner disabled playback on other websites.' : 'This YouTube track cannot be played in the embedded player.');
				},
			},
		});
		return () => {
			setYoutubePlayerReady(false);
			playerRef.current?.destroy();
			playerRef.current = null;
		};
	}, [currentTrackIndex, isNativeTrack, youtubeReady]);

	useEffect(() => {
		if (audioRef.current) audioRef.current.volume = volume;
		if (playerRef.current?.setVolume) playerRef.current.setVolume(volume * 100);
	}, [volume]);

	useEffect(() => {
		if (!isPlaying) return undefined;
		const timer = window.setInterval(() => {
			if (isNativeTrack && audioRef.current) setCurrentTime(audioRef.current.currentTime);
			if (!isNativeTrack && playerRef.current?.getCurrentTime) setCurrentTime(playerRef.current.getCurrentTime());
		}, 250);
		return () => window.clearInterval(timer);
	}, [isPlaying, isNativeTrack]);

	const changeTrack = (direction) => {
		stopAllPlayback();
		playIntentRef.current = true;
		setCurrentTrackIndex((index) => (index + direction + playlist.length) % playlist.length);
	};

	const togglePlayback = () => {
		if (isNativeTrack && audioRef.current) {
			if (isPlaying) audioRef.current.pause();
			else audioRef.current.play().catch(() => setInputError('Tap play again to start this audio.'));
			return;
		}
		if (!playerRef.current || !youtubePlayerReady) {
			playIntentRef.current = true;
			return;
		}
		if (isPlaying) playerRef.current.pauseVideo();
		else playerRef.current.playVideo();
	};

	const selectTrack = (index) => {
		stopAllPlayback();
		playIntentRef.current = true;
		setInputError('');
		setCurrentTrackIndex(index);
	};

	const handleSeek = (event) => {
		const nextTime = Number(event.target.value);
		if (isNativeTrack && audioRef.current) audioRef.current.currentTime = nextTime;
		if (!isNativeTrack && playerRef.current?.seekTo) playerRef.current.seekTo(nextTime, true);
		setCurrentTime(nextTime);
	};

	const handleYoutubeSubmit = async (event) => {
		event.preventDefault();
		const value = youtubeInput.trim();
		const videoId = extractYoutubeId(value);
		if (!videoId) {
			setInputError('Paste a valid YouTube video link.');
			return;
		}
		let title = `YouTube Track ${playlist.length - tracks.length + 1}`;
		let artist = 'Your YouTube pick';
		try {
			const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(value)}&format=json`);
			if (response.ok) {
				const metadata = await response.json();
				title = metadata.title || title;
				artist = metadata.author_name || artist;
			}
		} catch {
			// The track can still be added when metadata is unavailable.
		}
		const customTrack = { title, artist, youtube: value, bpm: 100, cover: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` };
		stopAllPlayback();
		setPlaylist((currentPlaylist) => [...currentPlaylist, customTrack]);
		setCurrentTrackIndex(playlist.length);
		setYoutubeInput('');
		setInputError('');
		playIntentRef.current = true;
		setIsPlaying(false);
	};

	return (
		<section className="music-section" id="music">
			<div className="music-container">
				<header className="music-header"><div><span className="music-kicker">/ 06 — SOUNDTRACK</span><h2>Press <span>play.</span></h2></div><p>A little background music for the ideas, interfaces, and late-night builds.</p></header>
				<div className="music-content-grid">
					<div className={`music-player brutal-shadow ${isPlaying ? 'is-playing' : ''}`} style={{ '--motion-duration': `${(120 / currentTrack.bpm).toFixed(2)}s` }}>
						<div className="music-now-playing"><div className={`music-cover ${isPlaying ? 'is-playing' : ''}`}><img src={currentTrack.cover} alt={`${currentTrack.title} cover`} /><div className="music-cover-icon"><FontAwesomeIcon icon={faMusic} /></div></div><div className="music-track-copy"><span className="music-status">{isNativeTrack ? 'ALLZXXO PLAYLIST' : 'YOUTUBE TRACK'}</span><h3>{currentTrack.title}</h3><p>{currentTrack.artist}</p></div></div>
						<div className={`music-visualizer ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">{visualizerBars.map((bar) => <span key={bar} style={{ '--bar-delay': `${bar * 0.06}s`, '--bar-height': `${28 + ((bar * 17) % 56)}%` }} />)}</div>
						<div className="music-progress-row"><span>{formatTime(currentTime)}</span><input aria-label="Seek through track" className="music-progress" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={handleSeek} /><span>{formatTime(duration)}</span></div>
						<div className="music-controls"><button type="button" className="music-control music-control-small" onClick={() => changeTrack(-1)} aria-label="Previous track"><FontAwesomeIcon icon={faBackwardStep} /></button><button type="button" className="music-control music-control-main" onClick={togglePlayback} aria-label={isPlaying ? 'Pause track' : 'Play track'}><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /></button><button type="button" className="music-control music-control-small" onClick={() => changeTrack(1)} aria-label="Next track"><FontAwesomeIcon icon={faForwardStep} /></button><label className="music-volume"><FontAwesomeIcon icon={faVolumeHigh} /><input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label></div>
						<audio ref={audioRef} src={isNativeTrack ? currentTrack.audio : undefined} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onEnded={() => changeTrack(1)} />
						<div ref={youtubeRef} className="music-youtube-player" title="YouTube music player" />
					</div>
					<div className="music-playlist-panel"><form className="music-youtube-form" onSubmit={handleYoutubeSubmit}><div className="music-youtube-form-heading"><span><FontAwesomeIcon icon={faLink} /> ADD YOUTUBE</span><small>PASTE A VIDEO LINK</small></div><div className="music-youtube-form-row"><input value={youtubeInput} onChange={(event) => setYoutubeInput(event.target.value)} placeholder="https://youtu.be/..." aria-label="YouTube video link" type="url" /><button type="submit" aria-label="Add YouTube track"><FontAwesomeIcon icon={faPlus} /></button></div>{inputError && <p className="music-input-error">{inputError}</p>}</form><div className="music-playlist"><div className="music-playlist-heading"><span>PLAYLIST</span><span>{playlist.length} TRACKS</span></div>{playlist.map((track, index) => <button type="button" className={`music-playlist-item ${index === currentTrackIndex ? 'is-active' : ''}`} onClick={() => selectTrack(index)} key={`${track.title}-${index}`}><span>0{index + 1}</span><strong>{track.title}</strong><small>{track.artist}</small></button>)}</div></div>
				</div>
			</div>
		</section>
	);
}

export default Music;
