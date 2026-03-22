// Google Analytics - only load if not on localhost
(function() {
    const hostname = window.location.hostname;
    const gaId = window.googleAnalyticsId; // Set by template
    
    if (gaId && hostname !== 'localhost' && hostname !== '127.0.0.1') {
        // Load Google Analytics script
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gaScript);
        
        // Initialize GA
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gaId);
    }
})();
