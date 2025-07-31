// أزرار المشاركة
function renderShareBtns() {
  let share = JSON.parse(localStorage.getItem('shareButtons')||'{}');
  let btns = '';
  if(share.home||share.blog||share.projects||share.devices) {
    btns += `<button onclick="navigator.share?navigator.share({title:document.title,url:location.href}):alert('غير مدعوم!')" style='background:#FFD600;color:#18120b;border:none;border-radius:50%;width:44px;height:44px;font-size:1.5em;box-shadow:0 2px 8px #FFD60055;'>🔗</button>`;
    btns += `<button onclick="window.open('https://wa.me/?text='+encodeURIComponent(location.href),'_blank')" style='background:#25D366;color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:1.5em;'>🟢</button>`;
    btns += `<button onclick="window.open('https://t.me/share/url?url='+encodeURIComponent(location.href),'_blank')" style='background:#229ED9;color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:1.5em;'>✈️</button>`;
  }
  document.getElementById('globalShareBtns').innerHTML = btns;
}
// QR عائم
function renderQR() {
  let url = location.href;
  let api = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(url)}`;
  document.getElementById('globalQR').innerHTML = `<img src='${api}' alt='QR' style='border-radius:12px;box-shadow:0 2px 8px #00e0ff22;'>`;
}
// لغات إضافية
function renderExtraLangs() {
  let langs = JSON.parse(localStorage.getItem('extraLangs')||'[]');
  let html = langs.map(c=>`<button onclick="switchLang('${c}')" style='background:#FFD600;color:#18120b;border:none;border-radius:8px;padding:4px 12px;margin-left:6px;'>${c.toUpperCase()}</button>`).join('');
  document.getElementById('extraLangSwitcher').innerHTML = html;
}
function switchLang(code) {alert('تغيير اللغة إلى '+code+' (تجريبي)');}
window.addEventListener('DOMContentLoaded',()=>{renderShareBtns();renderQR();renderExtraLangs();});
