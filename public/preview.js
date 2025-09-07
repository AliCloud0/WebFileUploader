function showPreview(file) {
  const previewContainer = document.getElementById('preview-container');

  const card = document.createElement('div');
  card.className = 'preview-card fade-in';
  const header = document.createElement('div');
  header.className = 'preview-header';
  header.innerHTML = `
    <span class="file-name">${file.name}</span>
    <span class="file-size">${(file.size / 1024).toFixed(1)} KB</span>
  `;
  let preview;
  const fileURL = URL.createObjectURL(file);

  if (file.type.startsWith('image/')) {
    preview = document.createElement('img');
    preview.src = fileURL;
    preview.alt = file.name;
  } else if (file.type.startsWith('video/')) {
    preview = document.createElement('video');
    preview.src = fileURL;
    preview.controls = true;
  } else if (file.type === 'application/pdf') {
    preview = document.createElement('iframe');
    preview.src = fileURL;
  } else if (file.type.startsWith('audio/')) {
    preview = document.createElement('audio');
    preview.src = fileURL;
    preview.controls = true;
  } else {
    preview = document.createElement('div');
    preview.className = 'file-icon';
    preview.textContent = '📄';
  }
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = '✖';
  removeBtn.title = 'Remove preview';
  removeBtn.addEventListener('click', () => {
    URL.revokeObjectURL(fileURL);
    card.remove();
  });

  card.appendChild(removeBtn);
  card.appendChild(header);
  card.appendChild(preview);
  previewContainer.appendChild(card);
}
