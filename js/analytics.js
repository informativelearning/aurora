// analytics.js
(function() {
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
