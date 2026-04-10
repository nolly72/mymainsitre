/**
 * NOLLY PREMIUM ENGINE 2024
 * Логика портфолио, модальных окон и ИИ-ассистента
 */

// 1. ДАННЫЕ ПРОЕКТОВ (Контент для модальных окон)
const projectDetails = {
    law: {
        title: "Адвокатские услуги",
        tag: "Premium Law",
        benefit: "Как это полезно для бизнеса: Создает образ непоколебимого авторитета. В юриспруденции доверие — это валюта. Сайт конвертирует посетителя в клиента за счет строгого стиля и четкой структуры услуг.",
        description: "Интерфейс с упором на экспертность. Включает блоки с практикой, отзывами и защищенную форму записи на консультацию.",
        features: ["Элитная типографика", "Формы обратной связи", "Адаптация под Mobile"]
    },
    estate: {
        title: "Постройка домов",
        tag: "Real Estate",
        benefit: "Как это полезно для бизнеса: Визуализация мечты. Сайт позволяет клиенту 'пожить' в доме еще до его постройки. Высокая скорость загрузки фото высокого разрешения критична для продаж недвижимости.",
        description: "Полноэкранные галереи, интерактивные планировки и калькулятор стоимости строительства.",
        features: ["Галереи 4K", "Калькулятор сметы", "SEO-оптимизация"]
    },
    club: {
        title: "Сайт ночного клуба",
        tag: "Entertainment",
        benefit: "Как это полезно для бизнеса: Автоматизация хаоса. Бронирование столов онлайн снижает нагрузку на хостес, а стильный дизайн привлекает премиальную аудиторию города.",
        description: "Интерактивная карта столов, афиша событий с интеграцией билетов и яркий визуал.",
        features: ["Бронирование столов", "Интеграция соцсетей", "Dark Mode Design"]
    },
    auto: {
        title: "Премиальные авто",
        tag: "Auto Premium",
        benefit: "Как это полезно для бизнеса: Эстетика, соответствующая товару. Продажа дорогих авто требует безупречного интерфейса, который подчеркивает статус бренда.",
        description: "Каталог с детальными характеристиками, сравнением моделей и записью на тест-драйв.",
        features: ["Фильтрация моделей", "Форма тест-драйва", "Сверхбыстрый поиск"]
    },
    agency: {
        title: "Креативное агентство",
        tag: "Creative Agency",
        benefit: "Как это полезно для бизнеса: Демонстрация вкуса. Если вы продаете креатив, ваш сайт должен быть произведением искусства. Это визитка, которая оправдывает высокий чек.",
        description: "Минималистичный лендинг с упором на портфолио и команду. Плавные анимации и смелые решения.",
        features: ["Анимации GSAP-style", "Акцент на кейсы", "Премиальный UX"]
    },
    weather: {
        title: "Сервис погоды",
        tag: "API Utility",
        benefit: "Как это полезно для бизнеса: Демонстрация технической мощи. Показывает вашу способность работать со сложными данными и API. Идеально для привлечения заказов на SaaS-сервисы.",
        description: "Сервис реального времени с геопозицией пользователя и динамической сменой фона.",
        features: ["Интеграция API", "Геолокация", "Инфографика данных"]
    }
};

// 2. ФУНКЦИИ МОДАЛЬНОГО ОКНА ПРОЕКТОВ
function showDetails(projectId) {
    const data = projectDetails[projectId];
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-inner-content');

    content.innerHTML = `
        <div class="modal-img-large">
            <!-- Место для фото: <img src="${projectId}-large.jpg" style="width:100%; border-radius:20px;"> -->
            <div style="display:flex; align-items:center; justify-content:center; height:100%; color:#3b82f6; font-weight:800; letter-spacing:3px;">
                ${data.title.toUpperCase()} FULL VIEW
            </div>
        </div>
        <span class="category purple" style="margin-bottom:20px; display:inline-block;">${data.tag}</span>
        <h2 style="font-size:2.5rem; margin-bottom:20px; font-family:'Manrope';">${data.title}</h2>
        <p style="color:#f8fafc; font-size:1.1rem; margin-bottom:30px; font-weight:600; line-height:1.6;">${data.benefit}</p>
        <p style="color:#94a3b8; margin-bottom:30px;">${data.description}</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${data.features.map(f => `<span style="background:rgba(255,255,255,0.05); padding:8px 15px; border-radius:10px; font-size:0.8rem; border:1px solid rgba(255,255,255,0.1);">${f}</span>`).join('')}
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Запрет скролла фона
}

function closeDetails() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 3. ЛОГИКА ИИ-АССИСТЕНТА
const aiAnswers = [
    "Стоимость: Лендинги от 5к, бизнес-сайты от 15к, сложные системы от 40к. Скидка 10% на первый заказ!",
    "Сроки: Я работаю быстро. Базовый сайт 1-3 дня, сложный проект — до 10-14 дней.",
    "Стек: HTML5, CSS3 (Modern Flex/Grid), Чистый JavaScript. Код легкий и летает на Vercel.",
    "Старт: Напиши мне в ТГ @wnolly прямо сейчас, обсудим идею за 5 минут!"
];

function toggleAI() {
    const win = document.getElementById('ai-chat');
    win.style.display = (win.style.display === 'block') ? 'none' : 'block';
}

function askAI(index) {
    const output = document.getElementById('ai-output');
    output.style.opacity = '0';
    setTimeout(() => {
        output.innerText = aiAnswers[index];
        output.style.opacity = '1';
        output.style.color = '#3b82f6';
    }, 200);
}

// 4. ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) closeDetails();
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
