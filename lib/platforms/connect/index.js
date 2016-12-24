const connect = require('connect');
const app = connect();

app.use((req, res, next) => {
    // middleware 1
    next();
});
