/* Coleção Modão Sertanejo Raiz — vanilla JS */
(function () {
  'use strict';

  // --- Countdown: 24h cycle, resets when it hits zero ---
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (el) {
      console.log('Initializing countdown');
      var DURATION = 24 * 60 * 60 * 1000; // 24h
      
      // Use a stable start time based on the day to avoid resets on refresh
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
    } else {
      console.warn('Countdown element not found');
    }
  }

  // Use DOMContentLoaded first, fallback to ensureReady if needed
  function setup() {
    initCountdown();
    if (!initAudio()) {
      // Retry if elements aren't ready yet
      var retryCount = 0;
      var retryInterval = setInterval(function() {
        retryCount++;
        if (initAudio() || retryCount > 10) clearInterval(retryInterval);
      }, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // Double check initialization after a short delay for slow mobile browsers
  setTimeout(function() {
    if (document.getElementById('countdown') && !document.getElementById('countdown').textContent.includes(':')) {
      initCountdown();
    }
  }, 1000);


  // --- Smooth scroll for any in-page anchor link (Capture phase to avoid conflicts) ---
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    
    // Select the target element
    var target = document.querySelector(id);
    if (!target) return;

    // Prevent default and stop propagation to avoid jumping or UTMify interference
    e.preventDefault();
    e.stopImmediatePropagation();
    
    // Perform smooth scroll
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Update URL hash without jumping if needed, or just let it scroll
    if (history.pushState) {
      history.pushState(null, null, id);
    } else {
      location.hash = id;
    }
  }, true);

  // --- FAQ: close other <details> when one opens (accordion behavior) ---
  var allDetails = document.querySelectorAll('.faq details');
  allDetails.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        allDetails.forEach(function (o) { if (o !== d) o.open = false; });
      }
    });
  });

  // --- Audio sample: limit to 45s + spin vinyl while playing ---
  function initAudio() {
    var audio = document.getElementById('sample-audio');
    var vinyl = document.getElementById('vinyl');
    var playBtn = document.getElementById('vinyl-play');
    
    if (!audio || !vinyl || !playBtn) {
      console.warn('Audio elements missing, retrying...');
      return false;
    }

    console.log('Audio initialized');

    audio.addEventListener('timeupdate', function () {
      if (audio.currentTime >= 45) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    audio.addEventListener('play',  function () { 
      console.log('Audio playing');
      vinyl.classList.add('is-playing'); 
    });
    audio.addEventListener('pause', function () { 
      console.log('Audio paused');
      vinyl.classList.remove('is-playing'); 
    });
    audio.addEventListener('ended', function () { 
      console.log('Audio ended');
      vinyl.classList.remove('is-playing'); 
    });

    playBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Play button clicked');
      if (audio.paused) { 
        audio.play().catch(function(err) {
          console.error('Playback failed:', err);
        });
      } else { 
        audio.pause(); 
      }
    });

    // Also allow clicking the vinyl itself
    vinyl.addEventListener('click', function(e) {
      if (e.target.closest('#vinyl-play')) return;
      playBtn.click();
    });

    return true;
  }

  // Use DOMContentLoaded first, fallback to ensureReady if needed
  function setup() {
    initCountdown();
    initAudio();
  }

