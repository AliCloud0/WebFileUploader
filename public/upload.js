document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const progressBar = document.getElementById('progress-bar');
  const progressEl = document.getElementById('upload-progress');
  const timeRemainingEl = document.getElementById('time-remaining');
  const fileSizeEl = document.getElementById('file-size');
  const uploadSpeedEl = document.getElementById('upload-speed');

  let startTime = null;

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'copy';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

  function handleFiles(files) {
    const validFiles = Array.from(files).filter(validateFile);
    if (!validFiles.length) {
      alert('❌ No valid files selected');
      return;
    }
    uploadFiles(validFiles);
  }

  function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (!allowedTypes.includes(file.type)) {
      alert(`❌ File type not allowed: ${file.name}`);
      return false;
    }
    if (file.size > maxSize) {
      alert(`❌ File too large: ${file.name}`);
      return false;
    }
    return true;
  }

  function uploadFiles(files) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/files/upload');
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);

    startTime = new Date();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        const elapsed = (new Date() - startTime) / 1000;
        const speed = e.loaded / elapsed;
        const remaining = (e.total - e.loaded) / speed;

        progressEl.value = percent;
        timeRemainingEl.textContent = `⏳ ${Math.max(0, remaining / 1000).toFixed(1)}s left`;
        fileSizeEl.textContent = `📦 ${(e.total / 1024).toFixed(1)} KB`;
        uploadSpeedEl.textContent = `⚡ ${(speed / 1024).toFixed(1)} KB/s`;
        progressBar.classList.remove('hidden');
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert('✅ Upload successful');
        progressBar.classList.add('hidden');
        progressEl.value = 0;
      } else {
        alert(`❌ Upload failed: ${xhr.statusText}`);
      }
    };

    xhr.onerror = () => {
      alert('❌ Network error during upload');
    };

    xhr.send(formData);
  }
});

