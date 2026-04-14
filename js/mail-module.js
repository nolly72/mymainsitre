(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("uMomqe3GHuHo1r5KO"); 
    }
})();

// Управление модалкой заказа
window.openOrderModal = function(planName) {
    const modal = document.getElementById('orderModal');
    const input = document.getElementById('selected-plan');
    const title = document.getElementById('orderTitle');

    if (modal) {
        if (input) input.value = planName;
        if (title) title.innerText = (planName === 'Общий запрос') ? 'Связаться со мной' : `Заказать: ${planName}`;
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

// Отправка формы
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerText;

            btn.innerText = "Отправка...";
            btn.disabled = true;

            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('Заявка отправлена!');
                    form.reset();
                    closeOrderModal();
                })
                .catch(err => alert('Ошибка: ' + JSON.stringify(err)))
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Закрытие по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeOrderModal();
            if (typeof closeModal === 'function') closeModal(); // Для кейсов
        }
    });
});
