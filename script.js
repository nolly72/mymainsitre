/**
 * NOLLY PORTFOLIO ENGINE
 * Интерактив для сайта: ИИ-ассистент, Скролл и Форма
 */

// 1. БАЗА ДАННЫХ ИИ-АССИСТЕНТА
const aiDatabase = [
    "Стоимость сайта начинается от 5,000₽ (Landing Page) до 40,000₽+ за сложные системы. Для точного расчета нужно ТЗ.",
    "Обычный сайт делаю за 1-3 дня. Средний уровень — до 7 дней. Сложные проекты — от 10 дней.",
    "Да, современный UI/UX дизайн уже включен в стоимость разработки каждого пакета услуг.",
    "Мой стек: HTML5, CSS3 (SCSS), JavaScript (ES6+). Создаю чистый и быстрый код без лишнего мусора.",
    "Конечно! После сдачи проекта я предоставляю 30 дней бесплатной технической поддержки и правок.",
    "Напишите мне в Telegram @wnolly или оставьте заявку в форме ниже — я свяжусь с вами в течение часа!"
];

/**
 * Функция работы ИИ-ассистента
 */
function askAI(index) {
    const display = document.getElementById('ai-display');
    
    // Эффект «затухания» перед ответом
    display.style.opacity = '0';
    display.style.transform = 'translateX(-10px)';

    setTimeout(() => {
        display.innerText = aiDatabase[index];
        display.style.opacity = '1';
        display.style.transform = 'translateX(0)';
        display.style.color = '#f8fafc'; // Цвет активного ответа
    }, 250);
}

// 2. ОБРАБОТКА ФОРМЫ И СКРОЛЛА
document.addEventListener('DOMContentLoaded', () => {
    
    // Плавная прокрутка для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Учитываем высоту шапки
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка отправки формы (имитация)
    const orderForm = document.getElementById('requestForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Анимация кнопки при отправке
            const btn = orderForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Отправляем...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Имитация задержки сети
            setTimeout(() => {
                alert('Спасибо, Nolly получил ваши данные! Я свяжусь с вами в ближайшее время.');
                btn.innerText = 'Успешно отправлено';
                btn.style.background = '#06b6d4';
                orderForm.reset();
                
                // Возврат кнопки в исходное состояние через 3 сек
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Эффект прозрачности навигации при скролле
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 0';
        }
    });
});
