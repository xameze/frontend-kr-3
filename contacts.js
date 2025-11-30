<nav aria-label="Основная навигация">
    <ul class="nav-list">
        <li><a href="index.html" class="nav-link">Главная</a></li>
        <li><a href="contacts.html" class="nav-link" aria-current="page">Контакты</a></li>
    </ul>
</nav>

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messagesContainer = document.getElementById('formMessages');
    
    
    function showMessage(message, type = 'success') {
        messagesContainer.textContent = message;
        messagesContainer.className = `form-messages ${type}`;
        messagesContainer.setAttribute('role', 'alert');
        
        
        setTimeout(() => {
            messagesContainer.textContent = '';
            messagesContainer.className = 'form-messages';
            messagesContainer.removeAttribute('role');
        }, 5000);
    }
    
    
    form.addEventListener('input', function(event) {
        const target = event.target;
        
        if (target.hasAttribute('required') && target.value.trim() === '') {
            target.setAttribute('aria-invalid', 'true');
        } else {
            target.setAttribute('aria-invalid', 'false');
        }
    });
    
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        let firstInvalidField = null;
        
        requiredFields.forEach(field => {
            if (field.value.trim() === '') {
                isValid = false;
                field.setAttribute('aria-invalid', 'true');
                
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            } else {
                field.setAttribute('aria-invalid', 'false');
            }
        });
        
        if (!isValid) {
            showMessage('Пожалуйста, заполните все обязательные поля', 'error');
            
            
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }
        
        
        showMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        form.reset();
        
        
        const firstFieldset = form.querySelector('fieldset');
        if (firstFieldset) {
            firstFieldset.focus();
        }
    });
    
    
    form.addEventListener('keydown', function(event) {
        
        if (event.key === 'Escape') {
            form.reset();
            showMessage('Форма очищена', 'success');
        }
        
        
        if (event.key === 'Enter' && event.target.type !== 'textarea') {
            if (event.target.type === 'submit' || event.target.type === 'reset') {
                return; 
            }
            event.preventDefault();
        }
    });
    
    
    const fieldsWithHelp = form.querySelectorAll('[aria-describedby]');
    fieldsWithHelp.forEach(field => {
        field.addEventListener('focus', function() {
            const helpId = this.getAttribute('aria-describedby');
            const helpElement = document.getElementById(helpId);
            if (helpElement) {
                helpElement.setAttribute('aria-live', 'polite');
            }
        });
    });
});