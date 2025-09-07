document.addEventListener('DOMContentLoaded', () => {
  /** =========================
   * 🌐 Change language with saving
   ========================== */
  const langSelect = document.getElementById('lang-select');

  const savedLang = localStorage.getItem('lang') || getCookie('lang');
  if (savedLang) {
    langSelect.value = savedLang;
    applyLanguage(savedLang);
  }

  langSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    localStorage.setItem('lang', newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    applyLanguage(newLang);
  });
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function applyLanguage(lang) {

    console.log(`Language changed to: ${lang}`);
    // :
    location.reload();
  }

  /** =========================
   * 📂 Get a list of files from API
   ========================== */
  fetch('/api/files/search')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(files => {
      const list = document.getElementById('file-list');
      list.innerHTML = '';

      if (!files.length) {
        list.innerHTML = '<li class="empty">No files found</li>';
        return;
      }

      files.forEach(file => {
        const li = document.createElement('li');
        li.className = 'file-item';

        const icon = document.createElement('span');
        icon.className = 'file-icon';
        icon.textContent = getFileIcon(file.type);

        const info = document.createElement('span');
        info.className = 'file-info';
        info.textContent = `${file.name} (${file.type}) - ${(file.size / 1024).toFixed(2)} KB`;

        const downloadBtn = document.createElement('a');
        downloadBtn.href = `/api/files/download/${encodeURIComponent(file.name)}`;
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = '⬇️';

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
   * 🎯 Auxiliary functions
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

    alert(`QR for: ${url}`);
  }
});
