const chatRoute = require('./chat.route');
const apiRoute = require('./apis/index.route')
module.exports = (app) => {
    app.use('/v1', chatRoute);
    app.use('/api/v1',apiRoute)
}