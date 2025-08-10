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
    home: "Accueil",
    plans: "Forfaits",
    devices: "Appareils",
    blog: "Blog",
    partners: "Partenaires",
    contact: "Contact",
    login: "Connexion",
    register: "Inscription",
    heroTitle: "Internet satellite pour tous",
    heroDesc: "L'internet satellite le plus rapide et le plus sûr au monde, disponible pour chaque maison, entreprise et organisation.",
    registerNow: "Inscrivez-vous maintenant"
  },
  es: {
    home: "Inicio",
    plans: "Planes",
    devices: "Dispositivos",
    blog: "Blog",
    partners: "Socios",
    contact: "Contacto",
    login: "Iniciar sesión",
    register: "Registrarse",
    heroTitle: "Internet satelital para todos",
    heroDesc: "El internet satelital más rápido y seguro del mundo, disponible para cada hogar, empresa y organización.",
    registerNow: "Regístrate ahora"
  },
  it: {
    home: "Home",
    plans: "Piani",
    devices: "Dispositivi",
    blog: "Blog",
    partners: "Partner",
    contact: "Contatto",
    login: "Accedi",
    register: "Registrati",
    heroTitle: "Internet satellitare per tutti",
    heroDesc: "L'internet satellitare più veloce e sicuro al mondo, disponibile per ogni casa, azienda e organizzazione.",
    registerNow: "Registrati ora"
  },
  de: {
    home: "Startseite",
    plans: "Tarife",
    devices: "Geräte",
    blog: "Blog",
    partners: "Partner",
    contact: "Kontakt",
    login: "Anmelden",
    register: "Registrieren",
    heroTitle: "Satelliteninternet für alle",
    heroDesc: "Das schnellste und sicherste Satelliteninternet der Welt, verfügbar für jedes Zuhause, Unternehmen und jede Organisation.",
    registerNow: "Jetzt registrieren"
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

// زر اختيار اللغة متعدد الخيارات
document.getElementById('langSwitcher').onclick = function() {
  const langs = ['en', 'fr', 'it', 'es', 'de', 'ar'];
  const current = document.documentElement.lang;
  let nextIndex = langs.indexOf(current) + 1;
  if (nextIndex >= langs.length) nextIndex = 0;
  setLanguage(langs[nextIndex]);
};
// افتراضي إنجليزي
setLanguage('en');
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
