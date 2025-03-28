document.addEventListener('DOMContentLoaded', function() {
    // ==================== TOGGLE DE TEMA ====================
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Verificar preferência de tema
    function checkThemePreference() {
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
            enableDarkMode();
        }
    }

    function enableDarkMode() {
        body.classList.add('dark-mode');
        themeLabel.textContent = 'Modo Escuro';
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
        localStorage.setItem('darkMode', 'true');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        themeLabel.textContent = 'Modo Claro';
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
        localStorage.setItem('darkMode', 'false');
    }

    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // ==================== RECUPERAÇÃO DE SENHA ====================
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.auth-btn');
    const authCard = document.querySelector('.auth-card');

    // Criar elementos de mensagem
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div>
            <p>Enviamos um link para <strong id="sentEmail"></strong></p>
            <p>Verifique sua caixa de entrada e spam.</p>
        </div>
    `;

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span id="errorText"></span>`;

    // Validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mostrar mensagem
    function showMessage(type, message, email = '') {
        // Remover mensagens existentes
        const existingMessages = authCard.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        if (type === 'success') {
            successMessage.querySelector('#sentEmail').textContent = email;
            authCard.insertBefore(successMessage, authCard.firstChild);
        } else {
            errorMessage.querySelector('#errorText').textContent = message;
            authCard.insertBefore(errorMessage, forgotPasswordForm);
        }
    }

    // Simular envio de email
    function sendResetEmail(email) {
        return new Promise((resolve) => {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
            
            // Simular tempo de requisição
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }

    // Manipular envio do formulário
    forgotPasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        // Validação
        if (!email) {
            showMessage('error', 'Por favor, insira seu email');
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('error', 'Por favor, insira um email válido');
            emailInput.focus();
            return;
        }

        try {
            // Simular envio de email
            const success = await sendResetEmail(email);
            
            if (success) {
                showMessage('success', '', email);
                submitBtn.innerHTML = '<span class="btn-text">Email enviado!</span> <i class="fas fa-check"></i>';
                
                // Redirecionar após 5 segundos
                setTimeout(() => {
                    window.location.href = 'login.html'; // Altere para sua página de login
                }, 5000);
            }
        } catch (error) {
            showMessage('error', 'Ocorreu um erro. Tente novamente mais tarde.');
            submitBtn.innerHTML = '<span class="btn-text">Tentar novamente</span>';
            submitBtn.disabled = false;
        }
    });

    // Inicializar
    checkThemePreference();
});