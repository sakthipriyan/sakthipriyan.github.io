// Mobile navigation drawer: hamburger toggle, overlay, and scroll lock.
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function close() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');

        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    overlay.addEventListener('click', close);

    // Close the drawer on navigation, without blocking the link itself.
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && hamburger.classList.contains('active')) close();
    });
});
