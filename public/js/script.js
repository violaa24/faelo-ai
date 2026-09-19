// Tailwind theme configuration.
// This runs immediately because Tailwind needs the custom brand colors before rendering.
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                },
                colors: {
                    brand: {
                        blue: '#3B82F6',
                        dark: '#0F172A',
                        light: '#F8FAFC',
                        gray: '#64748B'
                    }
                }
            }
        }
    };
}

// Enables animation starting states only when JavaScript is available.
document.documentElement.classList.add('js-enabled');

// Wait until all HTML elements are available before connecting interactions.
document.addEventListener('DOMContentLoaded', () => {
    // Hero entrance animation: stagger the main message and interface mockup.
    const heroItems = document.querySelectorAll('.hero-reveal');
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            heroItems.forEach(item => item.classList.add('is-visible'));
        });
    });

    // Reveal each animated section as it enters the viewport.
    const scrollRevealItems = document.querySelectorAll('.scroll-reveal, .process-line');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -10% 0px'
        });

        scrollRevealItems.forEach(item => revealObserver.observe(item));
    } else {
        scrollRevealItems.forEach(item => item.classList.add('is-visible'));
    }

    // Navbar scroll shadow
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        nav.classList.toggle('shadow-sm', window.scrollY > 20);
    });

    // Mobile menu toggle (bars ↔ X)
    const mobileBtn  = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon   = document.getElementById('menu-icon');

    mobileBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', isOpen);
        menuIcon.classList.toggle('fa-bars', isOpen);
        menuIcon.classList.toggle('fa-xmark', !isOpen);
        mobileBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close mobile menu when any link/button inside it is tapped.
    document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
            mobileBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isOpen = toggle.classList.contains('open');

            // Close all FAQ answers.
            document.querySelectorAll('.faq-toggle').forEach(item => {
                item.classList.remove('open');
                item.nextElementSibling.classList.remove('open');
                item.setAttribute('aria-expanded', 'false');
            });

            // Open the clicked answer if it was previously closed.
            if (!isOpen) {
                toggle.classList.add('open');
                content.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Book-a-demo modal
    const modal        = document.getElementById('demoModal');
    const demoForm     = document.getElementById('demoForm');
    const successState = document.getElementById('successState');
    const formMessage  = document.getElementById('formMessage');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        demoForm.style.display = 'block';
        successState.style.display = 'none';
        demoForm.reset();
        formMessage.hidden = true;
        formMessage.textContent = '';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('[data-open-demo]').forEach(button => {
        button.addEventListener('click', openModal);
    });

    document.querySelectorAll('[data-close-demo]').forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close the modal when its dark backdrop is clicked.
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close the modal with the Escape key.
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
