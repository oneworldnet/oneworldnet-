// main.js
// ملف جافاسكريبت رئيسي لتفعيل وظائف الموقع الأساسية

console.log('مرحباً بك في ONE WORLD NET!');

// زر القائمة يعمل على جميع الصفحات
window.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks) {
    menuBtn.onclick = function() {
      navLinks.classList.toggle('show');
    };
  }

  // شعار الموقع من التخزين المحلي
  var logoImg = document.getElementById('site-logo');
  var logoUrl = localStorage.getItem('siteLogo');
  if(logoImg && logoUrl) logoImg.src = logoUrl;

  // منع تكرار اسم الشعار في كل الصفحات
  var logoSpans = document.querySelectorAll('.logo span');
  if(logoSpans.length > 1) {
    for(var i=1;i<logoSpans.length;i++) logoSpans[i].remove();
  }
  // إزالة أي تكرار لاسم ONE WORLD NET خارج الشعار
  document.querySelectorAll('span, h1, h2, h3, h4, h5, h6, p, div').forEach(function(el){
    if(el !== document.querySelector('.logo span') && el.textContent.trim() === 'ONE WORLD NET') {
      el.remove();
    }
  });
});
