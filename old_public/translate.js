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
