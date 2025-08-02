// --- إدارة الموظفين ---
function renderAdminEmployees() {
  let employees = JSON.parse(localStorage.getItem('employees') || '[]');
  if (!employees.length) {
    employees = [
      {name:'أحمد علي', role:'مدير', email:'ahmed@oneworld.net'},
      {name:'سارة محمد', role:'مسؤول محتوى', email:'sara@oneworld.net'}
    ];
    localStorage.setItem('employees', JSON.stringify(employees));
  }
  const list = document.getElementById('admin-employee-list');
  list.innerHTML = '';
  employees.forEach((emp, i) => {
    const div = document.createElement('div');
    div.className = 'employee-card';
    div.style.marginBottom = '10px';
    div.innerHTML = `<b>${emp.name}</b> (${emp.role}) - <span style='color:#0af'>${emp.email}</span> <button onclick="editEmployee(${i})">تعديل</button> <button style="background:#c00;" onclick="deleteEmployee(${i})">حذف</button>`;
    list.appendChild(div);
  });
}
window.editEmployee = function(i) {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  const emp = employees[i];
  const name = prompt('تعديل الاسم:', emp.name);
  if (!name) return;
  const role = prompt('تعديل الدور:', emp.role);
  if (!role) return;
  const email = prompt('تعديل البريد:', emp.email);
  employees[i] = {name, role, email};
  localStorage.setItem('employees', JSON.stringify(employees));
  renderAdminEmployees();
}
window.deleteEmployee = function(i) {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  employees.splice(i, 1);
  localStorage.setItem('employees', JSON.stringify(employees));
  renderAdminEmployees();
}
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('admin-add-employee');
  if (btn) btn.onclick = function() {
    const name = prompt('اسم الموظف:');
    if (!name) return;
    const role = prompt('الدور/الصلاحية:','موظف');
    if (!role) return;
    const email = prompt('البريد الإلكتروني:');
    if (!email) return;
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.push({name, role, email});
    localStorage.setItem('employees', JSON.stringify(employees));
    renderAdminEmployees();
  };
  renderAdminEmployees();
});

// --- إحصائيات الزوار ---
function renderAdminStats() {
  // عينات إحصائية
  const stats = {
    visits: 100000 + Math.floor(Math.random()*900000),
    signups: 5000 + Math.floor(Math.random()*20000),
    countries: 70,
    topCountries: ['مصر','السعودية','الهند','الصين','أمريكا','نيجيريا','البرازيل']
  };
  const div = document.getElementById('admin-stats');
  div.innerHTML = `<b>عدد الزيارات:</b> ${stats.visits.toLocaleString()}<br><b>عدد التسجيلات:</b> ${stats.signups.toLocaleString()}<br><b>الدول الأكثر نشاطاً:</b> ${stats.topCountries.join('، ')}<br><b>إجمالي الدول:</b> ${stats.countries}`;
}
document.addEventListener('DOMContentLoaded', renderAdminStats);

// --- تعديل أسعار الباقات ---
function renderAdminPlans() {
  let plans = JSON.parse(localStorage.getItem('plans') || 'null');
  if (!plans) {
    plans = [
      {name:'Starter', price:5},
      {name:'Essential', price:10},
      {name:'Family', price:25},
      {name:'Business', price:200}
    ];
    localStorage.setItem('plans', JSON.stringify(plans));
  }
  const div = document.getElementById('admin-plans');
  div.innerHTML = '';
  plans.forEach((plan, i) => {
    div.innerHTML += `<div style='margin-bottom:8px;'><b>${plan.name}:</b> <input type='number' value='${plan.price}' min='1' style='width:80px;' onchange='updatePlanPrice(${i},this.value)'/> $/شهر</div>`;
  });
}
window.updatePlanPrice = function(i, val) {
  let plans = JSON.parse(localStorage.getItem('plans') || '[]');
  plans[i].price = Number(val);
  localStorage.setItem('plans', JSON.stringify(plans));
  renderAdminPlans();
}
document.addEventListener('DOMContentLoaded', renderAdminPlans);
// --- إدارة المدونة ---
function renderAdminBlogs() {
  let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  // إضافة تدوينات تسويقية افتراضية إذا كانت القائمة فارغة
  if (!blogs.length) {
    blogs = [
      {title:'لماذا One World Net؟', summary:'شبكتك الفضائية الأسرع والأكثر أماناً في العالم. جرب الإنترنت بلا حدود أينما كنت.', img:'/public/images/11.jpg'},
      {title:'خدمات مجانية للمناطق النائية', summary:'مبادرة عالمية لتوصيل الإنترنت المجاني للمدارس والمستشفيات في المناطق المحرومة.', img:'/public/images/12.jpg'},
      {title:'عروض الشركات: وفر أكثر', summary:'حلول إنترنت فضائي للشركات والمؤسسات بأسعار لا تقبل المنافسة ودعم فني عالمي.', img:'/public/images/13.jpg'}
    ];
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }
  const list = document.getElementById('admin-blog-list');
  list.innerHTML = '';
  if (!blogs.length) {
    list.innerHTML = '<div style="color:#aaa;text-align:center;">لا توجد تدوينات بعد.</div>';
    return;
  }
  blogs.forEach((blog, i) => {
    const div = document.createElement('div');
    div.className = 'blog-card';
    div.style.marginBottom = '12px';
    div.innerHTML = `<img src="${blog.img}" alt="${blog.title}" style="max-width:80px;max-height:60px;vertical-align:middle;" /> <b>${blog.title}</b> <button style="margin-right:8px;" onclick="editBlog(${i})">تعديل</button> <button style="background:#c00;" onclick="deleteBlog(${i})">حذف</button>`;
    list.appendChild(div);
  });
}
window.editBlog = function(i) {
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  const blog = blogs[i];
  const title = prompt('تعديل العنوان:', blog.title);
  if (!title) return;
  const summary = prompt('تعديل الملخص:', blog.summary);
  if (!summary) return;
  const img = prompt('تعديل رابط الصورة:', blog.img);
  blogs[i] = {title, summary, img};
  localStorage.setItem('blogs', JSON.stringify(blogs));
  renderAdminBlogs();
  if (typeof renderBlogs === 'function') renderBlogs();
}
window.deleteBlog = function(i) {
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  blogs.splice(i, 1);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  renderAdminBlogs();
  if (typeof renderBlogs === 'function') renderBlogs();
}
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('admin-add-blog');
  if (btn) btn.onclick = function() {
    const title = prompt('عنوان التدوينة:');
    if (!title) return;
    const summary = prompt('ملخص قصير:');
    if (!summary) return;
    const img = prompt('رابط صورة (أو استخدم /public/images/11.jpg):','/public/images/11.jpg');
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogs.unshift({title, summary, img});
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderAdminBlogs();
    if (typeof renderBlogs === 'function') renderBlogs();
  };
  renderAdminBlogs();
});

