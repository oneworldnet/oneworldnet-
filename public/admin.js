// --- جلب وتحديث الموظفين ---
async function fetchEmployees() {
  const content = await fetchContent();
  return content.employees || [];
}
async function updateEmployees(newEmployees) {
  const content = await fetchContent();
  content.employees = newEmployees;
  await updateContent(content);
}

// --- جلب وتحديث المدونة ---
async function fetchBlog() {
  const content = await fetchContent();
  return content.blog || [];
}
async function updateBlog(newBlog) {
  const content = await fetchContent();
  content.blog = newBlog;
  await updateContent(content);
}

// --- جلب وتحديث المشاريع ---
async function fetchProjects() {
  const content = await fetchContent();
  return content.projects || [];
}
async function updateProjects(newProjects) {
  const content = await fetchContent();
  content.projects = newProjects;
  await updateContent(content);
}
// admin.js
// سكريبت ربط لوحة التحكم مع backend وتفعيل كل الأقسام
// --- جلب وتحديث الصفحات ---
async function fetchPages() {
  const res = await fetch('/api/pages');
  return await res.json();
}
async function updatePages(newPages) {
  await fetch('/api/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPages)
  });
}

const API_BASE = '/api';

// مثال: جلب المستخدمين
async function fetchUsers() {
  const res = await fetch(API_BASE + '/users');
  return await res.json();
}

// مثال: إضافة مستخدم
async function addUser(username, password, role) {
  const res = await fetch(API_BASE + '/add-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role })
  });
  return await res.json();
}

// مثال: جلب وتحديث محتوى الموقع
async function fetchContent() {
  const res = await fetch(API_BASE + '/content');
  return await res.json();
}
async function updateContent(newContent) {
  const res = await fetch(API_BASE + '/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newContent)
  });
  return await res.json();
}

// مثال: جلب سجل الدخول
async function fetchLoginLogs() {
  const res = await fetch(API_BASE + '/login-logs');
  return await res.json();
}

// مثال: تسجيل الدخول
async function login(username, password) {
  const res = await fetch(API_BASE + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return await res.json();
}


// تحديث ملف المستخدمين بالكامل (مطلوب endpoint في backend)
async function updateUsers(users) {
  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(users)
  });
}

// حالة تسجيل الدخول
let isLoggedIn = false;

// دالة تسجيل الدخول
window.handleLogin = async function() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const errorBox = document.getElementById('loginError');
  errorBox.style.display = 'none';
  if (!username || !password) {
    errorBox.textContent = 'يرجى إدخال اسم المستخدم وكلمة المرور';
    errorBox.style.display = 'block';
    return;
  }
  const res = await login(username, password);
  if (res.success) {
    isLoggedIn = true;
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'block';
    document.getElementById('adminUserName').textContent = username;
    // تحميل البيانات بعد تسجيل الدخول
    loadAdminData();
  } else {
    errorBox.textContent = res.error || 'بيانات الدخول غير صحيحة';
    errorBox.style.display = 'block';
  }
}

// دالة تسجيل الخروج
window.logout = function() {
  isLoggedIn = false;
  document.getElementById('adminContainer').style.display = 'none';
  document.getElementById('loginModal').style.display = 'flex';
}

// تفعيل لوحة التحكم بعد تسجيل الدخول
function loadAdminData() {
  renderPages();
  renderUsers();
  renderEmployees();
  renderContent();
  renderBlog();
  renderProjects();
}

// منع تحميل أي بيانات عند فتح الصفحة
window.onload = function() {
  document.getElementById('adminContainer').style.display = 'none';
  document.getElementById('loginModal').style.display = 'flex';
}

// دالة عرض المستخدمين
async function renderUsers() {
  const users = await fetchUsers();
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = '';
  if (Array.isArray(users) && users.length > 0) {
    users.forEach((user, i) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <b>${user.username || user.name || 'مستخدم بدون اسم'}</b><br>
        <span style='color:#888'>${user.role || 'غير محدد'}</span>
        <div class='actions'>
          <button class='edit' onclick='editUser(${i})'><i class="fa fa-edit"></i></button>
          <button onclick='deleteUser(${i})'><i class="fa fa-trash"></i></button>
        </div>
      `;
      usersList.appendChild(card);
    });
  } else {
    usersList.innerHTML = '<div>لا يوجد مستخدمين بعد.</div>';
  }
}

// دالة عرض الصفحات
async function renderPages() {
  const pages = await fetchPages();
  const pagesList = document.getElementById('pagesList');
  pagesList.innerHTML = '';
  if (Array.isArray(pages) && pages.length > 0) {
    pages.forEach(page => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `<strong>${page.title || page.name}</strong><br>${page.desc || ''}`;
      pagesList.appendChild(card);
    });
  } else {
    pagesList.innerHTML = '<div>لا يوجد صفحات بعد.</div>';
  }
}
