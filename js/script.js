/* ============================================================
   ЕДИНЫЙ СКРИПТ: МОДАЛКИ, КЕЙСЫ, AI И MAILJS
   ============================================================ */

// 1. Инициализация EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("uMomqe3GHuHo1r5KO"); 
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const caseModal = document.getElementById('caseModal');
    const orderModal = document.getElementById('orderModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const orderTitle = document.getElementById('orderTitle');
    const slideCounter = document.getElementById('slideCounter');
    const orderForm = document.getElementById('order-form');
    const aiBtn = document.getElementById('newAiBtn');
    const aiChat = document.getElementById('aiChat');
    const aiBox = document.getElementById('aiBox');

    let currentImages = [];
    let currentSlideIndex = 0;

    // --- ЛОГИКА КЕЙСОВ ---
    window.openModal = function(images, title, description) {
        if (!caseModal) return;
        currentImages = Array.isArray(images) ? images : [images];
        currentSlideIndex = 0;
        if (modalTitle) modalTitle.innerText = title;
        if (modalDesc) modalDesc.innerText = description;
        updateSlide();
        caseModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    };

    window.closeModal = function() {
        if (caseModal) caseModal.style.display = 'none';
        if (!orderModal || orderModal.style.display !== 'flex') {
            document.body.style.overflow = 'auto';
        }
    };

    window.changeSlide = function(direction) {
        if (currentImages.length <= 1) return;
        currentSlideIndex += direction;
        if (currentSlideIndex >= currentImages.length) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = currentImages.length - 1;
        updateSlide();
    };

    function updateSlide() {
        if (!modalImg) return;
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.style.backgroundImage = `url('${currentImages[currentSlideIndex]}')`;
            modalImg.style.opacity = '1';
        }, 150);
        if (slideCounter) {
            slideCounter.innerText = `${currentSlideIndex + 1} / ${currentImages.length}`;
            slideCounter.style.display = currentImages.length > 1 ? 'block' : 'none';
        }
    }

    // --- ЛОГИКА ЗАКАЗА ---
    window.openOrderModal = function(planName) {
        if (!orderModal) return;
        if (orderTitle) orderTitle.innerText = `Заказать: ${planName}`;
        const planInput = document.getElementById('selected-plan');
        if (planInput) planInput.value = planName;
        orderModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeOrderModal = function() {
        if (orderModal) orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // --- ОТПРАВКА MAILJS ---
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn ? btn.innerText : "Отправить";
            
            if (btn) { btn.innerText = "Отправка..."; btn.disabled = true; }

            // ПРОВЕРЬ ID ШАБЛОНА ТУТ (ra86h16 или vakrk4p)
            emailjs.sendForm('service_ernscfc', 'template_ra86h16', this)
                .then(() => {
                    alert('Заявка отправлена! Я скоро свяжусь с вами.');
                    orderForm.reset();
                    window.closeOrderModal();
                })
                .catch((err) => {
                    alert('Ошибка: ' + JSON.stringify(err));
                })
                .finally(() => {
                    if (btn) { btn.innerText = originalText; btn.disabled = false; }
                });
        });
    }

    // --- ЛОГИКА AI ---
    const responses = {
        "1": "Использую HTML5, CSS3, JS и современные фреймворки.",
        "2": "Сроки: от 3 до 10 дней в зависимости от сложности.",
        "3": "Да, рисую уникальный дизайн в Figma.",
        "4": "Конечно, 2 недели бесплатной поддержки.",
        "5": "Работаю официально, можем заключить договор.",
        "6": "Карта, крипта или расчетный счет.",
        "7": "При заказе 'под ключ' всегда делаю скидку.",
        "8": "Помогу с выбором и настройкой хостинга.",
        "9": "Делаю базовую SEO-подготовку для всех сайтов.",
        "10": "Качество кода + современный дизайн + сроки."
    };

    if (aiBtn) {
        aiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            aiChat.classList.toggle('active');
        });
    }

    document.querySelectorAll('.ai-q').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-q');
            if (aiBox) aiBox.innerText = responses[id] || "Спроси меня в Telegram!";
        });
    });

    // --- ЗАКРЫТИЕ ПО КЛИКУ ВНЕ ОКОН ---
    window.addEventListener('click', (e) => {
        if (e.target === caseModal) window.closeModal();
        if (e.target === orderModal) window.closeOrderModal();
        if (aiChat && !aiChat.contains(e.target) && e.target !== aiBtn) {
            aiChat.classList.remove('active');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") { window.closeModal(); window.closeOrderModal(); }
    });
});