// --- إدارة المشاريع ---
function renderAdminProjects() {
  let projects = JSON.parse(localStorage.getItem('projects') || '[]');
  // مشاريع افتراضية تسويقية
  if (!projects.length) {
    projects = [
      {title:'مشروع "العالم متصل"', summary:'تغطية الإنترنت الفضائي المجاني لكل قرية ومدينة في أفريقيا وآسيا بحلول 2026.', img:'/public/images/15.jpg'},
      {title:'دعم رواد الأعمال', summary:'منح مجانية للشركات الناشئة في المناطق النامية للاتصال بالعالم.', img:'/public/images/14.jpg'}
    ];
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  const list = document.getElementById('admin-project-list');
  list.innerHTML = '';
  if (!projects.length) {
    list.innerHTML = '<div style="color:#aaa;text-align:center;">لا توجد مشاريع بعد.</div>';
    return;
  }
  projects.forEach((proj, i) => {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.style.marginBottom = '12px';
    div.innerHTML = `<img src="${proj.img}" alt="${proj.title}" style="max-width:80px;max-height:60px;vertical-align:middle;" /> <b>${proj.title}</b> <button style="margin-right:8px;" onclick="editProject(${i})">تعديل</button> <button style="background:#c00;" onclick="deleteProject(${i})">حذف</button>`;
    list.appendChild(div);
  });
}
window.editProject = function(i) {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const proj = projects[i];
  const title = prompt('تعديل اسم المشروع:', proj.title);
  if (!title) return;
  const summary = prompt('تعديل الملخص:', proj.summary);
  if (!summary) return;
  const img = prompt('تعديل رابط الصورة:', proj.img);
  projects[i] = {title, summary, img};
  localStorage.setItem('projects', JSON.stringify(projects));
  renderAdminProjects();
  if (typeof renderProjects === 'function') renderProjects();
}
window.deleteProject = function(i) {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  projects.splice(i, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  renderAdminProjects();
  if (typeof renderProjects === 'function') renderProjects();
}
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('admin-add-project');
  if (btn) btn.onclick = function() {
    const title = prompt('اسم المشروع:');
    if (!title) return;
    const summary = prompt('ملخص قصير:');
    if (!summary) return;
    const img = prompt('رابط صورة (أو استخدم /public/images/15.jpg):','/public/images/15.jpg');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.unshift({title, summary, img});
    localStorage.setItem('projects', JSON.stringify(projects));
    renderAdminProjects();
    if (typeof renderProjects === 'function') renderProjects();
  };
  renderAdminProjects();
});
// --- زر تشغيل الرد الصوتي ---
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('play-reply-voice');
  if (btn) {
    btn.onclick = function() {
      const txt = document.getElementById('reply-voice').value.trim();
      if (!txt) return alert('اكتب الرد أولاً');
      if (!('speechSynthesis' in window)) {
        alert('الرد الصوتي غير مدعوم في هذا المتصفح');
        return;
      }
      const utter = new SpeechSynthesisUtterance(txt);
      utter.lang = 'ar';
      window.speechSynthesis.speak(utter);
    };
  }
});
// --- قارئ الشاشة ---
let screenReaderActive = false;
function speakPage() {
  if (!('speechSynthesis' in window)) {
    alert('قارئ الشاشة غير مدعوم في هذا المتصفح');
    return;
  }
  if (screenReaderActive) {
    window.speechSynthesis.cancel();
    screenReaderActive = false;
    document.getElementById('admin-msg').textContent = 'تم إيقاف قارئ الشاشة.';
    return;
  }
  // جمع نصوص الصفحة الرئيسية فقط (مثال)
  let text = '';
  text += document.title + '. ';
  const h1 = document.querySelector('h1');
  if (h1) text += h1.textContent + '. ';
  const h2s = document.querySelectorAll('h2');
  h2s.forEach(h2 => text += h2.textContent + '. ');
  const ps = document.querySelectorAll('p');
  ps.forEach(p => text += p.textContent + '. ');
  if (text.trim().length === 0) text = 'لا يوجد نص لقراءته.';
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ar';
  window.speechSynthesis.speak(utter);
  screenReaderActive = true;
  document.getElementById('admin-msg').textContent = 'جاري قراءة النصوص...';
  utter.onend = function() {
    screenReaderActive = false;
    document.getElementById('admin-msg').textContent = 'انتهت القراءة.';
  };
}
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('screen-reader-btn');
  if (btn) btn.onclick = speakPage;
});
// --- خيارات الوصول ---
function applyAccessibility() {
  // الوضع الليلي
  const dark = localStorage.getItem('darkMode') === '1';
  if (dark) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  // تكبير الخط
  const bigFont = localStorage.getItem('bigFont') === '1';
  if (bigFont) {
    document.body.classList.add('big-font');
  } else {
    document.body.classList.remove('big-font');
  }
  // تباين عالي
  const highContrast = localStorage.getItem('highContrast') === '1';
  if (highContrast) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // تفعيل الخيارات عند التحميل
  applyAccessibility();
  // زر الوضع الليلي
  document.getElementById('toggle-dark').onclick = function() {
    const dark = localStorage.getItem('darkMode') === '1';
    localStorage.setItem('darkMode', dark ? '0' : '1');
    applyAccessibility();
    document.getElementById('admin-msg').textContent = dark ? 'تم إيقاف الوضع الليلي.' : 'تم تفعيل الوضع الليلي.';
  };
  // زر تكبير الخط
  document.getElementById('toggle-font').onclick = function() {
    const bigFont = localStorage.getItem('bigFont') === '1';
    localStorage.setItem('bigFont', bigFont ? '0' : '1');
    applyAccessibility();
    document.getElementById('admin-msg').textContent = bigFont ? 'تم إرجاع حجم الخط الطبيعي.' : 'تم تكبير الخط.';
  };
  // زر التباين العالي
  document.getElementById('toggle-contrast').onclick = function() {
    const highContrast = localStorage.getItem('highContrast') === '1';
    localStorage.setItem('highContrast', highContrast ? '0' : '1');
    applyAccessibility();
    document.getElementById('admin-msg').textContent = highContrast ? 'تم إيقاف التباين العالي.' : 'تم تفعيل التباين العالي.';
  };
});
// تحديث النص المتحرك في الصفحة الرئيسية
function updateMarquee() {
  const text = document.getElementById('marquee-text').value;
  const color = document.getElementById('marquee-color').value;
  const size = document.getElementById('marquee-size').value;
  localStorage.setItem('marqueeText', text);
  localStorage.setItem('marqueeColor', color);
  localStorage.setItem('marqueeSize', size);
  document.getElementById('admin-msg').textContent = 'تم تحديث النص المتحرك (سيظهر في الصفحة الرئيسية).';
}
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
 
// رفع صورة للمعرض أو الهيرو (1-5)
function uploadGalleryImage() {
  const file = document.getElementById('gallery-img-upload').files[0];
  const imgNum = document.getElementById('gallery-img-select').value;
  if (!file) return alert('اختر صورة أولاً');
  const reader = new FileReader();
  reader.onload = function(e) {
    localStorage.setItem('galleryImg' + imgNum, e.target.result);
    document.getElementById('admin-msg').textContent = 'تم تحديث صورة رقم ' + imgNum + ' (ستظهر مباشرة في الصفحة الرئيسية).';
    // عرض معاينة
    const preview = document.getElementById('gallery-img-preview');
    preview.src = e.target.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// معاينة الصورة الحالية عند تغيير الاختيار
document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('gallery-img-select');
  const preview = document.getElementById('gallery-img-preview');
  function updatePreview() {
    const imgNum = select.value;
    const imgData = localStorage.getItem('galleryImg' + imgNum);
    if (imgData) {
      preview.src = imgData;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  }
  select.addEventListener('change', updatePreview);
  updatePreview();
});

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
