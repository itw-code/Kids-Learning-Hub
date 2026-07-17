(function () {
  window.addEventListener('DOMContentLoaded', function () {
    // 1. Fix existing home links in the HTML
    const homeLinks = document.querySelectorAll('a[href="../index.html"], a.home-btn-subpage, a.home-button');
    if (homeLinks.length > 0) {
      homeLinks.forEach(function (link) {
        link.setAttribute('href', '/');
      });
      return; // Found and fixed existing link, no need to create floating button
    }

    // 2. If no home link found, inject floating child-friendly yellow home button
    if (document.getElementById('hub-home-button')) return;

    const homeBtn = document.createElement('button');
    homeBtn.id = 'hub-home-button';
    homeBtn.innerHTML = '🏠';
    homeBtn.setAttribute('aria-label', 'Return to Kids Hub Home');
    
    // Inject styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/hub-nav.css';
    document.head.appendChild(link);

    const goHome = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      window.location.href = '/';
    };

    homeBtn.addEventListener('click', goHome);
    homeBtn.addEventListener('touchstart', goHome, { passive: false });

    document.body.appendChild(homeBtn);
  });
})();
