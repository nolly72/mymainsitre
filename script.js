/**
 * NOLLY PORTFOLIO ENGINE
 * Интерактив: ИИ-ассистент, Плавный скролл и Обработка формы
 */

// 1. БАЗА ДАННЫХ ИИ-АССИСТЕНТА
const aiDatabase = [
    "Стоимость сайта начинается от 5,000₽ (Landing Page) до 40,000₽+ за сложные системы. Для точного расчета нужно ТЗ.",
    "Обычный сайт делаю за 1-3 дня. Средний уровень — до 7 дней. Сложные проекты — от 10 дней.",
    "Да, современный UI/UX дизайн уже включен в стоимость разработки каждого пакета услуг.",
    "Мой стек: HTML5, CSS3 (Grid/Flexbox), JavaScript (ES6+). Создаю чистый и быстрый код.",
    "Конечно! После сдачи проекта я предоставляю 30 дней бесплатной технической поддержки и правок.",
    "Напишите мне в Telegram @wnolly или оставьте заявку в форме ниже — я свяжусь с вами в течение часа!"
];

/**
 * Функция работы ИИ-ассистента
 */
function askAI(index) {
    const display = document.getElementById('ai-display');
    
    // Эффект затухания перед появлением ответа
    display.style.opacity = '0';
    display.style.transform = 'translateY(10px)';

    setTimeout(() => {
        display.innerText = aiDatabase[index];
        display.style.opacity = '1';
        display.style.transform = 'translateY(0)';
        display.style.color = '#f8fafc'; // Белый цвет активного текста
    }, 250);
}

// 2. ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА
document.addEventListener('DOMContentLoaded', () => {
    
    // Плавная прокрутка для всех ссылок с якорем (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Оставляем место под шапку
                    behavior: 'smooth'
                });
            }
        });
    });

    // Эффект шапки при скролле
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(2, 6, 23, 0.95)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(2, 6, 23, 0.85)';
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Обработка отправки формы
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Предотвращаем перезагрузку страницы
            
            const btn = requestForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Имитация отправки
            btn.innerText = 'Отправка...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Спасибо! Ваши данные успешно отправлены Nolly. Я свяжусь с вами в ближайшее время.');
                requestForm.reset(); // Очистка полей
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
