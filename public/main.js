// أدوات وصول لذوي الاحتياجات الخاصة (عالمي)
function addAccessibilityWidget() {
  if(document.getElementById('accessWidget')) return;
  const widget = document.createElement('div');
  widget.id = 'accessWidget';
  widget.style = 'position:fixed;bottom:24px;left:24px;z-index:9999;background:#fff;border-radius:14px;box-shadow:0 2px 12px #00e0ff44;padding:10px 12px;display:flex;flex-direction:column;gap:8px;align-items:center;min-width:44px;';
  widget.innerHTML = `
    <button id="accFontBtn" title="تكبير/تصغير الخط" style="font-size:1.3em;background:#222;color:#fff;border:none;border-radius:8px;padding:6px 10px;">A+</button>
    <button id="accContrastBtn" title="تفعيل/إلغاء التباين العالي" style="font-size:1.2em;background:#222;color:#fff;border:none;border-radius:8px;padding:6px 10px;">🌓</button>
    <button id="accReadBtn" title="تشغيل قارئ النصوص" style="font-size:1.2em;background:#222;color:#fff;border:none;border-radius:8px;padding:6px 10px;">🔊</button>
    <button id="accKeyboardBtn" title="إظهار لوحة مفاتيح افتراضية" style="font-size:1.2em;background:#222;color:#fff;border:none;border-radius:8px;padding:6px 10px;">⌨️</button>
  `;
  document.body.appendChild(widget);

  // تكبير الخط
  let fontBig = localStorage.getItem('accFont') === 'on';
  function setFontSize(big) {
    document.body.style.fontSize = big ? '1.25em' : '';
    localStorage.setItem('accFont', big ? 'on' : 'off');
  }
  setFontSize(fontBig);
  document.getElementById('accFontBtn').onclick = function() {
    fontBig = !fontBig;
    setFontSize(fontBig);
  };

  // تباين عالي
  let contrast = localStorage.getItem('accContrast') === 'on';
  function setContrast(on) {
    if(on) {
      document.body.style.filter = 'contrast(1.5) brightness(1.1)';
      document.body.style.background = '#000';
      document.body.style.color = '#fff';
    } else {
      document.body.style.filter = '';
      document.body.style.background = '';
      document.body.style.color = '';
    }
    localStorage.setItem('accContrast', on ? 'on' : 'off');
  }
  setContrast(contrast);
  document.getElementById('accContrastBtn').onclick = function() {
    contrast = !contrast;
    setContrast(contrast);
  };

  // قارئ نصوص (Text-to-Speech)
  let reading = false;
  document.getElementById('accReadBtn').onclick = function() {
    if(reading) return;
    let text = window.getSelection().toString() || document.body.innerText;
    if(!text) return;
    reading = true;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = document.documentElement.lang || 'ar';
    utter.onend = () => { reading = false; };
    speechSynthesis.speak(utter);
  };

  // لوحة مفاتيح افتراضية (بسيطة)
  let keyboardOn = localStorage.getItem('accKeyboard') === 'on';
  let keyboardDiv = null;
  function showKeyboard(show) {
    if(show) {
      if(keyboardDiv) return;
      keyboardDiv = document.createElement('div');
      keyboardDiv.id = 'virtualKeyboard';
      keyboardDiv.style = 'position:fixed;bottom:80px;left:24px;z-index:9999;background:#222;color:#fff;padding:10px 8px;border-radius:10px;box-shadow:0 2px 8px #00e0ff44;display:grid;grid-template-columns:repeat(10,1fr);gap:4px;';
      const keys = '1234567890ضصثقفغعهخحجدشسيبلاتنمكطئءؤرلاىةوزظذدزظ'.split('');
      keys.push('Space');
      keys.forEach(k => {
        const btn = document.createElement('button');
        btn.textContent = k==='Space'?'مسافة':k;
        btn.style = 'padding:6px 4px;margin:1px;font-size:1em;background:#00e0ff;border:none;border-radius:6px;color:#fff;';
        btn.onclick = function() {
          const active = document.activeElement;
          if(active && (active.tagName==='INPUT'||active.tagName==='TEXTAREA')) {
            if(k==='Space') active.value += ' ';
            else active.value += k;
            active.focus();
          }
        };
        keyboardDiv.appendChild(btn);
      });
      document.body.appendChild(keyboardDiv);
    } else {
      if(keyboardDiv) { keyboardDiv.remove(); keyboardDiv = null; }
    }
    localStorage.setItem('accKeyboard', show ? 'on' : 'off');
  }
  showKeyboard(keyboardOn);
  document.getElementById('accKeyboardBtn').onclick = function() {
    keyboardOn = !keyboardOn;
    showKeyboard(keyboardOn);
  };
}

// تفعيل الأدوات تلقائيًا حسب إعدادات لوحة التحكم
window.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('accFont')==='on'||localStorage.getItem('accContrast')==='on'||localStorage.getItem('accRead')==='on'||localStorage.getItem('accKeyboard')==='on') {
    addAccessibilityWidget();
  }
});
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
