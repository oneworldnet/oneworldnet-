// تحديث ملف المستخدمين بالكامل (للحذف والتعديل)
app.post('/api/users', (req, res) => {
  const users = req.body;
  if (!Array.isArray(users)) return res.status(400).json({ error: 'Invalid users array' });
  fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), 'utf8', err => {
    if (err) return res.status(500).json({ error: 'Write error' });
    res.json({ success: true });
  });
});



import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const USERS_PATH = path.join(__dirname, 'users.json');
const LOGS_PATH = path.join(__dirname, 'login-logs.json');
const CONTENT_PATH = path.join(__dirname, 'content.json');

// API لإرجاع قائمة الموظفين
app.get('/api/users', (req, res) => {
  fs.readFile(USERS_PATH, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data));
  });
});

// قراءة بيانات الموقع
app.get('/api/content', (req, res) => {
  fs.readFile(CONTENT_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    res.json(JSON.parse(data));
  });
});
// تحديث بيانات الموقع
app.post('/api/content', (req, res) => {
  const newContent = req.body;
  fs.writeFile(CONTENT_PATH, JSON.stringify(newContent, null, 2), 'utf8', err => {
    if (err) return res.status(500).json({ error: 'Write error' });
    res.json({ success: true });
  });
});

// تسجيل الدخول
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile(USERS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    // سجل الدخول
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const country = req.headers['cf-ipcountry'] || '-';
    const log = { username, ip, country, date: new Date().toISOString() };
    fs.readFile(LOGS_PATH, 'utf8', (err, logsData) => {
      let logs = [];
      if (!err && logsData) logs = JSON.parse(logsData);
      logs.unshift(log);
      fs.writeFile(LOGS_PATH, JSON.stringify(logs.slice(0,1000), null, 2), 'utf8', ()=>{});
    });
    res.json({ success: true, user: { username, role: user.role } });
  });
});

// API لإرجاع سجل الدخول
app.get('/api/login-logs', (req, res) => {
  fs.readFile(LOGS_PATH, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data));
  });
});

// إضافة موظف جديد
app.post('/api/add-user', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  fs.readFile(USERS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    let users = JSON.parse(data);
    if (users.find(u => u.username === username)) return res.status(409).json({ error: 'User exists' });
    users.push({ username, password, role });
    fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), 'utf8', err2 => {
      if (err2) return res.status(500).json({ error: 'Write error' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log('Content API running on http://localhost:' + PORT);
});
