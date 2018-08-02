module.exports = app => {
    require('./authentications/login')(app)
    require('./register')(app)
    require('./authentications/logout')(app)
}