/**
 * NOLLY CORE ENGINE v3.0
 * Полная логика: Галереи проектов (6 фото), ИИ (6 ответов) и Ссылки
 */

// 1. КОНТЕНТ ПРОЕКТОВ (6 кейсов)
const projects = {
    law: {
        title: "Адвокатские услуги",
        benefit: "Создание непоколебимого авторитета. В юриспруденции сайт — это лицо вашей надежности. Мой дизайн конвертирует доверие в долгосрочные контракты.",
        video: "#видео_обзор", // Вставь ссылку
        site: "#ссылка_на_сайт", // Вставь ссылку
        photos: ["l1.jpg", "l2.jpg", "l3.jpg", "l4.jpg", "l5.jpg", "l6.jpg"] 
    },
    estate: {
        title: "Постройка домов",
        benefit: "Визуализация мечты. Клиент влюбляется в проект дома через экран. Это мощный инструмент продаж для строительного бизнеса.",
        video: "#", site: "#",
        photos: ["e1.jpg", "e2.jpg", "e3.jpg", "e4.jpg", "e5.jpg", "e6.jpg"]
    },
    club: {
        title: "Сайт ночного клуба",
        benefit: "Автоматизация отдыха. Интерактивное бронирование и афиша превращают случайного посетителя в постоянного гостя вашего заведения.",
        video: "#", site: "#",
        photos: ["c1.jpg", "c2.jpg", "c3.jpg", "c4.jpg", "c5.jpg", "c6.jpg"]
    },
    auto: {
        title: "Премиальные авто",
        benefit: "Эстетика скорости и статуса. Интерфейс, который соответствует уровню люксовых автомобилей и подчеркивает эксклюзивность сервиса.",
        video: "#", site: "#",
        photos: ["a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg", "a6.jpg"]
    },
    agency: {
        title: "Креативное агентство",
        benefit: "Манифест стиля. Кейсы упакованы так, чтобы заказчик понимал: вы — лучшие в своем деле. Креатив, подкрепленный мощным кодом.",
        video: "#", site: "#",
        photos: ["ag1.jpg", "ag2.jpg", "ag3.jpg", "ag4.jpg", "ag5.jpg", "ag6.jpg"]
    },
    weather: {
        title: "Сервис погоды",
        benefit: "Технологическое превосходство. Работа с API и данными в реальном времени доказывает, что моя организация справится с любой технической задачей.",
        video: "#", site: "#",
        photos: ["w1.jpg", "w2.jpg", "w3.jpg", "w4.jpg", "w5.jpg", "w6.jpg"]
    }
};

// 2. УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ ПРОЕКТОВ
function openProject(id) {
    const data = projects[id];
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content-inject');

    // Генерируем HTML для галереи и описания
    content.innerHTML = `
        <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 15px;">${data.title}</h2>
        <p style="color: var(--text-gray); font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6;">${data.benefit}</p>
        
        <div class="gallery-grid">
            ${data.photos.map(p => `
                <div class="gallery-item">
                    <img src="${p}" alt="Project Screen" style="width:100%; height:100%; object-fit:cover;">
                </div>
            `).join('')}
        </div>

        <div style="margin-top: 40px; display: flex; gap: 20px; flex-wrap: wrap;">
            <a href="${data.site}" target="_blank" class="btn btn-main" style="padding: 14px 30px;">Перейти на сайт</a>
            <a href="${data.video}" target="_blank" class="btn btn-glass" style="padding: 14px 30px; margin: 0;">Смотреть обзор</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Запрет скролла
}

function closeProject() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Возврат скролла
}

// 3. ЛОГИКА ИИ-АССИСТЕНТА (6 вопросов)
const aiAnswers = [
    "Тарифы: Обычный (от 5к), Средний (от 15к), Высокий (от 40к). Премиальное качество в каждом пакете.",
    "Сроки: Я ценю ваше время. Базовые проекты от 1 дня, сложные системы — до 14 дней.",
    "Стек: Использую современный JavaScript (ES6+), HTML5 и CSS3. Код чистый, быстрый и масштабируемый.",
    "Опыт: Мне 19 лет, и моя организация развивается ежедневно. Мы внедряем решения, которые станут стандартом завтра.",
    "Поддержка: Я предоставляю полное сопровождение после запуска и обучаю вас работе с сайтом.",
    "Старт: Просто напишите мне в Telegram @wnolly. Обсудим вашу идею и начнем экспансию вашего бизнеса!"
];

function toggleAI() {
    const win = document.getElementById('ai-chat-window');
    win.style.display = (win.style.display === 'block') ? 'none' : 'block';
}

function askAI(index) {
    const display = document.getElementById('ai-display');
    display.style.opacity = '0';
    setTimeout(() => {
        display.innerText = aiAnswers[index];
        display.style.opacity = '1';
        display.style.color = '#3b82f6';
    }, 250);
}

// Закрытие модалки при клике на темный фон
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) closeProject();
}
