// analytics.js
(function() {
  console.log('Running analytics.js...');

  // Check if the user is on the authentication page
  if (window.location.pathname === '/authentication.html') {
    console.log('On authentication page. Skipping check.');
    return;
  }

  // Check if the user is authenticated and has the correct version
  const currentVersion = 'v5'; // Update this version whenever you reset the password
  const isAuthenticated = localStorage.getItem('authenticated');
  const storedVersion = localStorage.getItem('authVersion');

  // Debugging logs
  console.log('Auth Token:', localStorage.getItem('authToken'));
  console.log('Auth Timestamp:', localStorage.getItem('authTimestamp'));
  console.log('Stored Version:', storedVersion);
  console.log('Is Authenticated:', isAuthenticated);

  // If the user is not authenticated or the stored version is outdated,
  // only remove authentication-related data and redirect
  if (!isAuthenticated || storedVersion !== currentVersion) {
      console.log('Authentication check failed.');
      console.log('Clearing old authentication data and redirecting...');
      localStorage.removeItem('authenticated'); // Clear only authentication-related data
      localStorage.removeItem('authVersion');   // Clear the old auth version
      window.location.href = '/authentication.html'; // Redirect to authentication page
  } else {
      console.log('Authentication passed. Proceeding...');
  }

  // Google Analytics setup
  if (window.gtag) {
    console.log('Google Analytics already loaded.');
    return;
  }

  console.log('Loading Google Analytics...');
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
  console.log('Google Analytics initialized.');
})();
