/**
 * NOLLY ULTRA ENGINE v6.0
 * Философия, Кейсы с галереями (6 фото), ИИ (6 ответов) и плавная навигация
 */

// 1. КОНТЕНТ ПРОЕКТОВ (Настрой здесь ссылки и пути к фото)
const projects = {
    law: {
        title: "Адвокатские услуги",
        benefit: "Как это полезно для личного дела: В юриспруденции сайт — это цифровая гарантия статуса. Моя разработка создает образ непоколебимого авторитета, конвертируя доверие в контракты.",
        video: "#", // Ссылка на видео-обзор
        site: "#",  // Ссылка на живой сайт
        photos: ["l1.jpg", "l2.jpg", "l3.jpg", "l4.jpg", "l5.jpg", "l6.jpg"] 
    },
    estate: {
        title: "Постройка домов",
        benefit: "Как это полезно для личного дела: Визуализация мечты. Сайт позволяет клиенту 'прожить' в доме еще до его постройки, что критически важно для продаж в недвижимости.",
        video: "#", site: "#",
        photos: ["e1.jpg", "e2.jpg", "e3.jpg", "e4.jpg", "e5.jpg", "e6.jpg"]
    },
    club: {
        title: "Сайт ночного клуба",
        benefit: "Как это полезно для личного дела: Автоматизация ажиотажа. Интерактивная афиша и бронирование столов онлайн создают очередь в ваше заведение 24/7.",
        video: "#", site: "#",
        photos: ["c1.jpg", "c2.jpg", "c3.jpg", "c4.jpg", "c5.jpg", "c6.jpg"]
    },
    auto: {
        title: "Премиальные авто",
        benefit: "Как это полезно для личного дела: Эстетика превосходства. Интерфейс подчеркивает статус бренда, отражая мощь и эксклюзивность вашего автопарка.",
        video: "#", site: "#",
        photos: ["a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg", "a6.jpg"]
    },
    agency: {
        title: "Креативное агентство",
        benefit: "Как это полезно для личного дела: Манифест вашего вкуса. Сайт — это визитка, которая оправдывает высокий чек и привлекает крупных заказчиков.",
        video: "#", site: "#",
        photos: ["ag1.jpg", "ag2.jpg", "ag3.jpg", "ag4.jpg", "ag5.jpg", "ag6.jpg"]
    },
    weather: {
        title: "Сервис погоды",
        benefit: "Как это полезно для личного дела: Демонстрация технологического уровня. Работа со сложными API доказывает вашу способность решать любые тех. задачи.",
        video: "#", site: "#",
        photos: ["w1.jpg", "w2.jpg", "w3.jpg", "w4.jpg", "w5.jpg", "w6.jpg"]
    }
};

// 2. УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ ПРОЕКТОВ
function openProject(id) {
    const data = projects[id];
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content-inject');

    content.innerHTML = `
        <h2 style="font-size: 2.8rem; font-weight: 800; margin-bottom: 20px; color: #fff;">${data.title}</h2>
        <p style="color: #94a3b8; font-size: 1.2rem; margin-bottom: 35px; line-height: 1.7;">${data.benefit}</p>
        
        <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            ${data.photos.map(p => `
                <div class="gallery-item" style="aspect-ratio: 16/9; background: #10192a; border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                    <img src="${p}" alt="Project Image" style="width:100%; height:100%; object-fit:cover;">
                </div>
            `).join('')}
        </div>

        <div style="margin-top: 45px; display: flex; gap: 20px; flex-wrap: wrap;">
            <a href="${data.site}" target="_blank" class="btn btn-neon-fill" style="padding: 16px 35px; border-radius: 100px; text-decoration: none; font-weight: 800; background: #00f2ff; color: #000;">Перейти на сайт</a>
            <a href="${data.video}" target="_blank" class="btn btn-glass-border" style="padding: 16px 35px; border-radius: 100px; text-decoration: none; font-weight: 800; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); margin: 0;">Смотреть обзор</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeProject() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

// 3. ЛОГИКА ИИ-АССИСТЕНТА (6 ответов)
const aiAnswers = [
    "Тарифы: Обычный (от 5к), Средний (от 15к), Высокий (от 40к). Инвестируйте в качество, которое окупается.",
    "Сроки: Я ценю ваше время. Базовые решения — от 1 дня, масштабные платформы — до 14 дней.",
    "Стек: Использую современный JavaScript (ES6+), HTML5 и CSS3. Сайты летают и безупречно индексируются.",
    "Опыт: Мне 19 лет, и моя организация — это энергия роста. Мы внедряем тренды раньше, чем они становятся нормой.",
    "Поддержка: После запуска вы получаете месяц бесплатного сопровождения и обучение работе с системой.",
    "Старт: Напишите в Telegram @wnolly прямо сейчас. Обсудим вашу задачу и запустим экспансию сегодня!"
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
        display.style.color = '#00f2ff'; 
    }, 250);
}

// Закрытие при клике вне окна
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) closeProject();
}

// 4. ПЛАВНАЯ НАВИГАЦИЯ
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
