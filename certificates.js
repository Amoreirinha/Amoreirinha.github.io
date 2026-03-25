/**
 * certificates.js
 * Scroll-triggered fade-in for cert cards + smooth link interception.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Intersection Observer: reveal cards on scroll ── */
    const cards = document.querySelectorAll('.cert-card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Stagger each card slightly based on its index within its parent
                    const siblings = Array.from(entry.target.parentElement.children);
                    const idx = siblings.indexOf(entry.target);
                    const delay = idx * 80; // ms

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    cards.forEach((card) => observer.observe(card));

    /* ── Smooth scroll for any in-page anchor ── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── MODAL CERTIFICATE ── */
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-image');
    const closeBtn = document.querySelector('.cert-close');

    document.querySelectorAll('.view-cert').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const imgSrc = link.getAttribute('data-img');

            if (imgSrc) {
                modalImg.src = imgSrc;
                modal.classList.add('active');
            }
        });
    });

    /* FECHAR */
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    /* clicar fora também fecha */
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

});