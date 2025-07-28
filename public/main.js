// إرسال نموذج التواصل عبر البريد
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        // استخدم خدمة خارجية مثل EmailJS أو Formspree
        fetch('https://formspree.io/f/xwkgyyqg', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('تم إرسال رسالتك بنجاح!');
                contactForm.reset();
            } else {
                alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
            }
        });
    });
}
// نموذج تسجيل الدخول (تجريبي)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('تم تسجيل الدخول (تجريبي فقط)');
        loginForm.reset();
    });
}
