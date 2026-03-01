// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Initially hide all answers
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease';
    
    question.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight !== '0px';
        
        // Close all other items
        faqItems.forEach(otherItem => {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = '0';
        });
        
        // Toggle current item
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.timeline-item, .stage-card, .profile-card, .value, .infra-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero stats counter animation
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = stat.textContent;
        if (target === '∞') return; // Skip infinity symbol
        
        const duration = 2000;
        const steps = 60;
        const increment = parseInt(target) / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(target)) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, duration / steps);
    });
};

// Trigger stats animation on page load
window.addEventListener('load', () => {
    setTimeout(animateStats, 500);
});
