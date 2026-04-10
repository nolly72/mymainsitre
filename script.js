document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавная прокрутка для всех ссылок
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

    // 2. Эффект появления блоков при скролле (Intersection Observer)
    const observerOptions = {
        threshold: 0.15 // Блок начнет проявляться, когда виден на 15%
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Чтобы анимация была только один раз
            }
        });
    }, observerOptions);

    // Применяем ко всем секциям и карточкам
    const blocksToReveal = document.querySelectorAll('section, .level-card, .pricing-table-container');
    
    blocksToReveal.forEach(block => {
        block.classList.add('hidden-block'); // Начальное состояние
        revealOnScroll.observe(block);
    });

    // 3. Изменение прозрачности навигации при скролле
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 10, 21, 0.95)';
            navbar.style.padding = '15px 8%';
            navbar.style.borderBottom = '1px solid rgba(0, 122, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(5, 10, 21, 0.8)';
            navbar.style.padding = '25px 8%';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });
});
