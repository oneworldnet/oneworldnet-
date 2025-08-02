// ملف ترجمة متعدد اللغات (عينة أولية)
const translations = {
  ar: {
    home: "الرئيسية",
    plans: "الباقات",
    devices: "الأجهزة",
    blog: "المدونة",
    partners: "الشركاء",
    contact: "تواصل",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    heroTitle: "الإنترنت الفضائي للجميع",
    heroDesc: "أسرع وأأمن إنترنت فضائي في العالم، متاح لكل بيت وشركة ومنظمة.",
    registerNow: "سجل الآن"
  },
  en: {
    home: "Home",
    plans: "Plans",
    devices: "Devices",
    blog: "Blog",
    partners: "Partners",
    contact: "Contact",
    login: "Login",
    register: "Register",
    heroTitle: "Satellite Internet for Everyone",
    heroDesc: "The fastest and safest satellite internet in the world, available for every home, company, and organization.",
    registerNow: "Register Now"
  },
  // فاصلة مضافة هنا
  fr: {
    title: "Bienvenue chez One World Net",
    description: "Internet satellite mondial à grande vitesse et prix compétitifs."
  },
  es: {
    title: "Bienvenido a One World Net",
    description: "Internet satelital global con alta velocidad y precios competitivos."
  },
  it: {
    title: "Benvenuto su One World Net",
    description: "Internet satellitare globale ad alta velocità e prezzi competitivi."
  },
  de: {
    title: "Willkommen bei One World Net",
    description: "Globales Satelliteninternet mit hoher Geschwindigkeit und günstigen Preisen."
  },
  zh: {
    title: "欢迎来到One World Net",
    description: "全球卫星互联网，高速且价格优惠。"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  // مثال: تغيير نصوص القائمة
  document.querySelectorAll('.nav-links a')[0].textContent = translations[lang].home;
  document.querySelectorAll('.nav-links a')[1].textContent = translations[lang].plans;
  document.querySelectorAll('.nav-links a')[2].textContent = translations[lang].devices;
  document.querySelectorAll('.nav-links a')[3].textContent = translations[lang].blog;
  document.querySelectorAll('.nav-links a')[4].textContent = translations[lang].partners;
  document.querySelectorAll('.nav-links a')[5].textContent = translations[lang].contact;
  document.querySelector('.login-btn').textContent = translations[lang].login;
  document.querySelector('.register-btn').textContent = translations[lang].register;
  document.querySelector('.hero-content h1').textContent = translations[lang].heroTitle;
  document.querySelector('.hero-content p').textContent = translations[lang].heroDesc;
  document.querySelector('.main-btn').textContent = translations[lang].registerNow;
  // تغيير اتجاه الصفحة حسب اللغة
  if (["ar"].includes(lang)) {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }
}

document.getElementById('langSwitcher').onclick = function() {
  const current = document.documentElement.lang;
  const next = current === 'ar' ? 'en' : 'ar';
  setLanguage(next);
};
// افتراضي عربي
setLanguage('ar');
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'ar';
  setLanguage(lang);
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    // قائمة اللغات
    const langs = [
      { code: 'ar', label: 'العربية' },
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'Français' },
      { code: 'es', label: 'Español' },
      { code: 'it', label: 'Italiano' },
      { code: 'de', label: 'Deutsch' },
      { code: 'zh', label: '中文' }
    ];
    // بناء قائمة منسدلة
    let dropdown = document.createElement('ul');
    dropdown.className = 'lang-dropdown';
    langs.forEach(l => {
      let li = document.createElement('li');
      li.textContent = l.label;
      li.onclick = () => {
        setLanguage(l.code);
        langBtn.textContent = l.label;
        dropdown.style.display = 'none';
      };
      dropdown.appendChild(li);
    });
    dropdown.style.display = 'none';
    langBtn.parentNode.appendChild(dropdown);
    langBtn.onclick = () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    };
    // إظهار اللغة الحالية
    const current = langs.find(l => l.code === lang);
    if (current) langBtn.textContent = current.label;
    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }
});
// افتراضي عربي
setLanguage('ar');
