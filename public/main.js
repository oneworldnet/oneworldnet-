// تفعيل ربط الموقع مع بيانات لوحة التحكم (LocalStorage)
window.addEventListener('DOMContentLoaded', function() {
    // تحديث النصوص والصور من LocalStorage
    if(localStorage.getItem('mainTitle')) {
        const t = localStorage.getItem('mainTitle');
        if(document.getElementById('siteTitle')) document.getElementById('siteTitle').textContent = t;
        if(document.getElementById('heroTitle')) document.getElementById('heroTitle').textContent = t;
    }
    if(localStorage.getItem('mainDesc')) {
        if(document.getElementById('heroDesc')) document.getElementById('heroDesc').innerHTML = localStorage.getItem('mainDesc');
    }
    if(localStorage.getItem('logoUrl')) {
        const logo = document.querySelector('.logo');
        if(logo) logo.src = localStorage.getItem('logoUrl');
    }
    if(localStorage.getItem('phones')) {
        const phones = localStorage.getItem('phones').split(',');
        if(document.getElementById('waLink')) document.getElementById('waLink').href = 'https://wa.me/' + phones[0].replace(/[^0-9]/g, '');
        if(document.getElementById('tgLink')) document.getElementById('tgLink').href = 'https://t.me/' + phones[0].replace(/[^0-9]/g, '');
    }
    if(localStorage.getItem('socials')) {
        // يمكن تطويرها لاحقًا لعرض روابط إضافية
    }
});
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
