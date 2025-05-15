const { Sequelize } = require('sequelize')
// Option 3: Passing parameters separately (other dialects)
// link document : https://sequelize.org/docs/v6/getting-started/

const sequelize = new Sequelize('hoidanit', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;