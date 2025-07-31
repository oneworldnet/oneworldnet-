// ترجمة واجهة الموقع بين العربية والإنجليزية (محدثة)
const translations = {
  en: {
    nav_home: "Home",
    nav_pricing: "Plans",
    nav_devices: "Devices",
    nav_coverage: "Coverage Map",
    nav_blog: "Blog",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_title: "The Fastest, Widest Satellite Internet",
    hero_desc: "Connect from anywhere, anytime. one world net brings you high-speed, secure, and reliable internet for every city, village, desert, sea, and even the sky. Empowering education, health, and communities worldwide.",
    hero_cta: "Get Started",
    features_title: "Why Choose one world net?",
    feature1_title: "Global Coverage",
    feature1_desc: "Stay connected anywhere on Earth: cities, villages, deserts, seas, and skies. No more limits.",
    feature2_title: "Ultra Fast Speeds",
    feature2_desc: "Up to 200 Mbps. Stream, work, and play with no interruptions, day or night.",
    feature3_title: "Security & Privacy",
    feature3_desc: "Your data is protected with the latest encryption and global security standards.",
    feature4_title: "24/7 Support",
    feature4_desc: "A global team ready to help you anytime, anywhere.",
    footer: "All rights reserved © one world net 2025"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_pricing: "الباقات",
    nav_devices: "الأجهزة",
    nav_coverage: "خريطة التغطية",
    nav_blog: "المدونة",
    nav_projects: "المشاريع",
    nav_contact: "تواصل معنا",
    hero_title: "الإنترنت الفضائي الأسرع والأوسع عالمياً",
    hero_desc: "اتصل من أي مكان وفي أي وقت. one world net توفر لك إنترنت عالي السرعة وآمن وموثوق لكل مدينة وقرية وصحراء وبحر وحتى السماء. تمكين التعليم والصحة والمجتمعات حول العالم.",
    hero_cta: "ابدأ الآن",
    features_title: "مميزات one world net",
    feature1_title: "تغطية عالمية",
    feature1_desc: "اتصال في أي مكان على الأرض: مدن، قرى، صحارى، بحار وسماء. لا حدود بعد اليوم.",
    feature2_title: "سرعات فائقة",
    feature2_desc: "حتى 200 ميجابت/ثانية. بث، عمل، ألعاب بدون انقطاع ليلاً ونهاراً.",
    feature3_title: "أمان وخصوصية",
    feature3_desc: "بياناتك محمية بأحدث تقنيات التشفير والمعايير العالمية للأمان.",
    feature4_title: "دعم فني 24/7",
    feature4_desc: "فريق عالمي جاهز لمساعدتك في أي وقت وأي مكان.",
    footer: "جميع الحقوق محفوظة © one world net 2025"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Set default language on load
window.addEventListener('DOMContentLoaded', function() {
  setLanguage(document.documentElement.lang || 'en');
});

// Expose for manual switching
window.setLanguage = setLanguage;
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
