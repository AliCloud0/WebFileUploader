const express = require('express');
const sequelize = require('./db');
const i18n = require('./utils/i18n');
const path = require('path');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const adminRoutes = require('./routes/admin');
const validationMiddleware = require('./middleware/validationMiddleware');

const app = express();
app.use(express.json());
app.use(i18n.init); // برای چندزبانه
app.use(validationMiddleware); // امنیت

// مسیرهای استاتیک
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/admin', adminRoutes);

// صفحه اصلی
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// همگام‌سازی دیتابیس
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});