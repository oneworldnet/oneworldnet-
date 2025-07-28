// ترجمة واجهة الموقع بين العربية والإنجليزية
const translations = {
  en: {
    siteTitle: "One World Net",
    nav: ["Home", "Services", "Gallery", "Contact", "Login"],
    heroTitle: "Integrated Internet Solutions",
    heroDesc: "At <b>One World Net</b>, we provide the best internet services, web design, hosting, business solutions, technical support, and professional digital marketing at competitive prices.",
    ctaBtn: "Contact Us Now",
    servicesTitle: "Our Services",
    service1Title: "Web Design",
    service1Desc: "Modern, responsive websites with the best technologies.",
    service2Title: "Hosting",
    service2Desc: "Fast, secure hosting with continuous support and great prices.",
    service3Title: "Digital Marketing",
    service3Desc: "Professional digital marketing to boost your online presence.",
    service4Title: "Technical Support",
    service4Desc: "Continuous technical support to solve all your technical issues quickly and efficiently.",
    galleryTitle: "Gallery",
    contactTitle: "Contact Us",
    contactName: "Name",
    contactEmail: "Email",
    contactMsg: "Your Message",
    contactBtn: "Send",
    waLink: "WhatsApp",
    tgLink: "Telegram",
    loginTitle: "Login",
    loginEmail: "Email",
    loginPass: "Password",
    loginBtn: "Login",
    footerText: "All rights reserved &copy; One World Net 2025"
  },
  ar: {
    siteTitle: "One World Net",
    nav: ["الرئيسية", "خدماتنا", "معرض الصور", "تواصل معنا", "تسجيل الدخول"],
    heroTitle: "حلول الإنترنت المتكاملة",
    heroDesc: "نحن في <b>One World Net</b> نقدم أفضل خدمات الإنترنت، تصميم المواقع، الاستضافة، حلول الأعمال، الدعم الفني، وخدمات التسويق الإلكتروني باحترافية عالية وبأسعار تنافسية.",
    ctaBtn: "تواصل معنا الآن",
    servicesTitle: "خدماتنا",
    service1Title: "تصميم مواقع",
    service1Desc: "تصميم مواقع عصرية متجاوبة مع جميع الأجهزة وبأفضل التقنيات.",
    service2Title: "استضافة مواقع",
    service2Desc: "استضافة سريعة وآمنة مع دعم فني متواصل وأسعار مميزة.",
    service3Title: "تسويق إلكتروني",
    service3Desc: "خدمات تسويق إلكتروني احترافية لزيادة ظهورك وانتشارك على الإنترنت.",
    service4Title: "دعم فني",
    service4Desc: "دعم فني متواصل لحل جميع مشاكلك التقنية بسرعة وكفاءة.",
    galleryTitle: "معرض الصور",
    contactTitle: "تواصل معنا",
    contactName: "الاسم",
    contactEmail: "البريد الإلكتروني",
    contactMsg: "رسالتك",
    contactBtn: "إرسال",
    waLink: "واتساب",
    tgLink: "تليجرام",
    loginTitle: "تسجيل الدخول",
    loginEmail: "البريد الإلكتروني",
    loginPass: "كلمة المرور",
    loginBtn: "دخول",
    footerText: "جميع الحقوق محفوظة &copy; One World Net 2025"
  }
};

const langToggle = document.getElementById('langToggle');
let currentLang = 'ar';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  // Header
  document.getElementById('siteTitle').textContent = translations[lang].siteTitle;
  // Nav
  const navList = document.getElementById('navList').getElementsByTagName('a');
  for (let i = 0; i < navList.length; i++) {
    navList[i].textContent = translations[lang].nav[i];
  }
  // Hero
  document.getElementById('heroTitle').textContent = translations[lang].heroTitle;
  document.getElementById('heroDesc').innerHTML = translations[lang].heroDesc;
  document.getElementById('ctaBtn').textContent = translations[lang].ctaBtn;
  // Services
  document.getElementById('servicesTitle').textContent = translations[lang].servicesTitle;
  document.getElementById('service1Title').textContent = translations[lang].service1Title;
  document.getElementById('service1Desc').textContent = translations[lang].service1Desc;
  document.getElementById('service2Title').textContent = translations[lang].service2Title;
  document.getElementById('service2Desc').textContent = translations[lang].service2Desc;
  document.getElementById('service3Title').textContent = translations[lang].service3Title;
  document.getElementById('service3Desc').textContent = translations[lang].service3Desc;
  document.getElementById('service4Title').textContent = translations[lang].service4Title;
  document.getElementById('service4Desc').textContent = translations[lang].service4Desc;
  // Gallery
  document.getElementById('galleryTitle').textContent = translations[lang].galleryTitle;
  // Contact
  document.getElementById('contactTitle').textContent = translations[lang].contactTitle;
  document.getElementById('contactName').placeholder = translations[lang].contactName;
  document.getElementById('contactEmail').placeholder = translations[lang].contactEmail;
  document.getElementById('contactMsg').placeholder = translations[lang].contactMsg;
  document.getElementById('contactBtn').textContent = translations[lang].contactBtn;
  document.getElementById('waLink').textContent = translations[lang].waLink;
  document.getElementById('tgLink').textContent = translations[lang].tgLink;
  // Login
  document.getElementById('loginTitle').textContent = translations[lang].loginTitle;
  document.getElementById('loginEmail').placeholder = translations[lang].loginEmail;
  document.getElementById('loginPass').placeholder = translations[lang].loginPass;
  document.getElementById('loginBtn').textContent = translations[lang].loginBtn;
  // Footer
  document.getElementById('footerText').innerHTML = translations[lang].footerText;
  // زر التبديل
  langToggle.textContent = lang === 'ar' ? 'EN' : 'عربي';
}

if (langToggle) {
  langToggle.addEventListener('click', function() {
    setLang(currentLang === 'ar' ? 'en' : 'ar');
  });
}

// تفعيل اللغة الافتراضية عند التحميل
setLang('ar');
