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

  function setup() {
    initCountdown();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // --- Smooth scroll for any in-page anchor link (Capture phase) ---
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
    
    if (history.pushState) {
      history.pushState(null, null, id);
    } else {
      location.hash = id;
    }
  }, true);

  // --- FAQ accordion ---
  var allDetails = document.querySelectorAll('.faq details');
  allDetails.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        allDetails.forEach(function (o) { if (o !== d) o.open = false; });
      }
    });
  });

  // --- Audio sample: limit to 45s ---
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
      audio.addEventListener('play',  function () { 
        vinyl.classList.add('is-playing'); 
      });
      audio.addEventListener('pause', function () { 
        vinyl.classList.remove('is-playing'); 
      });
      audio.addEventListener('ended', function () { 
        vinyl.classList.remove('is-playing'); 
      });
    }

    // Use delegation on the vinyl card or container to avoid capture-phase interference
    var vinylCard = document.querySelector('.vinyl-card');
    if (vinylCard) {
      vinylCard.addEventListener('click', function (e) {
        var playBtn = e.target.closest('#vinyl-play');
        if (playBtn) {
          e.preventDefault();
          e.stopPropagation();
          if (audio.paused) { 
            audio.play().catch(function(err) { console.error('Play failed:', err); }); 
          } else { 
            audio.pause(); 
          }
        }
      });
    }
  }

  // --- Centralized UTM logic ---
  window.propagateUTMs = function() {
    function readSearch() {
      var s = window.location.search;
      if (s && s.length > 1) return s;
      try {
        if (window.parent && window.parent !== window && window.parent.location.search) {
          return window.parent.location.search;
        }
      } catch (e) {}
      try {
        if (document.referrer) {
          var r = new URL(document.referrer);
          if (r.search && r.search.length > 1) return r.search;
        }
      } catch (e) {}
      return '';
    }

    var incoming = new URLSearchParams(readSearch());

    function applyParams() {
      var links = document.querySelectorAll('a[href*="ggcheckout"]');
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        var base = a.getAttribute('href');
        if (!base) continue;
        var u;
        try { u = new URL(base, window.location.href); } catch (e) { continue; }
        u.search = '';
        incoming.forEach(function(value, key) {
          if (value !== '' && value !== null && typeof value !== 'undefined') {
            u.searchParams.set(key, value);
          }
        });
        a.setAttribute('href', u.toString());
      }
    }

    var hasIncoming = false;
    incoming.forEach(function(value) { if (value !== '') hasIncoming = true; });

    if (hasIncoming) {
      applyParams();
      document.addEventListener('click', function(e) {
        if (e.target.closest('a')) applyParams();
      }, true);
    }
  };

  document.addEventListener('DOMContentLoaded', window.propagateUTMs);
})();
