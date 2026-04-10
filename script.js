/**
 * NOLLY ULTRA ENGINE 2024
 * Логика: Галереи проектов (6 фото), ИИ (6 ответов), Плавный скролл
 */

// 1. ДАННЫЕ ПРОЕКТОВ (6 КЕЙСОВ)
const projects = {
    law: {
        title: "Адвокатские услуги",
        benefit: "Как это полезно для бизнеса: Создает образ непоколебимого авторитета. В юриспруденции сайт — это цифровая гарантия надежности, которая конвертирует доверие в крупные контракты.",
        video: "#", site: "#",
        photos: ["law1.jpg", "law2.jpg", "law3.jpg", "law4.jpg", "law5.jpg", "law6.jpg"] 
    },
    estate: {
        title: "Постройка домов",
        benefit: "Как это полезно для бизнеса: Визуализация мечты. Клиент влюбляется в проект дома через экран. Это мощный инструмент продаж, который снимает все возражения еще до звонка.",
        video: "#", site: "#",
        photos: ["es1.jpg", "es2.jpg", "es3.jpg", "es4.jpg", "es5.jpg", "es6.jpg"]
    },
    club: {
        title: "Сайт ночного клуба",
        benefit: "Как это полезно для бизнеса: Автоматизация ажиотажа. Онлайн-бронирование столов и стильная афиша создают очередь в заведение и упрощают работу персоналу.",
        video: "#", site: "#",
        photos: ["cl1.jpg", "cl2.jpg", "cl3.jpg", "cl4.jpg", "cl5.jpg", "cl6.jpg"]
    },
    auto: {
        title: "Премиальные авто",
        benefit: "Как это полезно для бизнеса: Эстетика превосходства. Интерфейс, соответствующий уровню люксового автопарка, подчеркивает высокий статус вашего дилерского центра.",
        video: "#", site: "#",
        photos: ["au1.jpg", "au2.jpg", "au3.jpg", "au4.jpg", "au5.jpg", "au6.jpg"]
    },
    agency: {
        title: "Креативное агентство",
        benefit: "Как это полезно для бизнеса: Демонстрация вкуса. Если вы продаете идеи, ваш сайт должен быть первой и главной идеей, которая заставит заказчика выбрать именно вас.",
        video: "#", site: "#",
        photos: ["ag1.jpg", "ag2.jpg", "ag3.jpg", "ag4.jpg", "ag5.jpg", "ag6.jpg"]
    },
    weather: {
        title: "Сервис погоды",
        benefit: "Как это полезно для бизнеса: Доказательство технической мощи. Работа с API и данными в реальном времени показывает, что моя организация способна на задачи любой сложности.",
        video: "#", site: "#",
        photos: ["we1.jpg", "we2.jpg", "we3.jpg", "we4.jpg", "we5.jpg", "we6.jpg"]
    }
};

// 2. УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
function openProject(id) {
    const data = projects[id];
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content-inject');

    content.innerHTML = `
        <h2 style="font-size: 2.8rem; font-weight: 800; margin-bottom: 20px; color: #fff;">${data.title}</h2>
        <p style="color: #94a3b8; font-size: 1.2rem; margin-bottom: 35px; line-height: 1.7;">${data.benefit}</p>
        
        <div class="gallery-grid">
            ${data.photos.map(p => `
                <div class="gallery-item">
                    <img src="${p}" alt="Project Preview" style="width:100%; height:100%; object-fit:cover;">
                </div>
            `).join('')}
        </div>

        <div style="margin-top: 45px; display: flex; gap: 20px; flex-wrap: wrap;">
            <a href="${data.site}" target="_blank" class="btn btn-main" style="padding: 16px 35px;">Перейти на сайт</a>
            <a href="${data.video}" target="_blank" class="btn btn-glass" style="padding: 16px 35px; margin: 0;">Смотреть видео-обзор</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeProject() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

// 3. ЛОГИКА ИИ-АССИСТЕНТА (6 ВОПРОСОВ)
const aiAnswers = [
    "Тарифы: Обычный (от 5к), Средний (от 15к), Высокий (от 40к). Премиальный дизайн включен в каждый пакет.",
    "Сроки: Я ценю скорость. Базовые сайты готовы за 1-3 дня, сложные системы — до 14 дней.",
    "Стек: Использую современный JavaScript (ES6+), HTML5 и CSS3. Сайты летают и идеально индексируются Google.",
    "Опыт: Мне 19 лет, и моя организация расширяется ежедневно. Мы внедряем тренды раньше, чем они становятся мейнстримом.",
    "Поддержка: Я не бросаю проекты. После запуска вы получаете месяц бесплатного сопровождения и обучения.",
    "Старт: Напишите в Telegram @wnolly прямо сейчас. Обсудим вашу задачу и запустим разработку сегодня!"
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
        display.style.color = '#00f2ff'; // Неоновый цвет ответа
    }, 250);
}

// Закрытие модалок при клике вне окна
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    const aiWin = document.getElementById('ai-chat-window');
    if (event.target == modal) closeProject();
}
