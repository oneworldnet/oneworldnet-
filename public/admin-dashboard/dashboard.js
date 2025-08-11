// لوحة تحكم الموقع - تحكم في المحتوى بشكل مباشر (بدون backend)
// بنية الأقسام الرئيسية
const sections = {
    'site-title': {
        ar: { label: 'العنوان الرئيسي', value: '' },
        en: { label: 'Site Title', value: '' }
    },
    'hero': {
        ar: { label: 'قسم البطل', value: '' },
        en: { label: 'Hero Section', value: '' }
    },
    'news': [],
    'blog': [],
    'devices': [],
    'plans': [],
    'partners': []
};
let customSections = [];

let currentLang = 'ar';
let currentSection = 'site-title';

// رسم النماذج الديناميكية لكل قسم
async function renderForm(section) {
    const formArea = document.getElementById('dashboard-forms');
    if (!formArea) return;
    formArea.innerHTML = '';
    // عناوين نصية فقط
    if (section === 'site-title' || section === 'hero') {
        let data = sections[section];
        formArea.innerHTML = `
            <form id="edit-form">
                <label style="font-weight:bold;font-size:1.1em;">${data.ar.label}</label>
                <input type="text" id="ar-value" value="${data.ar.value}" placeholder="${data.ar.label}" style="width:100%;padding:10px;margin:10px 0;font-size:1.1em;border-radius:8px;border:1px solid #ccc;">
                <input type="text" id="en-value" value="${data.en.value}" placeholder="${data.en.label}" style="width:100%;padding:10px;margin:10px 0;font-size:1.1em;border-radius:8px;border:1px solid #ccc;">
                <button type="submit" style="background:#0af;color:#fff;padding:10px 24px;border:none;border-radius:8px;font-size:1.1em;">حفظ التغيير</button>
            </form>
        `;
        document.getElementById('edit-form').onsubmit = async function(e) {
            e.preventDefault();
            data.ar.value = document.getElementById('ar-value').value;
            data.en.value = document.getElementById('en-value').value;
            await saveContentToAPI();
        };
        return;
    }
    // أقسام متعددة العناصر (news, blog, devices, plans, partners)
    let items = sections[section];
    let html = `<button id="add-item-btn" style="background:#0af;color:#fff;padding:8px 18px;border:none;border-radius:8px;font-size:1em;margin-bottom:12px;">إضافة عنصر جديد</button>`;
    html += '<div id="items-list">';
    items.forEach((item, idx) => {
        html += `
        <div class="item-card" style="background:#222;border-radius:10px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px #0002;">
            <form class="item-form" data-idx="${idx}">
                <div style="display:flex;gap:10px;">
                    <input type="text" name="ar_title" value="${item.ar.title||item.ar.name||''}" placeholder="العنوان (عربي)" style="flex:1;padding:8px;border-radius:6px;">
                    <input type="text" name="en_title" value="${item.en.title||item.en.name||''}" placeholder="Title (EN)" style="flex:1;padding:8px;border-radius:6px;">
                </div>
                <div style="display:flex;gap:10px;margin-top:8px;">
                    <input type="text" name="ar_desc" value="${item.ar.desc||''}" placeholder="وصف (عربي)" style="flex:1;padding:8px;border-radius:6px;">
                    <input type="text" name="en_desc" value="${item.en.desc||''}" placeholder="Description (EN)" style="flex:1;padding:8px;border-radius:6px;">
                </div>
                <div style="display:flex;gap:10px;margin-top:8px;">
                    <input type="text" name="img" value="${item.ar.img||item.en.img||''}" placeholder="رابط صورة/صورة" style="flex:2;padding:8px;border-radius:6px;">
                    <input type="text" name="link" value="${item.ar.link||item.en.link||''}" placeholder="رابط خارجي (اختياري)" style="flex:2;padding:8px;border-radius:6px;">
                </div>
                <div style="display:flex;gap:10px;margin-top:8px;">
                    <input type="text" name="video" value="${item.ar.video||item.en.video||''}" placeholder="رابط فيديو (اختياري)" style="flex:2;padding:8px;border-radius:6px;">
                </div>
                <button type="submit" style="background:#0af;color:#fff;padding:6px 18px;border:none;border-radius:8px;font-size:1em;margin-top:10px;">حفظ</button>
                <button type="button" class="delete-item-btn" data-idx="${idx}" style="background:#c00;color:#fff;padding:6px 14px;border:none;border-radius:8px;font-size:1em;margin-top:10px;margin-right:10px;">حذف</button>
            </form>
        </div>
        `;
    });
    html += '</div>';
    formArea.innerHTML = html;
    // إضافة عنصر جديد
    document.getElementById('add-item-btn').onclick = function() {
        let empty = {ar: {title:'',desc:'',img:'',link:'',video:''}, en: {title:'',desc:'',img:'',link:'',video:''}};
        if(section==='plans') empty = {ar:{title:'',desc:'',price:'',img:'',link:'',video:''},en:{title:'',desc:'',price:'',img:'',link:'',video:''}};
        if(section==='partners') empty = {ar:{name:'',img:'',link:'',video:''},en:{name:'',img:'',link:'',video:''}};
        items.push(empty);
        renderForm(section);
    };
    // حفظ/تعديل عنصر
    document.querySelectorAll('.item-form').forEach(form => {
        form.onsubmit = async function(e) {
            e.preventDefault();
            const idx = +form.getAttribute('data-idx');
            const fd = new FormData(form);
            let obj = items[idx];
            if(section==='partners') {
                obj.ar.name = fd.get('ar_title');
                obj.en.name = fd.get('en_title');
            } else {
                obj.ar.title = fd.get('ar_title');
                obj.en.title = fd.get('en_title');
                obj.ar.desc = fd.get('ar_desc');
                obj.en.desc = fd.get('en_desc');
            }
            if(section==='plans') {
                obj.ar.price = fd.get('ar_desc');
                obj.en.price = fd.get('en_desc');
            }
            obj.ar.img = obj.en.img = fd.get('img');
            obj.ar.link = obj.en.link = fd.get('link');
            obj.ar.video = obj.en.video = fd.get('video');
            await saveContentToAPI();
            renderForm(section);
        };
    });
    // حذف عنصر
    document.querySelectorAll('.delete-item-btn').forEach(btn => {
        btn.onclick = async function() {
            const idx = +btn.getAttribute('data-idx');
            items.splice(idx,1);
            await saveContentToAPI();
            renderForm(section);
        };
    });
}
// جلب البيانات من content.json عند تحميل لوحة التحكم
async function loadContentFromAPI() {
    try {
        const res = await fetch('http://localhost:3001/api/content');
        if(res.ok) {
            const content = await res.json();
            // مثال: تحميل العنوان الرئيسي فقط (يمكن التوسعة)
            if(content.site_title) {
                if(content.site_title.ar) sections['site-title'].ar.value = content.site_title.ar;
                if(content.site_title.en) sections['site-title'].en.value = content.site_title.en;
            }
        }
    } catch(e) {}
}

