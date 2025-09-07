module.exports = {
  jwtSecret: '1234',
  dbConfig: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  },
  uploadLimits: {
    maxSize: 100 * 1024 * 1024,
    maxUploadsPerDay: 10
  },
  tokenExpiration: '1h',
  supportedLanguages: ['fa', 'en', 'ar', 'de'],
  uploadPaths: {
    image: './Uploads/images/',
    video: './Uploads/videos/',
    audio: './Uploads/audios/',
    pdf: './Uploads/pdfs/',
    code: './Uploads/codes/'
  }
};