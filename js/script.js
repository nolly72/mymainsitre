/* ============================================================
   SCRIPT.JS — Интерактив, AI-помощник, Слайдер и Отправка
   ============================================================ */

// 0. ИНИЦИАЛИЗАЦИЯ EMAILJS
(function() {
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ЛОГИКА AI-АССИСТЕНТА
    const aiBtn = document.getElementById('newAiBtn'); // Обновили ID
const aiChat = document.getElementById('aiChat');
const aiBox = document.getElementById('aiBox');
const qButtons = document.querySelectorAll('.ai-q');

if (aiBtn && aiChat) {
    aiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Принудительно меняем видимость, если класс .active не срабатывает
        if (aiChat.style.display === 'block') {
            aiChat.style.display = 'none';
        } else {
            aiChat.style.display = 'block';
        }
        aiChat.classList.toggle('active');
        console.log("Новая кнопка сработала!"); 
    });
}

    qButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const qId = button.getAttribute('data-q');
            const aiAnswers = {
                "1": "Мой основной стек: чистый JavaScript (ES6+), современные стандарты HTML5 и CSS3...",
                "2": "Lite-проекты сдаю за 3 дня. High-End сайты — от 7 до 14 дней.",
                "3": "Да, каждый проект начинается с макета в Figma. Никаких шаблонов.",
                "4": "Я даю пожизненную гарантию на работоспособность кода.",
                "5": "Работаю официально как самозанятый. Возможен договор.",
                "6": "Система 50/50: после дизайна и после полной готовности.",
                "7": "Я открыт к обсуждению. Для крутых стартапов есть бонусы.",
                "8": "Помогу с хостингом: от Vercel до выделенных серверов.",
                "9": "SEO-база (теги, мета, скорость) уже включена в работу.",
                "10": "Мне 19, я горю своим делом и даю премиум-качество дешевле студий."
            };

            if (aiBox) {
                aiBox.style.opacity = '0.5';
                aiBox.innerText = "NOLLY печатает...";
                setTimeout(() => {
                    aiBox.style.opacity = '1';
                    aiBox.innerText = aiAnswers[qId];
                }, 500);
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (aiChat && aiChat.classList.contains('active')) {
            if (!aiChat.contains(e.target) && e.target !== aiBtn) {
                aiChat.classList.remove('active');
            }
        }
    });

    // ЗДЕСЬ БУДЕТ ПРОДОЛЖЕНИЕ (Кейсы, Формы и т.д.)

}); // Закрытие DOMContentLoaded

// 2. ЛОГИКА МОДАЛЬНЫХ ОКОН (Добавил, чтобы работали остальные кнопки)
function openOrderModal(plan) {
    const modal = document.getElementById('orderModal');
    if(modal) {
        modal.style.display = 'flex';
        document.getElementById('selected-plan').value = plan;
    }
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function closeModal() {
    // Для окна кейсов
    const caseModal = document.getElementById('caseModal');
    if(caseModal) caseModal.style.display = 'none';
}
</script>


    // 2. ЛОГИКА МОДАЛЬНЫХ ОКОН (КЕЙСЫ И ЗАКАЗ)
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
            const btn = document.getElementById('submit-btn');
            const originalText = btn ? btn.innerText : "Отправить запрос";
            
            if (btn) { btn.innerText = "Отправка..."; btn.disabled = true; }

            emailjs.sendForm('service_ernscfc', 'template_ra86h16', this)
                .then(() => {
                    alert('Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.');
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

    // Закрытие окон при клике вне их области
    window.addEventListener('click', (e) => {
        if (e.target === caseModal) closeModal();
        if (e.target === orderModal) closeOrderModal();
        // Закрытие AI чата при клике мимо
        if (aiChat && aiChat.classList.contains('active')) {
            if (!aiChat.contains(e.target) && !aiBtn.contains(e.target)) {
                aiChat.classList.remove('active');
            }
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") { closeModal(); closeOrderModal(); }
    });

    // 3. АНИМАЦИЯ ПРИ СКРОЛЛЕ.
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
