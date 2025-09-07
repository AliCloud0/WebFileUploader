const { Sequelize } = require('sequelize');
     const config = require('./config');

     const sequelize = new Sequelize({
       dialect: config.dbConfig.dialect,
       storage: config.dbConfig.storage,
       logging: console.log // فعال کردن لاگ برای دیباگ
     });

     sequelize.authenticate()
       .then(() => console.log('Connection to database successful'))
       .catch(err => console.error('Unable to connect to the database:', err));

     module.exports = sequelize;