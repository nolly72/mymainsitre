/* ============================================================
   SCRIPT.JS — Интерактив, AI-помощник и Модальные окна
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ЛОГИКА AI-АССИСТЕНТА
    const aiBtn = document.getElementById('aiBtn');
    const aiChat = document.getElementById('aiChat');
    const aiBox = document.getElementById('aiBox');
    const qButtons = document.querySelectorAll('.ai-q');

    // База заскриптованных ответов
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

    // Открытие/закрытие чата
    aiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        aiChat.classList.toggle('hidden');
    });

    // Обработка клика по вопросу
    qButtons.forEach(button => {
        button.addEventListener('click', () => {
            const qId = button.getAttribute('data-q');
            const answer = aiAnswers[qId];
            
            // Эффект имитации раздумья
            aiBox.style.opacity = '0.5';
            aiBox.innerText = "NOLLY печатает...";
            
            setTimeout(() => {
                aiBox.style.opacity = '1';
                aiBox.innerText = answer;
            }, 600);
        });
    });

    // 2. ЛОГИКА МОДАЛЬНЫХ ОКОН (КЕЙСЫ)
    const modal = document.getElementById('caseModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    window.openModal = function(imgSrc, title, description) {
        modalImg.style.backgroundImage = `url('${imgSrc}')`;
        modalTitle.innerText = title;
        modalDesc.innerText = description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Запрещаем скролл при открытом окне
    };

    window.closeModal = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Возвращаем скролл
    };

    // Закрытие модалки по клику вне окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
        if (!aiChat.contains(e.target) && !aiBtn.contains(e.target)) {
            aiChat.classList.add('hidden');
        }
    });

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Выбираем все карточки для плавной анимации
    const itemsToAnimate = document.querySelectorAll('.phi-card, .case-card, .price-card');
    itemsToAnimate.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(item);
    });
});
