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
