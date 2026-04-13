/* ============================================================
   SCRIPT.JS — Интерактив, AI-помощник, Слайдер и Отправка
   ============================================================ */

// 0. ИНИЦИАЛИЗАЦИЯ EMAILJS
(function() {
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ЛОГИКА AI-АССИСТЕНТА
    const aiBtn = document.getElementById('aiBtn');
    const aiChat = document.getElementById('aiChat');
    const aiBox = document.getElementById('aiBox');
    const qButtons = document.querySelectorAll('.ai-q');

    const aiAnswers = {
        "1": "Мой основной стек: чистый JavaScript (ES6+), современные стандарты HTML5 и CSS3. Для сложных интерфейсов использую библиотеки анимаций GSAP или Framer Motion.",
        "2": "Lite-проекты сдаю за 3 дня. High-End сайты с индивидуальным дизайном и анимациями занимают от 7 до 14 дней.",
        "3": "Да, каждый проект начинается с макета в Figma. Я создаю уникальный визуальный язык, а не использую готовые шаблоны.",
        "4": "Я даю пожизненную гарантию на работоспособность моего кода. Если возникнет баг — исправлю его бесплатно в кратчайшие сроки.",
        "5": "Работаю официально как самозанятый. Можем заключить договор, где будут прописаны все этапы, сроки и итоговая стоимость.",
        "6": "Обычно работаю по системе 50/50: первая часть после утверждения дизайна, вторая — после полной готовности и теста сайта.",
        "7": "Я всегда открыт к обсуждению. При заказе комплекса услуг или для очень интересных стартапов я делаю приятные бонусы.",
        "8": "Я помогу с выбором и настройкой: от бесплатного Vercel для лендингов до мощных защищенных серверов для крупных проектов.",
        "9": "В каждый сайт уже заложена правильная структура для поисковиков: теги, мета-данные, высокая скорость загрузки и адаптивность.",
        "10": "Мне 19, и я горю своим делом. Я предлагаю премиальный уровень дизайна и разработки по ценам, которые ниже рыночных студийных."
    };

    if (aiBtn && aiChat) {
        aiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Исправленная логика переключения
            const isActive = aiChat.classList.contains('active');
            if (isActive) {
                aiChat.classList.remove('active');
                aiChat.classList.add('hidden');
            } else {
                aiChat.classList.remove('hidden');
                aiChat.classList.add('active');
            }
        });
    }

    qButtons.forEach(button => {
        button.addEventListener('click', () => {
            const qId = button.getAttribute('data-q');
            const answer = aiAnswers[qId];
            if (aiBox) {
                aiBox.style.opacity = '0.5';
                aiBox.innerText = "NOLLY печатает...";
                setTimeout(() => {
                    aiBox.style.opacity = '1';
                    aiBox.innerText = answer;
                }, 500);
            }
        });
    });

    // 2. ЛОГИКА МОДАЛЬНЫХ ОКОН
    const caseModal = document.getElementById('caseModal');
    const orderModal = document.getElementById('orderModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const orderTitle = document.getElementById('orderTitle');
    const slideCounter = document.getElementById('slideCounter');
    const orderForm = document.getElementById('order-form');

    let currentImages = [];
    let currentSlideIndex = 0;

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

    window.openOrderModal = function(planName) {
        if (!orderModal) return;
        if (orderTitle) orderTitle.innerText = `Заказать тариф: ${planName}`;
        const planInput = document.getElementById('selected-plan');
        if (planInput) planInput.value = planName;
        orderModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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

    window.closeModal = function() {
        if (caseModal) caseModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    };

    window.closeOrderModal = function() {
        if (orderModal) orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // --- ОТПРАВКА ФОРМЫ ---
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.querySelector('#order-form button[type="submit"]');
            const originalText = btn ? btn.innerText : "Отправить";
            if (btn) { btn.innerText = "Отправка..."; btn.disabled = true; }

            // Используем твои проверенные данные
            emailjs.sendForm('service_ernscfc', 'template_ra86h16', this)
                .then(() => {
                    alert('Заявка успешно отправлена!');
                    orderForm.reset();
                    closeOrderModal();
                }, (err) => {
                    alert('Ошибка: ' + JSON.stringify(err));
                })
                .finally(() => {
                    if (btn) { btn.innerText = originalText; btn.disabled = false; }
                });
        });
    }

    // Закрытие окон
    window.addEventListener('click', (e) => {
        if (e.target === caseModal) closeModal();
        if (e.target === orderModal) closeOrderModal();
        if (aiChat && !aiChat.contains(e.target) && !aiBtn.contains(e.target)) {
            aiChat.classList.remove('active');
            aiChat.classList.add('hidden');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") { closeModal(); closeOrderModal(); }
    });

    // 3. АНИМАЦИЯ ПРИ СКРОЛЛЕ
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('reveal-active');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.phi-card, .case-card, .price-card, .skill-card, .section-title, .main-project').forEach(item => {
        item.classList.add('reveal-hidden');
        observer.observe(item);
    });
});
