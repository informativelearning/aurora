// analytics.js
(function() {
  // Check if the user is on the authentication page
  if (window.location.pathname === '/authentication.html') return;

  // Check if the user is authenticated and has the correct version
  const currentVersion = 'v2'; // Update this version whenever you reset the password
  const isAuthenticated = localStorage.getItem('authenticated');
  const storedVersion = localStorage.getItem('authVersion');

  // If the user is not authenticated or the stored version is outdated, clear cache and redirect
  if (!isAuthenticated || storedVersion !== currentVersion) {
      localStorage.clear(); // Clear old authentication data
      window.location.href = '/authentication.html'; // Redirect to authentication page
  }

  // Google Analytics setup
  if (window.gtag) return; // Exit if gtag is already defined

  var gtagScript = document.createElement('script');
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-BFKBY6VQ33';
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  var inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BFKBY6VQ33');
  `;
  document.head.appendChild(inlineScript);
})();
