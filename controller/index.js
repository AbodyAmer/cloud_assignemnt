module.exports = app => {
    require('./authentications/login')(app)
    require('./register')(app)
    require('./authentications/logout')(app)
    require('./customer/home')(app)
    require('./customer/request')(app)
    require('./staff/home')(app)
    require('./staff/update')(app)
}