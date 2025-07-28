// تفعيل ربط الموقع مع بيانات لوحة التحكم (LocalStorage)
window.addEventListener('DOMContentLoaded', function() {
    // تحديث النصوص والصور من LocalStorage
    if(localStorage.getItem('mainTitle')) {
        const t = localStorage.getItem('mainTitle');
        if(document.getElementById('siteTitle')) document.getElementById('siteTitle').textContent = t;
    }
    if(localStorage.getItem('mainDesc')) {
        if(document.getElementById('heroDesc')) document.getElementById('heroDesc').innerHTML = localStorage.getItem('mainDesc');
    }
    if(localStorage.getItem('logoUrl')) {
        const logo = document.getElementById('logoImg') || document.querySelector('.logo');
        if(logo) logo.src = localStorage.getItem('logoUrl');
    }
    // من نحن
    if(localStorage.getItem('aboutTitle')) {
        if(document.getElementById('aboutTitle')) document.getElementById('aboutTitle').textContent = localStorage.getItem('aboutTitle');
    }
    if(localStorage.getItem('aboutDesc')) {
        if(document.getElementById('aboutDesc')) document.getElementById('aboutDesc').innerHTML = localStorage.getItem('aboutDesc');
    }
    // مميزات الخدمة
    if(localStorage.getItem('feature1Title')) {
        if(document.getElementById('feature1Title')) document.getElementById('feature1Title').textContent = localStorage.getItem('feature1Title');
    }
    if(localStorage.getItem('feature1Desc')) {
        if(document.getElementById('feature1Desc')) document.getElementById('feature1Desc').innerHTML = localStorage.getItem('feature1Desc');
    }
    if(localStorage.getItem('feature2Title')) {
        if(document.getElementById('feature2Title')) document.getElementById('feature2Title').textContent = localStorage.getItem('feature2Title');
    }
    if(localStorage.getItem('feature2Desc')) {
        if(document.getElementById('feature2Desc')) document.getElementById('feature2Desc').innerHTML = localStorage.getItem('feature2Desc');
    }
    if(localStorage.getItem('feature3Title')) {
        if(document.getElementById('feature3Title')) document.getElementById('feature3Title').textContent = localStorage.getItem('feature3Title');
    }
    if(localStorage.getItem('feature3Desc')) {
        if(document.getElementById('feature3Desc')) document.getElementById('feature3Desc').innerHTML = localStorage.getItem('feature3Desc');
    }
    if(localStorage.getItem('mainDesc')) {
        if(document.getElementById('heroDesc')) document.getElementById('heroDesc').innerHTML = localStorage.getItem('mainDesc');
    }
    if(localStorage.getItem('logoUrl')) {
        const logo = document.querySelector('.logo');
        if(logo) logo.src = localStorage.getItem('logoUrl');
    }
    // روابط التواصل
    if(localStorage.getItem('phones')) {
        const phones = localStorage.getItem('phones').split(',');
        if(document.getElementById('waLink')) document.getElementById('waLink').href = 'https://wa.me/' + phones[0].replace(/[^0-9]/g, '');
        if(document.getElementById('waLink2')) document.getElementById('waLink2').href = 'https://wa.me/' + phones[0].replace(/[^0-9]/g, '');
        if(document.getElementById('tgLink')) document.getElementById('tgLink').href = 'https://t.me/' + phones[0].replace(/[^0-9]/g, '');
        if(document.getElementById('tgLink2')) document.getElementById('tgLink2').href = 'https://t.me/' + phones[0].replace(/[^0-9]/g, '');
    }
    // صور المعرض
    if(localStorage.getItem('galleryImages')) {
        const images = localStorage.getItem('galleryImages').split(',');
        const gallery = document.getElementById('gallerySection');
        if(gallery) {
            gallery.innerHTML = images.map(img => `<img src="images/${img.trim()}" alt="صورة">`).join('');
        }
    } else {
        // صور افتراضية
        const gallery = document.getElementById('gallerySection');
        if(gallery) {
            gallery.innerHTML = ['1.jpg','2.jpg','3.jpg','4.jpg'].map(img => `<img src="images/${img}" alt="صورة">`).join('');
        }
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
