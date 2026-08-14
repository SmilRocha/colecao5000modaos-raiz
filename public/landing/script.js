/* Coleção Modão Sertanejo Raiz — vanilla JS */
(function () {
  'use strict';

  // --- Countdown: 24h cycle, resets when it hits zero ---
  var el = document.getElementById('countdown');
  if (el) {
    var DURATION = 10 * 60 * 1000; // 10 minutes
    var start = Date.now();
    function tick() {
      var elapsed = Date.now() - start;
      var remaining = DURATION - (elapsed % DURATION);
      var m = Math.floor(remaining / 60000);
      var s = Math.floor((remaining % 60000) / 1000);
      el.textContent =
        String(m).padStart(2, '0') + ':' +
        String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  // --- Smooth scroll for any in-page anchor link ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

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
  var audio = document.getElementById('sample-audio');
  var vinyl = document.getElementById('vinyl');
  if (audio) {
    audio.addEventListener('timeupdate', function () {
      if (audio.currentTime >= 45) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    if (vinyl) {
      audio.addEventListener('play',  function () { vinyl.classList.add('is-playing'); });
      audio.addEventListener('pause', function () { vinyl.classList.remove('is-playing'); });
      audio.addEventListener('ended', function () { vinyl.classList.remove('is-playing'); });
    }
    var playBtn = document.getElementById('vinyl-play');
    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (audio.paused) { audio.play(); } else { audio.pause(); }
      });
    }
  }
})();
