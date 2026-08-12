/* Coleção Modão Sertanejo Raiz — vanilla JS */
(function () {
  'use strict';

  // --- Countdown: 24h cycle, resets when it hits zero ---
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (el) {
      console.log('Initializing countdown');
      var DURATION = 24 * 60 * 60 * 1000; // 24h
      
      var now = new Date();
      var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      
      function tick() {
        var currentTime = Date.now();
        var elapsed = currentTime - startOfDay;
        var remaining = DURATION - (elapsed % DURATION);
        
        var h = Math.floor(remaining / 3600000);
        var m = Math.floor((remaining % 3600000) / 60000);
        var s = Math.floor((remaining % 60000) / 1000);
        
        el.textContent =
          String(h).padStart(2, '0') + ':' +
          String(m).padStart(2, '0') + ':' +
          String(s).padStart(2, '0');
      }
      tick();
      setInterval(tick, 1000);
    }
  }

  // --- Audio sample: limit to 45s + spin vinyl while playing ---
  function initAudio() {
    var audio = document.getElementById('sample-audio');
    var vinyl = document.getElementById('vinyl');
    var playBtn = document.getElementById('vinyl-play');
    
    if (!audio || !vinyl || !playBtn) return false;

    // Remove any existing listeners by cloning (optional but safer for re-init)
    
    audio.addEventListener('timeupdate', function () {
      if (audio.currentTime >= 45) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    audio.addEventListener('play',  function () { vinyl.classList.add('is-playing'); });
    audio.addEventListener('pause', function () { vinyl.classList.remove('is-playing'); });
    audio.addEventListener('ended', function () { vinyl.classList.remove('is-playing'); });

    function togglePlayback(e) {
      if (e) e.preventDefault();
      if (audio.paused) { 
        audio.play().catch(function(err) { console.error('Playback error:', err); });
      } else { 
        audio.pause(); 
      }
    }

    playBtn.addEventListener('click', togglePlayback);
    vinyl.addEventListener('click', function(e) {
      if (!e.target.closest('#vinyl-play')) togglePlayback(e);
    });

    return true;
  }

  // --- Smooth scroll ---
  function initScroll() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.pushState) history.pushState(null, null, id);
    }, true);
  }

  // --- FAQ ---
  function initFAQ() {
    var allDetails = document.querySelectorAll('.faq details');
    allDetails.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) {
          allDetails.forEach(function (o) { if (o !== d) o.open = false; });
        }
      });
    });
  }

  function setup() {
    initCountdown();
    initScroll();
    initFAQ();
    
    if (!initAudio()) {
      var count = 0;
      var timer = setInterval(function() {
        count++;
        if (initAudio() || count > 20) clearInterval(timer);
      }, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
