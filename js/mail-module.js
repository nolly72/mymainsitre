/* ============================================================
   MAIL-MODULE.JS — Обработка модалок и EmailJS
   ============================================================ */

// 1. Инициализация (Твой Public Key)
(function() {
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

// 2. Функции управления модалками (Глобальные)
window.openOrderModal = function(planName) {
    const orderModal = document.getElementById('orderModal');
    const orderTitle = document.getElementById('orderTitle');
    const planInput = document.getElementById('selected-plan');

    if (!orderModal) return;

    if (orderTitle) orderTitle.innerText = `Заказать тариф: ${planName}`;
    if (planInput) planInput.value = planName;

    orderModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeOrderModal = function() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) orderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// 3. Логика отправки формы
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('submit-btn');
            const originalText = btn ? btn.innerText : "Отправить";
            
            if (btn) {
                btn.innerText = "Отправка...";
                btn.disabled = true;
            }

            // Данные обновлены: Service ID и Template ID с закрытой кавычкой
            emailjs.sendForm('service_ernscfc', 'template_n27b5hj', this)
                .then(() => {
                    alert('Заявка успешно отправлена! Я скоро свяжусь с вами.');
                    orderForm.reset();
                    closeOrderModal();
                }, (err) => {
                    alert('Ошибка отправки. Попробуйте позже: ' + JSON.stringify(err));
                })
                .finally(() => {
                    if (btn) {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }
                });
        });
    }

    // Закрытие по клику на фон
    window.addEventListener('click', (e) => {
        const orderModal = document.getElementById('orderModal');
        if (e.target === orderModal) {
            if (typeof closeOrderModal === 'function') closeOrderModal();
        }
    });
});
