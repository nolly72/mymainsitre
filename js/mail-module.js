/* ============================================================
   MAIL-MODULE.JS — Только модалка заказа и EmailJS
   ============================================================ */

// 1. Инициализация EmailJS (Твой Public Key)
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("uMomqe3GHuHo1r5KO"); 
    }
})();

// 2. Управление модалкой заказа (Глобальные функции)
window.openOrderModal = function(planName) {
    const modal = document.getElementById('orderModal');
    const input = document.getElementById('selected-plan');
    const title = document.getElementById('orderTitle');

    if (modal) {
        if (input) input.value = planName;
        if (title) {
            title.innerText = (planName === 'Общий запрос') ? 'Связаться со мной' : `Заказать: ${planName}`;
        }
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

window.closeOrderModal = function() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// 3. Логика отправки формы через EmailJS
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('submit-btn');
            const originalText = btn ? btn.innerText : "Отправить";

            if (btn) {
                btn.innerText = "Отправка...";
                btn.disabled = true;
            }

            // Используем Service ID и Template ID (vakrk4p)
            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('Заявка успешно отправлена! Я скоро свяжусь с вами.');
                    form.reset();
                    window.closeOrderModal();
                })
                .catch((err) => {
                    alert('Ошибка отправки: ' + JSON.stringify(err));
                })
                .finally(() => {
                    if (btn) {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }
                });
        });
    }
});
