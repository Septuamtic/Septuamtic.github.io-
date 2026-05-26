/**
 * radio.js — floating music player
 *
 * HOW TO ADD MUSIC:
 * 1. Drop your .mp3 / .ogg / .wav files into the /music/ folder.
 * 2. Add them to the PLAYLIST array below with a title and artist.
 * 3. That's it.
 *
 * AUTOPLAY NOTE:
 * Browsers block autoplay until the user interacts with the page.
 * The player will try to autoplay; if blocked, it waits for the
 * first click anywhere on the page and then starts automatically.
 */

const PLAYLIST = [
  // { src: "music/track1.mp3", title: "Track Name", artist: "Artist" },
  // { src: "music/track2.mp3", title: "Another Track", artist: "Artist" },

  // ---- DEMO: uses a freely-licensed public domain piece ----
  // Delete these and add your own files!
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543_fugue.ogg",
    title: "Fugue in A minor BWV 543",
    artist: "J.S. Bach (public domain)"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Grieg_-_In_the_Hall_of_the_Mountain_King.ogg",
    title: "In the Hall of the Mountain King",
    artist: "E. Grieg (public domain)"
  },
];

/* ---- state ---- */
let currentIdx = 0;
let isPlaying  = false;
let isMuted    = false;

/* ---- elements ---- */
const radio       = document.getElementById('radio');
const audio       = document.getElementById('audio-player');
const btnPlay     = document.getElementById('btn-play');
const btnPrev     = document.getElementById('btn-prev');
const btnNext     = document.getElementById('btn-next');
const btnMute     = document.getElementById('btn-mute');
const volSlider   = document.getElementById('volume');
const progressBar = document.getElementById('progress-bar');
const progressFill= document.getElementById('progress-fill');
const timeCurrent = document.getElementById('time-current');
const timeTotal   = document.getElementById('time-total');
const trackName   = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const playlistEl  = document.getElementById('playlist');
const radioToggle = document.getElementById('radio-toggle');

/* ---- helpers ---- */
function fmt(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function loadTrack(idx, andPlay = false) {
  if (!PLAYLIST.length) return;
  currentIdx = (idx + PLAYLIST.length) % PLAYLIST.length;
  const t = PLAYLIST[currentIdx];
  audio.src = t.src;
  audio.load();
  trackName.textContent   = t.title;
  trackArtist.textContent = t.artist;
  progressFill.style.width = '0%';
  timeCurrent.textContent  = '0:00';
  timeTotal.textContent    = '0:00';
  updatePlaylistHighlight();
  if (andPlay) play();
}

function play() {
  const promise = audio.play();
  if (promise !== undefined) {
    promise.then(() => {
      isPlaying = true;
      btnPlay.textContent = '⏸';
      radio.classList.add('playing');
    }).catch(() => {
      // autoplay blocked — will try again on first user interaction
    });
  }
}

function pause() {
  audio.pause();
  isPlaying = false;
  btnPlay.textContent = '▶';
  radio.classList.remove('playing');
}

function togglePlay() {
  if (isPlaying) pause();
  else {
    if (!audio.src) loadTrack(currentIdx, true);
    else play();
  }
}

function updatePlaylistHighlight() {
  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIdx);
  });
}

/* ---- build playlist UI ---- */
function buildPlaylist() {
  playlistEl.innerHTML = '';
  if (!PLAYLIST.length) {
    playlistEl.innerHTML = '<div class="playlist-item"><span class="pl-title" style="opacity:0.4">add tracks to radio.js</span></div>';
    return;
  }
  PLAYLIST.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (i === currentIdx ? ' active' : '');
    item.innerHTML = `<span class="pl-idx">${i + 1}</span><span class="pl-title">${t.title}</span>`;
    item.addEventListener('click', () => loadTrack(i, true));
    playlistEl.appendChild(item);
  });
}

/* ---- events ---- */
btnPlay.addEventListener('click', togglePlay);
btnPrev.addEventListener('click', () => loadTrack(currentIdx - 1, isPlaying));
btnNext.addEventListener('click', () => loadTrack(currentIdx + 1, isPlaying));

btnMute.addEventListener('click', () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  btnMute.textContent = isMuted ? '🔇' : '🔊';
});

volSlider.addEventListener('input', () => {
  audio.volume = volSlider.value;
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  timeCurrent.textContent = fmt(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = fmt(audio.duration);
});

audio.addEventListener('ended', () => {
  loadTrack(currentIdx + 1, true); // auto-advance
});

progressBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
});

radioToggle.addEventListener('click', () => {
  radio.classList.toggle('collapsed');
});

/* ---- init ---- */
audio.volume = parseFloat(volSlider.value);
buildPlaylist();

if (PLAYLIST.length) {
  loadTrack(0, false);

  // Attempt autoplay — browser may block it
  const autoplayAttempt = audio.play();
  if (autoplayAttempt !== undefined) {
    autoplayAttempt.then(() => {
      isPlaying = true;
      btnPlay.textContent = '⏸';
      radio.classList.add('playing');
    }).catch(() => {
      // Autoplay blocked; start on first interaction
      const startOnInteraction = () => {
        play();
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('keydown', startOnInteraction);
      };
      document.addEventListener('click', startOnInteraction);
      document.addEventListener('keydown', startOnInteraction);
    });
  }
}

// Open radio panel by default after 1s
setTimeout(() => {
  radio.classList.remove('collapsed');
}, 1000);
