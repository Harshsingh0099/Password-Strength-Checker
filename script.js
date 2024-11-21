const passwordInput = document.getElementById('password-input');
const strengthBar = document.getElementById('strength-indicator');
const strengthText = document.getElementById('strength-text');

function checkPasswordStrength(password) {
    let strength = 0;
    const strengthChecks = [
        { regex: /.{8,}/, message: 'At least 8 characters' },
        { regex: /[A-Z]/, message: 'Contains uppercase letter' },
        { regex: /[a-z]/, message: 'Contains lowercase letter' },
        { regex: /[0-9]/, message: 'Contains a number' },
        { regex: /[^A-Za-z0-9]/, message: 'Contains special character' }
    ];

    strengthChecks.forEach(check => {
        if (check.regex.test(password)) {
            strength++;
        }
    });

    return {
        score: strength,
        details: strengthChecks.map(check => ({
            met: check.regex.test(password),
            message: check.message
        }))
    };
}

function updateStrengthBar(strength) {
    const colors = ['#ff4136', '#FF851B', '#FFDC00', '#2ECC40', '#3D9970'];
    const texts = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];

    strengthBar.style.width = `${strength * 20}%`;
    strengthBar.style.backgroundColor = colors[strength - 1] || colors[0];
    strengthText.textContent = texts[strength - 1] || 'No Password Entered';
}

passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    
    if (password === '') {
        strengthBar.style.width = '0';
        strengthText.textContent = 'No Password Entered';
        return;
    }

    const result = checkPasswordStrength(password);
    updateStrengthBar(result.score);
});