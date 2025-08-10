// نظام ترجمة موحد لجميع صفحات الموقع
const translations = {
  en: {
    marquee_news: "Welcome to One World Net! Connecting the world with respect, peace, and technology for all.",
    site_title: "ONE WORLD NET",
    nav_home: "Home",
    nav_plans: "Plans",
    nav_devices: "Devices",
    nav_blog: "Blog",
    nav_partners: "Partners",
    nav_contact: "Contact",
    nav_login: "Login",
    nav_register: "Register",
    hero_title: "Satellite Internet for Everyone",
    hero_desc: "The fastest and safest satellite internet in the world, available for every home, company, and organization.",
    hero_btn: "Register Now"
  ,blog_title: "Blog | One World Net"
  ,blog_main: "Blog"
  ,blog_card1_title: "The Future of Satellite Internet"
  ,blog_card1_text: "Discover the latest satellite internet technologies and how they will change the world."
  ,blog_card2_title: "Role of Satellites"
  ,blog_card2_text: "How satellites help connect the world and facilitate communications."
  ,blog_card3_title: "Latest Receiver Devices"
  ,blog_card3_text: "Review of the latest satellite internet receiver devices on the market."
  ,blog_card4_title: "Global Satellite Internet Coverage"
  ,blog_card4_text: "One World Net network reaches all continents and provides fast and secure connection."
  ,blog_card5_title: "Advanced Reception Technologies"
  ,blog_card5_text: "Learn about the latest satellite internet receiver devices and how they work."
  ,blog_card6_title: "User Experiences"
  ,blog_card6_text: "Success stories from service users in remote areas and major cities."
  ,blog_card7_title: "Space Infrastructure Development"
  ,blog_card7_text: "Huge investments in satellites to ensure the best coverage and speed."
  ,blog_card8_title: "Launching New Services"
  ,blog_card8_text: "Special services for schools, universities, hospitals, and distributors."
  ,footer_privacy: "Privacy Policy"
  ,footer_faq: "FAQ"
  },
  ar: {
    marquee_news: "مرحباً بكم في ون وورلد نت! نربط العالم بالاحترام والسلام والتقنية للجميع.",
    site_title: "ون وورلد نت",
    nav_home: "الرئيسية",
    nav_plans: "الباقات",
    nav_devices: "الأجهزة",
    nav_blog: "المدونة",
    nav_partners: "الشركاء",
    nav_contact: "تواصل",
    nav_login: "تسجيل الدخول",
    nav_register: "إنشاء حساب",
    hero_title: "الإنترنت الفضائي للجميع",
    hero_desc: "أسرع وأأمن إنترنت فضائي في العالم، متاح لكل بيت وشركة ومنظمة.",
    hero_btn: "سجل الآن"
  ,blog_title: "المدونة | ون وورلد نت"
  ,blog_main: "المدونة"
  ,blog_card1_title: "مستقبل الإنترنت الفضائي"
  ,blog_card1_text: "تعرف على أحدث تقنيات الإنترنت الفضائي وكيف ستغير العالم."
  ,blog_card2_title: "الأقمار الصناعية ودورها"
  ,blog_card2_text: "كيف تساهم الأقمار الصناعية في ربط العالم وتسهيل الاتصالات."
  ,blog_card3_title: "أحدث أجهزة الاستقبال"
  ,blog_card3_text: "مراجعة لأحدث أجهزة استقبال الإنترنت الفضائي في السوق."
  ,blog_card4_title: "تغطية الإنترنت الفضائي حول العالم"
  ,blog_card4_text: "شبكة One World Net تصل إلى جميع القارات وتوفر اتصالاً سريعاً وآمناً."
  ,blog_card5_title: "تقنيات استقبال متطورة"
  ,blog_card5_text: "تعرف على أحدث أجهزة استقبال الإنترنت الفضائي وكيفية عملها."
  ,blog_card6_title: "تجارب المستخدمين"
  ,blog_card6_text: "قصص نجاح من مستخدمي الخدمة في المناطق النائية والمدن الكبرى."
  ,blog_card7_title: "تطوير البنية التحتية الفضائية"
  ,blog_card7_text: "استثمارات ضخمة في الأقمار الصناعية لضمان أفضل تغطية وسرعة."
  ,blog_card8_title: "إطلاق خدمات جديدة"
  ,blog_card8_text: "خدمات مخصصة للمدارس والجامعات والمستشفيات والموزعين."
  ,footer_privacy: "سياسة الخصوصية"
  ,footer_faq: "الأسئلة الشائعة"
  },
  fr: {
    marquee_news: "Bienvenue chez One World Net ! Connecter le monde avec respect, paix et technologie pour tous.",
    site_title: "ONE WORLD NET",
    nav_home: "Accueil",
    nav_plans: "Forfaits",
    nav_devices: "Appareils",
    nav_blog: "Blog",
    nav_partners: "Partenaires",
    nav_contact: "Contact",
    nav_login: "Connexion",
    nav_register: "Inscription",
    hero_title: "Internet satellite pour tous",
    hero_desc: "L'internet satellite le plus rapide et le plus sûr au monde, disponible pour chaque maison, entreprise et organisation.",
    hero_btn: "Inscrivez-vous maintenant"
  },
  es: {
    marquee_news: "¡Bienvenido a One World Net! Conectando el mundo con respeto, paz y tecnología para todos.",
    site_title: "ONE WORLD NET",
    nav_home: "Inicio",
    nav_plans: "Planes",
    nav_devices: "Dispositivos",
    nav_blog: "Blog",
    nav_partners: "Socios",
    nav_contact: "Contacto",
    nav_login: "Iniciar sesión",
    nav_register: "Registrarse",
    hero_title: "Internet satelital para todos",
    hero_desc: "El internet satelital más rápido y seguro del mundo, disponible para cada hogar, empresa y organización.",
    hero_btn: "Regístrate ahora"
  },
  it: {
    marquee_news: "Benvenuto su One World Net! Connettiamo il mondo con rispetto, pace e tecnologia per tutti.",
    site_title: "ONE WORLD NET",
    nav_home: "Home",
    nav_plans: "Piani",
    nav_devices: "Dispositivi",
    nav_blog: "Blog",
    nav_partners: "Partner",
    nav_contact: "Contatto",
    nav_login: "Accedi",
    nav_register: "Registrati",
    hero_title: "Internet satellitare per tutti",
    hero_desc: "L'internet satellitare più veloce e sicuro al mondo, disponibile per ogni casa, azienda e organizzazione.",
    hero_btn: "Registrati ora"
  },
  de: {
    marquee_news: "Willkommen bei One World Net! Wir verbinden die Welt mit Respekt, Frieden und Technologie für alle.",
    site_title: "ONE WORLD NET",
    nav_home: "Startseite",
    nav_plans: "Tarife",
    nav_devices: "Geräte",
    nav_blog: "Blog",
    nav_partners: "Partner",
    nav_contact: "Kontakt",
    nav_login: "Anmelden",
    nav_register: "Registrieren",
    hero_title: "Satelliteninternet für alle",
    hero_desc: "Das schnellste und sicherste Satelliteninternet der Welt, verfügbar für jedes Zuhause, Unternehmen und jede Organisation.",
    hero_btn: "Jetzt registrieren"
  }
};


function setLang(lang) {
  const t = translations[lang] || translations['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  // تحديث نص المتحرك
  var marquee = document.getElementById('marquee-text');
  if(marquee && t.marquee_news) marquee.textContent = t.marquee_news;
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  const langSelect = document.getElementById('lang-select');
  if(langSelect) langSelect.value = lang;
}

const langSelect = document.getElementById('lang-select');
if(langSelect) {
  langSelect.addEventListener('change', function(e) {
    setLang(e.target.value);
  });
}
setLang('en');

document.getElementById('langSwitcher').onclick = function() {
  const langs = ['en', 'fr', 'it', 'es', 'de', 'ar'];
  const current = document.documentElement.lang;
  let nextIndex = langs.indexOf(current) + 1;
  if (nextIndex >= langs.length) nextIndex = 0;
  setLang(langs[nextIndex]);
};