// حفظ البيانات في content.json عبر API
async function saveContentToAPI() {
    // فقط مثال: حفظ العنوان الرئيسي (يمكن التوسعة)
    const content = {
        site_title: {
            ar: sections['site-title'].ar.value,
            en: sections['site-title'].en.value
        }
    };
    try {
        await fetch('http://localhost:3001/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });
    } catch(e) {}
}

function updatePreview(section) {
    // تحديث المعاينة الحية (توسعة مستقبلية لكل الأقسام)
    const iframe = document.getElementById('live-preview');
    if (!iframe) return;
    iframe.contentWindow.postMessage({
        type: 'update',
        section,
        value: sections[section][currentLang].value,
        lang: currentLang
    }, '*');
}

function updateCustomSection(sectionId) {
    // تحديث المعاينة الحية للأقسام المخصصة (يمكن التوسعة لاحقاً)
    // حالياً فقط تحديث النموذج
    renderCustomSections();
}

function renderCustomSections() {
    const customArea = document.getElementById('custom-sections');
    if (!customArea) return;
    customArea.innerHTML = '';
    customSections.forEach(sec => {
        const div = document.createElement('div');
        div.className = 'custom-section-card';
        div.style = 'background:#222;border-radius:10px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px #0002;';
        div.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;justify-content:space-between;">
                <span style="font-weight:bold;">${sec.label}</span>
                <button data-id="${sec.id}" class="edit-custom-btn" style="background:#0af;color:#fff;padding:4px 14px;border:none;border-radius:6px;cursor:pointer;">تعديل</button>
                <button data-id="${sec.id}" class="delete-custom-btn" style="background:#c00;color:#fff;padding:4px 10px;border:none;border-radius:6px;cursor:pointer;">حذف</button>
            </div>
            <div style="margin-top:8px;">${sec.value}</div>
        `;
        customArea.appendChild(div);
    });
    // تفعيل أزرار التعديل والحذف
    document.querySelectorAll('.edit-custom-btn').forEach(btn => {
        btn.onclick = function() {
            const id = this.getAttribute('data-id');
            currentSection = id;
            renderForm(currentSection);
        };
    });
    document.querySelectorAll('.delete-custom-btn').forEach(btn => {
        btn.onclick = function() {
            const id = this.getAttribute('data-id');
            customSections = customSections.filter(s => s.id !== id);
            renderCustomSections();
        };
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadContentFromAPI();
    // تفعيل القائمة الجانبية
    document.querySelectorAll('.sidebar nav ul li').forEach(function(li) {
        li.onclick = function() {
            document.querySelectorAll('.sidebar nav ul li').forEach(e => e.classList.remove('active'));
            this.classList.add('active');
            currentSection = this.getAttribute('data-section');
            // عند اختيار صفحة، اعرض عناصرها للتحكم الكامل
            renderPageElements(currentSection);
        };
    });

    // دالة جديدة: عرض عناصر الصفحة للتحكم الكامل
    function renderPageElements(page) {
        const formArea = document.getElementById('dashboard-forms');
        if (!formArea) return;
        formArea.innerHTML = `<h2>تحكم في عناصر صفحة: ${page}</h2>`;
        // مثال: جلب عناصر الصفحة من content.json
        let elements = [];
        if(page==='index') {
            elements = [
                {type:'title',label:'العنوان الرئيسي',value:sections['site-title'].ar.value},
                {type:'hero',label:'قسم البطل',value:sections['hero'].ar.value},
                {type:'news',label:'الأخبار',value:sections['news']},
                {type:'devices',label:'الأجهزة',value:sections['devices']},
                {type:'plans',label:'الباقات',value:sections['plans']},
                {type:'partners',label:'الشركاء',value:sections['partners']}
            ];
        }
        if(page==='blog') {
            elements = [
                {type:'blog',label:'المدونة',value:sections['blog']}
            ];
        }
        if(page==='devices') {
            elements = [
                {type:'devices',label:'الأجهزة',value:sections['devices']}
            ];
        }
        if(page==='plans') {
            elements = [
                {type:'plans',label:'الباقات',value:sections['plans']}
            ];
        }
        if(page==='partners') {
            elements = [
                {type:'partners',label:'الشركاء',value:sections['partners']}
            ];
        }
        // عرض العناصر للتحكم (تعديل/حذف/إضافة)
        elements.forEach(el => {
            if(Array.isArray(el.value)) {
                formArea.innerHTML += `<h3>${el.label}</h3>`;
                el.value.forEach((item, idx) => {
                    formArea.innerHTML += `
                    <div class="item-card" style="background:#222;border-radius:10px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px #0002;">
                        <form class="item-form" data-idx="${idx}" data-type="${el.type}">
                            <input type="text" name="ar_title" value="${item.ar.title||item.ar.name||''}" placeholder="العنوان (عربي)" style="width:40%;padding:8px;border-radius:6px;">
                            <input type="text" name="en_title" value="${item.en.title||item.en.name||''}" placeholder="Title (EN)" style="width:40%;padding:8px;border-radius:6px;">
                            <input type="text" name="img" value="${item.ar.img||item.en.img||''}" placeholder="رابط صورة/صورة" style="width:40%;padding:8px;border-radius:6px;">
                            <input type="text" name="link" value="${item.ar.link||item.en.link||''}" placeholder="رابط خارجي (اختياري)" style="width:40%;padding:8px;border-radius:6px;">
                            <button type="submit" style="background:#0af;color:#fff;padding:6px 18px;border:none;border-radius:8px;font-size:1em;margin-top:10px;">حفظ</button>
                            <button type="button" class="delete-item-btn" data-idx="${idx}" data-type="${el.type}" style="background:#c00;color:#fff;padding:6px 14px;border:none;border-radius:8px;font-size:1em;margin-top:10px;margin-right:10px;">حذف</button>
                        </form>
                    </div>
                    `;
                });
                formArea.innerHTML += `<button id="add-item-btn-${el.type}" style="background:#0af;color:#fff;padding:8px 18px;border:none;border-radius:8px;font-size:1em;margin-bottom:12px;">إضافة عنصر جديد</button>`;
            } else {
                formArea.innerHTML += `
                <div style="margin-bottom:18px;">
                    <label style="font-weight:bold;">${el.label}</label>
                    <input type="text" value="${el.value}" style="width:80%;padding:8px;border-radius:6px;">
                </div>
                `;
            }
        });
        // تفعيل إضافة عنصر جديد
        elements.forEach(el => {
            if(Array.isArray(el.value)) {
                const btn = document.getElementById(`add-item-btn-${el.type}`);
                if(btn) {
                    btn.onclick = function() {
                        let empty = {ar:{title:'',desc:'',img:'',link:'',video:''},en:{title:'',desc:'',img:'',link:'',video:''}};
                        if(el.type==='plans') empty = {ar:{title:'',desc:'',price:'',img:'',link:'',video:''},en:{title:'',desc:'',price:'',img:'',link:'',video:''}};
                        if(el.type==='partners') empty = {ar:{name:'',img:'',link:'',video:''},en:{name:'',img:'',link:'',video:''}};
                        el.value.push(empty);
                        renderPageElements(page);
                    };
                }
            }
        });
        // تفعيل حفظ/تعديل وحذف العناصر
        document.querySelectorAll('.item-form').forEach(form => {
            form.onsubmit = function(e) {
                e.preventDefault();
                const idx = +form.getAttribute('data-idx');
                const type = form.getAttribute('data-type');
                const fd = new FormData(form);
                let obj = elements.find(e=>e.type===type).value[idx];
                if(type==='partners') {
                    obj.ar.name = fd.get('ar_title');
                    obj.en.name = fd.get('en_title');
                } else {
                    obj.ar.title = fd.get('ar_title');
                    obj.en.title = fd.get('en_title');
                }
                obj.ar.img = obj.en.img = fd.get('img');
                obj.ar.link = obj.en.link = fd.get('link');
                // حفظ التغييرات
                renderPageElements(page);
            };
        });
        document.querySelectorAll('.delete-item-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = +btn.getAttribute('data-idx');
                const type = btn.getAttribute('data-type');
                let arr = elements.find(e=>e.type===type).value;
                arr.splice(idx,1);
                renderPageElements(page);
            };
        });
    }
    // تفعيل اللغة
    document.getElementById('dashboard-lang').onchange = function(e) {
        currentLang = e.target.value;
        renderForm(currentSection);
    };
    // زر إضافة قسم جديد
    document.getElementById('add-section-btn').onclick = function() {
        const label = prompt(currentLang === 'ar' ? 'اسم القسم الجديد:' : 'New section name:');
        if (!label) return;
        const id = 'custom-' + Date.now();
        customSections.push({
            id,
            label,
            value: ''
        });
        renderCustomSections();
    };
    renderForm(currentSection);
    renderCustomSections();
});

// استقبال الرسائل في iframe (يجب إضافة كود في index.html لدعم التحديث الحي)
