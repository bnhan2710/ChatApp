const viewRoute = require('./view.route');
const apiRoute = require('./apis/index.route')
module.exports = (app) => {
    app.use('/v1', viewRoute);
    app.use('/v1/api',apiRoute)
}   