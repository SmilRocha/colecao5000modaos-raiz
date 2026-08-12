/* Coleção Modão Sertanejo Raiz — vanilla JS */
(function () {
  'use strict';

  // --- Countdown: 24h cycle, resets when it hits zero ---
  var el = document.getElementById('countdown');
  if (el) {
    var DURATION = 24 * 60 * 60 * 1000; // 24h
    var start = Date.now();
    function tick() {
      var elapsed = Date.now() - start;
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

  // --- Smooth scroll for any in-page anchor link (Capture phase to avoid conflicts) ---
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
