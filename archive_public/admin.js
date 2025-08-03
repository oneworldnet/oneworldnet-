// لوحة تحكم بسيطة (واجهة فقط - بدون backend)
// ملاحظة: التعديلات هنا تظهر مباشرة فقط في المتصفح (localStorage)، ولا تعدل الملفات فعليًا إلا بوجود backend

// تغيير خلفية الموقع
function changeBackground() {
  const file = document.getElementById('bg-upload').files[0];
  if (!file) return alert('اختر صورة أولاً');
  const reader = new FileReader();
  reader.onload = function(e) {
    document.body.style.backgroundImage = `url('${e.target.result}')`;
    localStorage.setItem('siteBg', e.target.result);
    document.getElementById('bg-preview').src = e.target.result;
    document.getElementById('bg-preview').style.display = 'block';
    document.getElementById('admin-msg').textContent = 'تم تغيير الخلفية مؤقتًا (محلي فقط).';
  };
  reader.readAsDataURL(file);
}

// تحميل صورة وعرضها
function uploadImage() {
  const file = document.getElementById('img-upload').files[0];
  if (!file) return alert('اختر صورة أولاً');
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('img-preview').src = e.target.result;
    document.getElementById('img-preview').style.display = 'block';
    document.getElementById('admin-msg').textContent = 'تم رفع الصورة (محلي فقط).';
  };
  reader.readAsDataURL(file);
}

// تعديل نص أو إضافة صورة (واجهة فقط)
function applyEdit() {
  const page = document.getElementById('page-select').value;
  const section = document.getElementById('section-select').value;
  const content = document.getElementById('content-edit').value;
  // فقط عرض رسالة توضيحية
  document.getElementById('admin-msg').textContent = `تم حفظ التعديل على ${page} - القسم: ${section} (محلي فقط).`;
}

// تحميل الخلفية من localStorage عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
  const bg = localStorage.getItem('siteBg');
  if (bg) document.body.style.backgroundImage = `url('${bg}')`;
});
