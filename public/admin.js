// admin.js
// سكريبت ربط لوحة التحكم مع backend وتفعيل كل الأقسام

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

// يمكن الآن ربط هذه الدوال مع واجهة لوحة التحكم في admin.html
// مثال: عند فتح قسم المستخدمين، استدعي fetchUsers() واعرض النتائج
// عند إضافة مستخدم جديد، استخدم addUser(...)
// عند تعديل المحتوى، استخدم updateContent(...)
// وهكذا لباقي الأقسام
