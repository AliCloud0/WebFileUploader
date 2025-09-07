// انتخاب دکمه
const toggle = document.getElementById('theme-toggle');

// بررسی تم ذخیره‌شده در localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else {
  // اگر چیزی ذخیره نشده، تم سیستم رو تشخیص بده
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

// رویداد کلیک برای تغییر تم
toggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // افکت کوچک برای حس حرفه‌ای بودن
  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 300);
});
