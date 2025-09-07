document.addEventListener('DOMContentLoaded', () => {
  /** =========================
   * 🌐 تغییر زبان با ذخیره‌سازی
   ========================== */
  const langSelect = document.getElementById('lang-select');

  // بازیابی زبان ذخیره‌شده از localStorage یا کوکی
  const savedLang = localStorage.getItem('lang') || getCookie('lang');
  if (savedLang) {
    langSelect.value = savedLang;
    applyLanguage(savedLang);
  }

  langSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    localStorage.setItem('lang', newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`; // یک سال
    applyLanguage(newLang);
  });

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function applyLanguage(lang) {
    // اینجا می‌تونی سیستم ترجمه پویا رو صدا بزنی
    console.log(`Language changed to: ${lang}`);
    // اگر نیاز به رفرش داری:
    location.reload();
  }

  /** =========================
   * 📂 گرفتن لیست فایل‌ها از API
   ========================== */
  fetch('/api/files/search')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(files => {
      const list = document.getElementById('file-list');
      list.innerHTML = ''; // پاک کردن لیست قبلی

      if (!files.length) {
        list.innerHTML = '<li class="empty">No files found</li>';
        return;
      }

      files.forEach(file => {
        const li = document.createElement('li');
        li.className = 'file-item';

        // آیکون بر اساس نوع فایل
        const icon = document.createElement('span');
        icon.className = 'file-icon';
        icon.textContent = getFileIcon(file.type);

        // متن فایل
        const info = document.createElement('span');
        info.className = 'file-info';
        info.textContent = `${file.name} (${file.type}) - ${(file.size / 1024).toFixed(2)} KB`;

        // دکمه دانلود
        const downloadBtn = document.createElement('a');
        downloadBtn.href = `/api/files/download/${encodeURIComponent(file.name)}`;
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = '⬇️';

        // دکمه QR Code
        const qrBtn = document.createElement('button');
        qrBtn.className = 'qr-btn';
        qrBtn.textContent = '🔗';
        qrBtn.addEventListener('click', () => {
          showQRCode(`/api/files/download/${encodeURIComponent(file.name)}`);
        });

        li.append(icon, info, downloadBtn, qrBtn);
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Error fetching files:', err);
      document.getElementById('file-list').innerHTML = '<li class="error">Error loading files</li>';
    });

  /** =========================
   * 🎯 توابع کمکی
   ========================== */
  function getFileIcon(type) {
    const map = {
      'image/jpeg': '🖼️',
      'image/png': '🖼️',
      'application/pdf': '📄',
      'application/zip': '🗜️',
      'text/plain': '📃'
    };
    return map[type] || '📁';
  }

  function showQRCode(url) {
    // اینجا می‌تونی یک مودال QR Code باز کنی
    alert(`QR for: ${url}`);
  }
});
